# ControlGames — Sistema de Plataforma Global

**Problema que resuelve:** Los juegos externos no tienen forma de reportar progreso a una plataforma central. El jugador no tiene identidad global ni historial entre juegos.  
**Tipo:** App del ecosistema (misma Firebase Auth que ControlFile)  
**Path en Firestore:** `/apps/controlgames/`

---

## La idea en una línea

Cada juego externo manda eventos → ControlGames los recibe → actualiza el perfil global del jugador en Firebase.

Como Google Play Games: los juegos son independientes, la plataforma es el hilo conductor.

---

## Modelo de datos en Firestore

### `/apps/controlgames/players/{uid}`
El perfil global del jugador. Un documento por usuario.

```
uid              → string (mismo que Firebase Auth)
displayName      → string
level            → number (nivel global en ControlGames)
totalXP          → number (XP acumulado de todos los juegos)
gamesPlayed      → number (partidas totales en toda la plataforma)
gamesUnique      → string[] (ids de juegos distintos jugados)
achievements     → string[] (ids de logros desbloqueados)
lastPlayed       → timestamp
createdAt        → timestamp
updatedAt        → timestamp
```

### `/apps/controlgames/players/{uid}/gameStats/{gameId}`
Estadísticas del jugador por juego. Una subcolección por juego jugado.

```
gameId           → string ("afkrpg", "rompecabeza", etc.)
gamesPlayed      → number
totalScore       → number
bestScore        → number
lastScore        → number
lastPlayed       → timestamp
```

### `/apps/controlgames/achievements/{achievementId}`
Catálogo global de logros (lo define ControlGames, no los juegos).

```
id               → string
title            → string
description      → string
icon             → string (emoji o url)
condition        → { type: string, value: number, gameId?: string }
xpReward         → number
```

Ejemplos de condiciones:
- `{ type: "total_games", value: 10 }` → jugó 10 partidas en total
- `{ type: "unique_games", value: 3 }` → probó 3 juegos distintos
- `{ type: "total_xp", value: 5000 }` → acumuló 5000 XP global
- `{ type: "game_score", gameId: "afkrpg", value: 1000 }` → llegó a 1000 pts en AFK RPG

---

## El protocolo de eventos (postMessage)

Los juegos externos se comunican con ControlGames usando `window.postMessage`. Ya existe `CONTROLGAMES_SCORE`, se extiende:

### Evento mínimo (cualquier juego):
```js
window.parent.postMessage({
  type: "CG_EVENT",
  gameId: "afkrpg",
  event: "game_complete",
  score: 450,
}, "*")
```

### Evento extendido (opcional, más XP):
```js
window.parent.postMessage({
  type: "CG_EVENT",
  gameId: "rompecabeza",
  event: "game_complete",
  score: 300,
  metadata: {
    difficulty: "hard",
    timeSeconds: 45,
    perfect: true,
  }
}, "*")
```

### Eventos posibles:
| event | cuándo mandarlo |
|---|---|
| `game_complete` | el jugador terminó una partida |
| `level_up` | el jugador subió de nivel dentro del juego |
| `achievement` | el jugador desbloqueó algo dentro del juego |

---

## Cálculo de XP global

ControlGames asigna XP por evento recibido. Los juegos no deciden cuánto XP dan — la plataforma lo normaliza:

| Condición | XP global |
|---|---|
| Partida completada (score > 0) | 100 XP base |
| Score alto (top de ese juego) | +50 XP bonus |
| Primer vez jugando ese juego | +200 XP bonus |
| Metadato `perfect: true` | +100 XP bonus |

Fórmula de nivel global (igual a la actual):
- Nivel 1 = 0 XP
- Nivel N = (N-1) × 1000 XP
- Cada nivel requiere 1000 XP

---

## Flujo completo

```
Jugador termina partida en AFK RPG
  ↓
AFK RPG llama postMessage({ type: "CG_EVENT", ... })
  ↓
GameFrame en ControlGames escucha el mensaje
  ↓
Calcula XP a sumar
  ↓
Lee perfil del jugador desde Firestore
  ↓
Actualiza totalXP, level, gamesPlayed, gameStats/afkrpg
  ↓
Evalúa si desbloqueó algún logro
  ↓
Guarda todo en Firestore
  ↓
Muestra toast "⚔️ +100 XP" al jugador
```

---

## Autenticación del jugador en juegos externos

Los juegos externos pueden saber quién es el jugador si ControlGames les manda el token al cargar:

```
ControlGames carga el iframe
  ↓
Cuando carga, postMessage({ type: "CG_AUTH", idToken, uid })
  ↓
El juego puede usar ese token para su propio backend
```

Esto ya existe para Rompecoco, se replica para todos.

---

## Lo que cambia en ControlGames (resumen de trabajo)

1. **Quitar juegos nativos** → Preguntados, Impostor, Adivinar se convierten en apps externas con su propio repo
2. **Reescribir GameFrame** → que escuche `CG_EVENT` y procese XP global
3. **Reescribir firestore-service** → que maneje el modelo de datos nuevo
4. **Eliminar profile-manager (IndexedDB)** → todo vive en Firebase
5. **Crear achievements-service** → evalúa logros después de cada evento
6. **Actualizar UI** → nivel global en header, logros en pantalla de stats

---

## Semáforo

```
COMPLEJIDAD: 🟡 Medio

RIESGOS A REVISAR:
□ postMessage con "*" como origen → aceptable para MVP, después filtrar por dominio conocido
□ El jugador puede mandar mensajes falsos desde consola → para MVP no es crítico
□ Eliminar IndexedDB rompe perfiles existentes → hacer migración o simplemente resetear
□ Los juegos externos necesitan actualización para mandar CG_EVENT → coordinar con cada repo
```

---

## Orden sugerido para buildear

1. Diseñar el modelo en Firestore (este doc)
2. Reescribir `firestore-service.ts` con las funciones nuevas
3. Actualizar `game-frame.tsx` para escuchar `CG_EVENT`
4. Actualizar la UI del header con nivel global
5. Agregar `CG_EVENT` a los juegos externos uno por uno
6. Implementar logros
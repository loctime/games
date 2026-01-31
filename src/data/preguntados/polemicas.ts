import type { PreguntadosQuestion } from "../../lib/preguntados/types"

export const preguntasPolémicasQuestions: PreguntadosQuestion[] = [
  {
    id: "libre_ciudad_mas_austral",
    question: "¿Cuál es la ciudad habitada permanentemente más austral del mundo?",
    options: ["Ushuaia (ARG)", "Punta Arenas (CHI)", "Puerto Williams (CHI)", "Río Gallegos (ARG)"],
    correctIndex: 2,
    category: "libre",
    difficulty: "medium",
    tags: ["geografía", "argentina", "chile"]
  },
  {
    id: "libre_malvinas_ocupacion",
    question: "¿En qué año Reino Unido ocupó las Malvinas por primera vez?",
    options: ["1820", "1833", "1900", "1982"],
    correctIndex: 1,
    category: "libre",
    difficulty: "hard",
    tags: ["historia", "malvinas", "argentina"]
  },
  {
    id: "personas_perón_presidencias",
    question: "¿Cuántas veces fue presidente Juan Domingo Perón?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    category: "personas",
    difficulty: "easy",
    tags: ["historia", "política", "argentina"]
  },
  {
    id: "libre_colón_creia_llegar",
    question: "¿Cristóbal Colón creía que había llegado a...?",
    options: ["América", "Australia", "India", "China"],
    correctIndex: 2,
    category: "libre",
    difficulty: "easy",
    tags: ["historia", "exploración"]
  },
  {
    id: "personas_napoleón_altura",
    question: "¿Napoleón Bonaparte medía menos de 1,60 m?",
    options: ["Sí, era bajito", "No, medía 1,69 m (alto para época)", "Mito, equivalía a 1,70 m promedio", "1,50 m exacto"],
    correctIndex: 2,
    category: "personas",
    difficulty: "medium",
    tags: ["historia", "mitos"]
  },
  {
    id: "libre_rio_mas_caudaloso",
    question: "¿Cuál río es más caudaloso (agua por segundo), no el más largo?",
    options: ["Nilo", "Yangtsé", "Amazonas", "Congo"],
    correctIndex: 2,
    category: "libre",
    difficulty: "medium",
    tags: ["geografía", "ríos"]
  },
  {
    id: "libre_antártida_pertenece",
    question: "¿Antártida pertenece a...?",
    options: ["EE.UU.", "Nadie (Tratado la prohíbe)", "Argentina (reclamo histórico)", "Chile"],
    correctIndex: 1,
    category: "libre",
    difficulty: "hard",
    tags: ["geografía", "antártida", "soberanía"]
  },
  {
    id: "libre_desierto_mas_grande",
    question: "¿Cuál desierto es el más grande contando la Antártida?",
    options: ["Sahara", "Gobi", "Antártida", "Ártico"],
    correctIndex: 2,
    category: "libre",
    difficulty: "medium",
    tags: ["geografía", "desiertos"]
  },
  {
    id: "libre_fitz_roy_ubicacion",
    question: "¿Monte Fitz Roy está en...?",
    options: ["Solo Argentina", "Solo Chile", "Frontera AR-CHI", "Perú"],
    correctIndex: 2,
    category: "libre",
    difficulty: "medium",
    tags: ["geografía", "argentina", "chile"]
  },
  {
    id: "libre_pais_mas_husos",
    question: "¿Cuál país tiene más husos horarios?",
    options: ["Rusia (11)", "EE.UU. (territorios)", "Francia (12, con ultramar)", "China (1 oficial)"],
    correctIndex: 2,
    category: "libre",
    difficulty: "hard",
    tags: ["geografía", "husos horarios"]
  },
  {
    id: "libre_cerebro_uso",
    question: "¿Usamos solo el 10% del cerebro?",
    options: ["Sí, mito urbano", "No, 100% (diferentes partes)", "50%", "20%"],
    correctIndex: 1,
    category: "libre",
    difficulty: "easy",
    tags: ["ciencia", "mitos", "cerebro"]
  },
  {
    id: "animales_pulpo_corazones",
    question: "¿El pulpo tiene cuántos corazones?",
    options: ["1", "2", "3", "0"],
    correctIndex: 2,
    category: "animales",
    difficulty: "easy",
    tags: ["animales", "biología"]
  },
  {
    id: "libre_tierra_forma",
    question: "¿La Tierra es plana o...?",
    options: ["Plana (loteros)", "Esfera achatada", "Cúbica", "Pirámide"],
    correctIndex: 1,
    category: "libre",
    difficulty: "easy",
    tags: ["ciencia", "tierra"]
  },
  {
    id: "animales_vive_mas_sin_comer",
    question: "¿Cuál animal vive más sin comer?",
    options: ["Camello", "Tardígrado (10 años)", "Elefante", "Tiburón"],
    correctIndex: 1,
    category: "animales",
    difficulty: "medium",
    tags: ["animales", "supervivencia"]
  },
  {
    id: "libre_cambio_climatico_causa",
    question: "¿El cambio climático es causado por...?",
    options: ["Solo ciclos naturales", "Humanos + naturales", "Aliens", "Dios"],
    correctIndex: 1,
    category: "libre",
    difficulty: "hard",
    tags: ["ciencia", "clima", "polémica"]
  },
  {
    id: "personas_messi_balones_oro",
    question: "¿Messi tiene más Balones de Oro que...?",
    options: ["Pelé (3)", "Maradona (0)", "CR7 (5)", "Todos"],
    correctIndex: 3,
    category: "personas",
    difficulty: "easy",
    tags: ["fútbol", "deportes"]
  },
  {
    id: "personas_mas_goles_seleccion_arg",
    question: "¿Quién metió más goles con la Selección ARG?",
    options: ["Maradona", "Batistuta", "Messi (112+)", "Di Stéfano"],
    correctIndex: 2,
    category: "personas",
    difficulty: "easy",
    tags: ["fútbol", "argentina"]
  },
  {
    id: "libre_boca_river_libertadores",
    question: "¿Boca o River ganó más Libertadores?",
    options: ["River (4)", "Boca (6)", "Empate", "Boca (18 total copas)"],
    correctIndex: 1,
    category: "libre",
    difficulty: "easy",
    tags: ["fútbol", "argentina"]
  },
  {
    id: "personas_mano_de_dios_penal",
    question: "¿La Mano de Dios de Maradona fue penal?",
    options: ["Sí", "No, pero golazo", "VAR lo anulaba", "Injusto"],
    correctIndex: 1,
    category: "personas",
    difficulty: "medium",
    tags: ["fútbol", "maradona", "polémica"]
  },
  {
    id: "personas_jordan_lebron_goat",
    question: "¿Michael Jordan o LeBron es el GOAT NBA?",
    options: ["Jordan (6 anillos)", "Dato: Jordan más MVPs finales", "LeBron (longevidad)", "Kobe"],
    correctIndex: 1,
    category: "personas",
    difficulty: "medium",
    tags: ["básquet", "deportes"]
  },
  {
    id: "libre_barbie_taquilla",
    question: "¿Barbie 2023 fue la película más taquillera en...?",
    options: ["EE.UU.", "Irlanda", "Mundial", "ARG"],
    correctIndex: 1,
    category: "libre",
    difficulty: "medium",
    tags: ["cine", "entretenimiento"]
  },
  {
    id: "libre_50_sombras_origen",
    question: "¿50 Sombras empezó como fanfic de...?",
    options: ["Harry Potter", "Crepúsculo", "Hunger Games", "Twilight oficial"],
    correctIndex: 1,
    category: "libre",
    difficulty: "easy",
    tags: ["literatura", "cine"]
  },
  {
    id: "personas_joker_oscar",
    question: "¿El Joker de Phoenix ganó Oscar por...",
    options: ["Mejor Película", "Mejor Actor", "Director", "Guión"],
    correctIndex: 1,
    category: "personas",
    difficulty: "easy",
    tags: ["cine", "actores"]
  },
  {
    id: "libre_serie_genero_debates",
    question: "¿Cuál serie canceló más debates sobre género?",
    options: ["Friends", "The Last of Us (Ellie)", "Stranger Things", "Breaking Bad"],
    correctIndex: 1,
    category: "libre",
    difficulty: "medium",
    tags: ["series", "género"]
  },
  {
    id: "personas_taylor_swift_prima",
    question: "¿Taylor Swift es prima lejana de...?",
    options: ["Beyoncé", "Emily Dickinson", "Madonna", "Britney"],
    correctIndex: 1,
    category: "personas",
    difficulty: "medium",
    tags: ["música", "curiosidades"]
  },
  {
    id: "libre_dracula_inspiracion",
    question: "¿Drácula se inspiró en...?",
    options: ["Mito total", "Vlad Empalador", "Vampiro real", "Frankenstein"],
    correctIndex: 1,
    category: "libre",
    difficulty: "medium",
    tags: ["literatura", "historia"]
  },
  {
    id: "libre_picasso_guernica",
    question: "¿Picasso pintó Guernica por...?",
    options: ["Belleza", "Bombardeo Guerra Civil", "Amor", "Cuba"],
    correctIndex: 1,
    category: "libre",
    difficulty: "easy",
    tags: ["arte", "historia"]
  },
  {
    id: "personas_shakespeare_mujer",
    question: "¿Shakespeare era... mujer? (teoría)",
    options: ["Sí", "Hombre, pero dudas", "Grupo", "Italiano"],
    correctIndex: 1,
    category: "personas",
    difficulty: "hard",
    tags: ["literatura", "teorías"]
  },
  {
    id: "libre_quijote_critica",
    question: "¿El Quijote critica a...?",
    options: ["Nobles", "Libros de caballerías", "Iglesia", "Todo"],
    correctIndex: 1,
    category: "libre",
    difficulty: "medium",
    tags: ["literatura", "clásicos"]
  },
  {
    id: "personas_banksy_subasta",
    question: "¿Banksy destruyó su obra en subasta por...?",
    options: ["Dinero", "Protesta arte comercial", "Error", "Performance"],
    correctIndex: 1,
    category: "personas",
    difficulty: "medium",
    tags: ["arte", "controversia"]
  },
  {
    id: "personas_frida_autorretratos",
    question: "¿Frida Kahlo pintó más autorretratos que...?",
    options: ["Van Gogh", "Nadie (55+)", "Monet", "Dalí"],
    correctIndex: 1,
    category: "personas",
    difficulty: "medium",
    tags: ["arte", "mujeres"]
  }
]

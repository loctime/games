import type { PreguntadosQuestion } from "../../lib/preguntados/types"
import { personasEasyQuestions } from "./personas.easy"
import { personasMediumQuestions } from "./personas.medium"
import { personasHardQuestions } from "./personas.hard"
import { objetosEasyQuestions } from "./objetos.easy"
import { animalesEasyQuestions } from "./animales.easy"
import { libreEasyQuestions } from "./libre.easy"

export const allPreguntadosQuestions: PreguntadosQuestion[] = [
  ...personasEasyQuestions,
  ...personasMediumQuestions,
  ...personasHardQuestions,
  ...objetosEasyQuestions,
  ...animalesEasyQuestions,
  ...libreEasyQuestions
]

export {
  personasEasyQuestions,
  personasMediumQuestions,
  personasHardQuestions,
  objetosEasyQuestions,
  animalesEasyQuestions,
  libreEasyQuestions
}

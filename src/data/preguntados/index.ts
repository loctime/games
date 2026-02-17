import type { PreguntadosQuestion } from "../../lib/preguntados/types"
import { personasEasyQuestions } from "./personas.easy"
import { personasMediumQuestions } from "./personas.medium"
import { personasHardQuestions } from "./personas.hard"
import { objetosEasyQuestions } from "./objetos.easy"
import { objetosMediumQuestions } from "./objetos.medium"
import { animalesEasyQuestions } from "./animales.easy"
import { animalesMediumQuestions } from "./animales.medium"
import { libreEasyQuestions } from "./libre.easy"
import { libreMediumQuestions } from "./libre.medium"
import { preguntasPolémicasQuestions } from "./polemicas"

export const allPreguntadosQuestions: PreguntadosQuestion[] = [
  ...personasEasyQuestions,
  ...personasMediumQuestions,
  ...personasHardQuestions,
  ...objetosEasyQuestions,
  ...objetosMediumQuestions,
  ...animalesEasyQuestions,
  ...animalesMediumQuestions,
  ...libreEasyQuestions,
  ...libreMediumQuestions,
  ...preguntasPolémicasQuestions
]

export {
  personasEasyQuestions,
  personasMediumQuestions,
  personasHardQuestions,
  objetosEasyQuestions,
  objetosMediumQuestions,
  animalesEasyQuestions,
  animalesMediumQuestions,
  libreEasyQuestions,
  libreMediumQuestions,
  preguntasPolémicasQuestions
}

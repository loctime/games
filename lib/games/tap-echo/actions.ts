import { TAP_ECHO_TARGET_SCORE, type TapEchoState } from "./state"

export const tapEchoIncrement = (state: TapEchoState): TapEchoState => ({
  score: Math.min(state.score + 1, TAP_ECHO_TARGET_SCORE),
})

export const tapEchoReset = (): TapEchoState => ({
  score: 0,
})

export type TapEchoState = {
  score: number
}

export const TAP_ECHO_TARGET_SCORE = 15

export const createTapEchoState = (): TapEchoState => ({
  score: 0,
})

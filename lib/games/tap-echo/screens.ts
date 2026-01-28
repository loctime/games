export const TAP_ECHO_SCREENS = {
  play: "tap-echo-play",
  result: "tap-echo-result",
} as const

export type TapEchoScreen = (typeof TAP_ECHO_SCREENS)[keyof typeof TAP_ECHO_SCREENS]

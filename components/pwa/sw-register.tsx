"use client"

import { useEffect } from "react"

export function SwRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // no-op: avoid breaking app if registration fails
      })
    }

    if (document.readyState === "complete") {
      register()
    } else {
      window.addEventListener("load", register, { once: true })
      return () => window.removeEventListener("load", register)
    }
  }, [])

  return null
}

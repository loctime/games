"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GameButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  disabled?: boolean
}

export function GameButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
}: GameButtonProps) {
  const baseStyles = "font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground shadow-lg active:shadow-md",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground shadow-lg active:shadow-md",
    danger: "bg-destructive text-destructive-foreground shadow-lg active:shadow-md",
    ghost: "bg-transparent text-muted-foreground",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-4 text-lg",
    lg: "px-8 py-5 text-xl",
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </motion.button>
  )
}

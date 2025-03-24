"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: "fade" | "slide-right" | "slide-left" | "scale" | "bounce" | "none"
  hover?: "lift" | "glow" | "border" | "none"
  children: React.ReactNode
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, animation = "fade", hover = "lift", children, ...props }, ref) => {
    const animationClass = React.useMemo(() => {
      switch (animation) {
        case "fade":
          return "fade-in"
        case "slide-right":
          return "slide-in-right"
        case "slide-left":
          return "slide-in-left"
        case "scale":
          return "scale-in"
        case "bounce":
          return "bounce-in"
        case "none":
        default:
          return ""
      }
    }, [animation])

    const hoverClass = React.useMemo(() => {
      switch (hover) {
        case "lift":
          return "card-hover"
        case "glow":
          return "hover:shadow-lg hover:shadow-primary/20"
        case "border":
          return "hover:border-primary transition-colors"
        case "none":
        default:
          return ""
      }
    }, [hover])

    return (
      <Card ref={ref} className={cn(animationClass, hoverClass, className)} {...props}>
        {children}
      </Card>
    )
  },
)
AnimatedCard.displayName = "AnimatedCard"

// Export the component and its parts
export { AnimatedCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }


"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export function GlitchBackground() {
  const controls = useAnimation()
  const rafRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Lightweight noise draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const draw = () => {
      // Static noise blocks
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 25 // very subtle
        data[i] = v // R
        data[i + 1] = v // G
        data[i + 2] = v // B
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      controls.start({
        opacity: [0.15, 0.35, 0.15],
        x: [0, -6, 0],
        transition: { duration: 0.6, ease: "easeOut" },
      })
    }
    window.addEventListener("darkcrypt-sweep", handler as EventListener)
    return () => window.removeEventListener("darkcrypt-sweep", handler as EventListener)
  }, [controls])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={controls}
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 4px)",
          transform: "translateZ(0)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-red-900/10" />
    </div>
  )
}

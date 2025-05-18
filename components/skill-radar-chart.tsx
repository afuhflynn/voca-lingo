"use client"

import { useEffect, useRef } from "react"

export function SkillRadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Chart configuration
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 50

    // Skills data (value from 0 to 1)
    const skills = [
      { name: "Vocabulary", value: 0.75 },
      { name: "Grammar", value: 0.6 },
      { name: "Listening", value: 0.85 },
      { name: "Speaking", value: 0.7 },
      { name: "Reading", value: 0.8 },
      { name: "Writing", value: 0.65 },
    ]

    const numSkills = skills.length
    const angleStep = (Math.PI * 2) / numSkills

    // Draw background
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--background").trim()
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw radar levels
    const levels = 5
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius / levels) * level

      ctx.beginPath()
      for (let i = 0; i < numSkills; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + levelRadius * Math.cos(angle)
        const y = centerY + levelRadius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()

      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border").trim()
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Draw radar axes
    for (let i = 0; i < numSkills; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border").trim()
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Draw skill labels
      const labelRadius = radius + 20
      const labelX = centerX + labelRadius * Math.cos(angle)
      const labelY = centerY + labelRadius * Math.sin(angle)

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(skills[i].name, labelX, labelY)
    }

    // Draw data
    ctx.beginPath()
    for (let i = 0; i < numSkills; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = skills[i].value
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()

    // Create gradient fill
    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY)
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)")
    gradient.addColorStop(1, "rgba(168, 85, 247, 0.2)")

    ctx.fillStyle = gradient
    ctx.fill()

    ctx.strokeStyle = "rgba(99, 102, 241, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < numSkills; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = skills[i].value
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(168, 85, 247, 1)"
      ctx.fill()
    }

    // Draw title
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Language Skills Breakdown", centerX, 20)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}

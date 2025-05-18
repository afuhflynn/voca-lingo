"use client"

import { useEffect, useRef } from "react"

export function ProgressChart() {
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

    // Sample data
    const data = [25, 40, 35, 50, 65, 75, 60, 80, 95, 120, 100, 130, 150, 140]
    const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]

    // Chart dimensions
    const chartWidth = rect.width - 40
    const chartHeight = rect.height - 60
    const barWidth = chartWidth / data.length - 10
    const maxValue = Math.max(...data) * 1.1

    // Draw background
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--background").trim()
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw axes
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border").trim()
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(30, 20)
    ctx.lineTo(30, chartHeight + 30)
    ctx.lineTo(rect.width - 10, chartHeight + 30)
    ctx.stroke()

    // Draw bars
    data.forEach((value, index) => {
      const x = 40 + index * (barWidth + 10)
      const barHeight = (value / maxValue) * chartHeight
      const y = chartHeight + 30 - barHeight

      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, chartHeight + 30)
      gradient.addColorStop(0, "#6366f1")
      gradient.addColorStop(1, "#a855f7")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw labels
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(labels[index], x + barWidth / 2, chartHeight + 45)

      // Draw value
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)
    })

    // Draw y-axis labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i)
      const y = chartHeight + 30 - (value / maxValue) * chartHeight
      ctx.fillText(value.toString(), 25, y + 3)
    }

    // Draw title
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Daily XP Earned (Last 14 Days)", rect.width / 2, 15)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}

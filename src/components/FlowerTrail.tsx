'use client'

import { useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type FlowerType = 'sakura' | 'daisy' | 'peony' | 'star' | 'tulip'

interface Palette {
  petals: string
  center: string
  centerDot: string
}

interface Flower {
  x: number
  y: number
  r: number
  pal: Palette
  type: FlowerType
  rot: number
  spinSpeed: number
  vx: number
  vy: number
  gravity: number
  alpha: number
  fade: number
  scale: number
  scaleTarget: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPES: FlowerType[] = ['sakura', 'daisy', 'peony', 'star', 'tulip']

const PALETTES: Palette[] = [
  { petals: '#f9a8d4', center: '#fde68a', centerDot: '#f59e0b' },
  { petals: '#c4b5fd', center: '#fde68a', centerDot: '#f59e0b' },
  { petals: '#86efac', center: '#fef08a', centerDot: '#facc15' },
  { petals: '#fca5a5', center: '#fde68a', centerDot: '#f59e0b' },
  { petals: '#bfdbfe', center: '#fde68a', centerDot: '#f59e0b' },
  { petals: '#fbcfe8', center: '#fde68a', centerDot: '#fb923c' },
  { petals: '#a5f3fc', center: '#fef08a', centerDot: '#facc15' },
  { petals: '#fed7aa', center: '#fde68a', centerDot: '#f59e0b' },
]

// ─── Color helper ────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

// ─── Flower drawers ──────────────────────────────────────────────────────────

function drawSakura(ctx: CanvasRenderingContext2D, r: number, pal: Palette, alpha: number) {
  const [pr, pg, pb] = hexToRgb(pal.petals)
  const [cr, cg, cb] = hexToRgb(pal.center)
  const [dr, dg, db] = hexToRgb(pal.centerDot)

  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 / 5) * i - Math.PI / 2
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(r * 0.4, -r * 0.1, r * 0.55, r * 0.65, 0, r * 0.95)
    ctx.bezierCurveTo(-r * 0.55, r * 0.65, -r * 0.4, -r * 0.1, 0, 0)
    const g = ctx.createRadialGradient(0, r * 0.4, 0, 0, r * 0.4, r * 0.6)
    g.addColorStop(0, `rgba(${pr},${pg},${pb},${alpha})`)
    g.addColorStop(1, `rgba(255,255,255,${alpha * 0.3})`)
    ctx.fillStyle = g
    ctx.fill()
    ctx.strokeStyle = `rgba(${pr - 20},${pg - 20},${pb - 20},${alpha * 0.3})`
    ctx.lineWidth = 0.5
    ctx.stroke()
    ctx.restore()
  }

  const cg2 = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.28)
  cg2.addColorStop(0, `rgba(255,255,220,${alpha})`)
  cg2.addColorStop(1, `rgba(${cr},${cg},${cb},${alpha})`)
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2)
  ctx.fillStyle = cg2
  ctx.fill()

  for (let i = 0; i < 8; i++) {
    const a = (Math.PI * 2 / 8) * i
    ctx.beginPath()
    ctx.arc(Math.cos(a) * r * 0.18, Math.sin(a) * r * 0.18, r * 0.045, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${dr},${dg},${db},${alpha * 0.9})`
    ctx.fill()
  }
}

function drawDaisy(ctx: CanvasRenderingContext2D, r: number, pal: Palette, alpha: number) {
  const [pr, pg, pb] = hexToRgb(pal.petals)
  const [cr, cg, cb] = hexToRgb(pal.center)

  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 / 12) * i
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, r * 0.6, r * 0.18, r * 0.42, 0, 0, Math.PI * 2)
    const g = ctx.createLinearGradient(0, r * 0.2, 0, r * 1.0)
    g.addColorStop(0, `rgba(${pr},${pg},${pb},${alpha})`)
    g.addColorStop(1, `rgba(255,255,255,${alpha * 0.5})`)
    ctx.fillStyle = g
    ctx.fill()
    ctx.restore()
  }

  const cg2 = ctx.createRadialGradient(-r * 0.07, -r * 0.07, 0, 0, 0, r * 0.32)
  cg2.addColorStop(0, `rgba(255,252,200,${alpha})`)
  cg2.addColorStop(0.6, `rgba(${cr},${cg},${cb},${alpha})`)
  cg2.addColorStop(1, `rgba(${cr - 20},${cg - 20},${cb - 20},${alpha})`)
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2)
  ctx.fillStyle = cg2
  ctx.fill()
}

function drawPeony(ctx: CanvasRenderingContext2D, r: number, pal: Palette, alpha: number) {
  const [pr, pg, pb] = hexToRgb(pal.petals)

  for (let layer = 0; layer < 3; layer++) {
    const petals = 5 + layer * 2
    const lr = r * (1 - layer * 0.2)
    const rotOffset = (layer * Math.PI) / petals
    for (let i = 0; i < petals; i++) {
      const a = (Math.PI * 2 / petals) * i + rotOffset
      ctx.save()
      ctx.rotate(a)
      const brightness = 1 - layer * 0.12
      ctx.beginPath()
      ctx.moveTo(0, r * 0.05)
      ctx.bezierCurveTo(lr * 0.45, r * 0.1, lr * 0.5, lr * 0.75, 0, lr * 0.92)
      ctx.bezierCurveTo(-lr * 0.5, lr * 0.75, -lr * 0.45, r * 0.1, 0, r * 0.05)
      const g = ctx.createRadialGradient(0, lr * 0.5, 0, 0, lr * 0.5, lr * 0.5)
      g.addColorStop(0, `rgba(255,255,255,${alpha * 0.4 * brightness})`)
      g.addColorStop(1, `rgba(${Math.round(pr * brightness)},${Math.round(pg * brightness)},${Math.round(pb * brightness)},${alpha})`)
      ctx.fillStyle = g
      ctx.fill()
      ctx.restore()
    }
  }

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,252,210,${alpha})`
  ctx.fill()
}

function drawStar(ctx: CanvasRenderingContext2D, r: number, pal: Palette, alpha: number) {
  const [pr, pg, pb] = hexToRgb(pal.petals)
  const [cr, cg, cb] = hexToRgb(pal.center)

  for (let i = 0; i < 6; i++) {
    const a = (Math.PI * 2 / 6) * i - Math.PI / 2
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(r * 0.28, r * 0.22)
    ctx.lineTo(0, r)
    ctx.lineTo(-r * 0.28, r * 0.22)
    ctx.closePath()
    const g = ctx.createLinearGradient(0, 0, 0, r)
    g.addColorStop(0, `rgba(${pr},${pg},${pb},${alpha})`)
    g.addColorStop(1, `rgba(255,255,255,${alpha * 0.4})`)
    ctx.fillStyle = g
    ctx.fill()
    ctx.restore()
  }

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
  ctx.fill()
  ctx.beginPath()
  ctx.arc(-r * 0.06, -r * 0.06, r * 0.1, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,255,240,${alpha * 0.7})`
  ctx.fill()
}

function drawTulip(ctx: CanvasRenderingContext2D, r: number, pal: Palette, alpha: number) {
  const [pr, pg, pb] = hexToRgb(pal.petals)

  for (let i = 0; i < 6; i++) {
    const a = (Math.PI * 2 / 6) * i
    ctx.save()
    ctx.rotate(a)
    const isOuter = i < 3
    const scale = isOuter ? 1 : 0.82
    if (!isOuter) ctx.rotate(Math.PI / 6)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(r * 0.38 * scale, -r * 0.05, r * 0.42 * scale, r * 0.7 * scale, 0, r * scale)
    ctx.bezierCurveTo(-r * 0.42 * scale, r * 0.7 * scale, -r * 0.38 * scale, -r * 0.05, 0, 0)
    const brightness = isOuter ? 1 : 0.88
    const g = ctx.createLinearGradient(0, 0, r * 0.3, r * 0.8)
    g.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`)
    g.addColorStop(1, `rgba(${Math.round(pr * brightness)},${Math.round(pg * brightness)},${Math.round(pb * brightness)},${alpha})`)
    ctx.fillStyle = g
    ctx.fill()
    ctx.strokeStyle = `rgba(${pr - 15},${pg - 15},${pb - 15},${alpha * 0.2})`
    ctx.lineWidth = 0.4
    ctx.stroke()
    ctx.restore()
  }

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,250,200,${alpha * 0.9})`
  ctx.fill()
}

const DRAW_FNS: Record<FlowerType, (ctx: CanvasRenderingContext2D, r: number, pal: Palette, alpha: number) => void> = {
  sakura: drawSakura,
  daisy: drawDaisy,
  peony: drawPeony,
  star: drawStar,
  tulip: drawTulip,
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FlowerTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let flowers: Flower[] = []
    let lastSpawn = 0
    let rafId: number

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function spawnFlower(x: number, y: number) {
      flowers.push({
        x, y,
        r: 10 + Math.random() * 10,
        pal: PALETTES[Math.floor(Math.random() * PALETTES.length)],
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        rot: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.025,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -0.6 - Math.random() * 0.8,
        gravity: 0.018,
        alpha: 0.9,
        fade: 0.008 + Math.random() * 0.006,
        scale: 0,
        scaleTarget: 1,
      })
    }

    function onMouseMove(e: MouseEvent) {
      const now = Date.now()
      if (now - lastSpawn > 55) {
        spawnFlower(e.clientX, e.clientY)
        lastSpawn = now
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      flowers = flowers.filter(f => f.alpha > 0)

      for (const f of flowers) {
        f.x += f.vx
        f.y += f.vy
        f.vy += f.gravity
        f.rot += f.spinSpeed
        f.scale += (f.scaleTarget - f.scale) * 0.15
        f.alpha -= f.fade
        if (f.alpha < 0) f.alpha = 0

        ctx!.save()
        ctx!.translate(f.x, f.y)
        ctx!.rotate(f.rot)
        ctx!.scale(f.scale, f.scale)
        DRAW_FNS[f.type](ctx!, f.r, f.pal, Math.max(0, f.alpha))
        ctx!.restore()
      }

      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}

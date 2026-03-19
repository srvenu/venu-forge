# Frontend & UI Design Skill Reference

A mastery reference for building modern, animated, interactive web experiences.

---

## Framework — Next.js (App Router)

### Core Concepts
- **App Router** — file-based routing via `app/` directory
- **Server Components (RSC)** — default; zero JS to client, ideal for data fetching
- **Client Components** — `"use client"` directive; required for interactivity, hooks, browser APIs
- **Layouts** — `layout.tsx` for persistent shell (nav, sidebar); nested layouts supported
- **Loading / Error Boundaries** — `loading.tsx`, `error.tsx` per route segment
- **Route Groups** — `(group)/` folders to organize without affecting URL
- **Parallel & Intercepting Routes** — modals, split views via `@slot` and `(..)route`
- **Server Actions** — `"use server"` async functions for form mutations without an API layer

### Data Fetching
```ts
// Server Component — fetch on server, stream to client
async function Page() {
  const data = await fetch('...', { next: { revalidate: 60 } }) // ISR
  const data = await fetch('...', { cache: 'no-store' })         // SSR
  const data = await fetch('...', { cache: 'force-cache' })      // SSG
}
```

### Metadata & SEO
```ts
// app/layout.tsx or page.tsx
export const metadata: Metadata = {
  title: { default: 'Site', template: '%s | Site' },
  description: '...',
  openGraph: { ... },
}
// Dynamic
export async function generateMetadata({ params }): Promise<Metadata> { ... }
```

### Key Patterns
- `next/image` — always use for images (lazy load, format optimization, CLS prevention)
- `next/font` — self-host fonts with zero layout shift
- `next/link` — prefetching client navigation
- `next/dynamic` — lazy load heavy components (Three.js, charts)
```ts
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })
```

---

## Styling — Tailwind CSS + shadcn/ui

### Tailwind Principles
- **Utility-first** — compose styles directly in JSX, no separate CSS files
- **Design tokens** — extend `tailwind.config.ts` for custom colors, fonts, spacing
- **HSL CSS variables** — use for theming (dark mode, brand colors)
```css
:root { --primary: 220 90% 56%; }
.dark { --primary: 217 91% 65%; }
```
- **CVA (class-variance-authority)** — typed component variants
```ts
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', ghost: '...', destructive: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})
```
- **cn() utility** — always use `clsx` + `tailwind-merge` to merge classes safely
```ts
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...inputs) => twMerge(clsx(inputs))
```

### shadcn/ui
- Component primitives built on **Radix UI** — fully accessible, headless
- Install components: `npx shadcn-ui@latest add <component>`
- Components live in `src/components/ui/` — owned by the project, edit freely
- Compose with variants; don't wrap with unnecessary extra divs
- Key components: `Button`, `Dialog`, `Sheet`, `Command`, `Popover`, `Form`, `Table`, `Tabs`, `Tooltip`, `Card`

### Dark Mode
```ts
// next-themes
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
```
- Use `dark:` Tailwind prefix for dark variants
- Avoid hardcoded colors — always reference CSS variables via `hsl(var(--token))`

---

## Animation — Framer Motion

### Mental Model
- `motion.div` — any HTML element as an animatable unit
- `initial` / `animate` / `exit` — declarative state-based animation
- `variants` — named animation states shared across a tree
- `AnimatePresence` — enables `exit` animations when components unmount

### Core Patterns
```tsx
// Basic entrance
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
/>

// Stagger children
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}
<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item} />)}
</motion.ul>

// Scroll-triggered
import { useInView } from 'framer-motion'
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-100px' })
<motion.div ref={ref} animate={inView ? 'show' : 'hidden'} variants={item} />

// Layout animation (auto-animates position/size changes)
<motion.div layout layoutId="card" />

// Gesture
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} />
```

### useMotionValue + useTransform
```tsx
const x = useMotionValue(0)
const rotate = useTransform(x, [-200, 200], [-30, 30])
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])
<motion.div drag="x" style={{ x, rotate, opacity }} />
```

---

## Animation — GSAP (Advanced Scroll Effects)

### Setup with Next.js
```ts
// Always register plugins inside useLayoutEffect (not useEffect) for SSR safety
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Core API
```ts
// Tween
gsap.to('.target', { x: 100, opacity: 1, duration: 0.6, ease: 'power3.out' })
gsap.from('.target', { y: 60, opacity: 0, duration: 0.8 })
gsap.fromTo('.target', { opacity: 0 }, { opacity: 1, duration: 1 })

// Timeline — sequence animations
const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } })
tl.from('.heading', { y: 40, opacity: 0 })
  .from('.subtext', { y: 20, opacity: 0 }, '-=0.3') // overlap by 0.3s
  .from('.cta', { scale: 0.8, opacity: 0 }, '<0.2')
```

### ScrollTrigger
```ts
gsap.to('.panel', {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    pin: true,              // pin the container while scrolling
    scrub: 1,               // smooth scrub (seconds to catch up)
    snap: 1 / (panels.length - 1),
    end: () => `+=${containerWidth}`,
  },
})

// Parallax
gsap.to('.bg-layer', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true },
})
```

### Cleanup (React)
```ts
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // all gsap calls here are scoped
    gsap.from('.item', { ... })
  }, containerRef)
  return () => ctx.revert() // cleanup on unmount
}, [])
```

### GSAP vs Framer Motion
| Use Case | Tool |
|---|---|
| Declarative UI transitions, gestures, layout | Framer Motion |
| Scroll-driven sequences, pinning, parallax | GSAP ScrollTrigger |
| Complex timelines, staggered narrative animations | GSAP |
| Spring physics, drag interactions | Framer Motion |

---

## 3D & Graphics — Three.js / React Three Fiber

### React Three Fiber (R3F) Mental Model
- R3F renders Three.js declaratively inside React
- Canvas → Scene → Camera → Lights → Meshes
- All Three.js classes are available as JSX elements (lowercase)

### Setup
```bash
npm install three @react-three/fiber @react-three/drei
```

### Basic Scene
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} castShadow />
      <mesh rotation={[0.4, 0.4, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" metalness={0.4} roughness={0.2} />
      </mesh>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

### Animation with useFrame
```tsx
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function RotatingBox() {
  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5
    // state.clock.elapsedTime for time-based animation
  })
  return <mesh ref={meshRef}><boxGeometry /><meshStandardMaterial /></mesh>
}
```

### Key Drei Helpers
| Helper | Purpose |
|---|---|
| `OrbitControls` | Mouse-drag camera control |
| `Environment` | HDRI lighting presets |
| `useGLTF` | Load .glb/.gltf models |
| `useTexture` | Load textures |
| `Text` | 3D text rendering |
| `Float` | Floating/bobbing animation |
| `MeshDistortMaterial` | Distortion shader |
| `Sparkles` | Particle sparkles |
| `ScrollControls` + `useScroll` | Scroll-driven 3D scenes |
| `Html` | Overlay HTML on 3D objects |

### Scroll-Driven 3D
```tsx
import { ScrollControls, useScroll } from '@react-three/drei'

function Model() {
  const scroll = useScroll()
  useFrame(() => {
    const t = scroll.offset // 0 to 1
    mesh.current.rotation.y = t * Math.PI * 2
  })
}

<Canvas>
  <ScrollControls pages={5} damping={0.3}>
    <Model />
  </ScrollControls>
</Canvas>
```

### Performance Tips
- `next/dynamic` with `{ ssr: false }` — Three.js requires browser APIs
- Use `<Suspense>` with a fallback for model loading
- `Instances` / `InstancedMesh` for repeated geometries
- `useMemo` for geometries and materials to avoid recreation

---

## State Management — Zustand

### Why Zustand
- No boilerplate, no providers, no reducers
- Direct store access from any component
- Built-in devtools, persistence, immer middleware

### Basic Store
```ts
import { create } from 'zustand'

interface UIStore {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  setTheme: (theme: UIStore['theme']) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))

// Usage — no provider needed
const theme = useUIStore((state) => state.theme) // select slice, prevent re-renders
```

### Middleware Patterns
```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

const useStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        items: [],
        addItem: (item) => set((state) => { state.items.push(item) }),
      })),
      { name: 'app-storage' }
    )
  )
)
```

### Patterns
- **Slice pattern** — split large stores into slices, combine with `create`
- **Selectors** — always select minimal slice to prevent unnecessary re-renders
- **`subscribeWithSelector`** middleware — subscribe outside React (for GSAP, Three.js)
```ts
import { subscribeWithSelector } from 'zustand/middleware'
useStore.subscribe((state) => state.cameraTarget, (target) => {
  gsap.to(camera.position, { ...target, duration: 1 })
})
```

---

## Interactive Visuals — D3.js / Chart.js

### D3.js — Data-Driven Documents

**Mental model:** D3 manipulates the DOM (or SVG) based on data bindings. In React, use D3 for calculations only — let React handle the DOM.

```tsx
// React + D3 pattern: D3 for math, React for rendering
import * as d3 from 'd3'

function BarChart({ data }) {
  const width = 600, height = 400
  const margin = { top: 20, right: 20, bottom: 40, left: 40 }

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.2)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top])

  return (
    <svg width={width} height={height}>
      {data.map(d => (
        <rect
          key={d.label}
          x={xScale(d.label)}
          y={yScale(d.value)}
          width={xScale.bandwidth()}
          height={height - margin.bottom - yScale(d.value)}
          fill="#6366f1"
        />
      ))}
    </svg>
  )
}
```

**Key D3 Modules**
| Module | Use |
|---|---|
| `d3-scale` | Linear, band, time, color scales |
| `d3-shape` | Line, area, arc, pie generators |
| `d3-hierarchy` | Tree, treemap, pack layouts |
| `d3-force` | Force-directed graph simulation |
| `d3-geo` | Map projections |
| `d3-interpolate` | Value interpolation for animation |
| `d3-transition` | DOM transitions (use with `useEffect`) |

### Chart.js — Rapid Charting

Use via **react-chartjs-2** for fast, standard charts.

```tsx
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Revenue',
    data: [100, 200, 150],
    borderColor: '#6366f1',
    tension: 0.4,
    fill: true,
    backgroundColor: 'rgba(99,102,241,0.1)',
  }]
}

<Line data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
```

### D3 vs Chart.js
| | D3.js | Chart.js |
|---|---|---|
| **Control** | Full — pixel perfect custom viz | Limited to chart types |
| **Learning curve** | Steep | Gentle |
| **Custom layouts** | Yes (force, tree, geo) | No |
| **Standard charts** | Verbose | Fast |
| **Animation** | Manual | Built-in |
| **Best for** | Custom interactive data stories | Dashboards, reports |

---

## Integration Patterns

### Framer Motion + Scroll (without GSAP)
```tsx
import { motion, useScroll, useTransform } from 'framer-motion'

function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  return <motion.div style={{ y }}>{/* content */}</motion.div>
}
```

### R3F + Zustand (shared state)
```ts
// Camera position driven by Zustand store
function CameraRig() {
  const target = useSceneStore(s => s.focusTarget)
  useFrame(({ camera }) => {
    camera.position.lerp(target, 0.05)
  })
  return null
}
```

### GSAP ScrollTrigger + Next.js App Router
```tsx
'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal', {
        y: 60, opacity: 0, stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return <div ref={ref}><p className="reveal">Hello</p></div>
}
```

---

## Performance Checklist

- [ ] Dynamic import heavy libraries (Three.js, D3, GSAP) with `next/dynamic`
- [ ] Always `{ ssr: false }` for canvas/WebGL components
- [ ] Use `will-change: transform` sparingly — only on actively animating elements
- [ ] Prefer CSS transitions for simple hover effects over JS animation
- [ ] Wrap R3F scenes in `<Suspense>` for model/texture loading
- [ ] Select Zustand state slices (not the whole store object) to prevent re-renders
- [ ] Use `useLayoutEffect` (not `useEffect`) for GSAP to avoid flash of unstyled content
- [ ] Cleanup GSAP with `gsap.context().revert()` and ScrollTrigger instances on unmount
- [ ] Use `next/image` for all images
- [ ] Bundle analyze with `@next/bundle-analyzer` before shipping

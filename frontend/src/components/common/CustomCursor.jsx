import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only on desktop
    if ('ontouchstart' in window) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnterInteractive = () => setHovering(true)
    const onLeaveInteractive = () => setHovering(false)

    document.addEventListener('mousemove', onMove)

    // Observe interactive elements
    const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    let raf
    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9998] pointer-events-none mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Outer follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 z-[9997] pointer-events-none mix-blend-difference transition-[width,height,border-color] duration-300 ease-out"
        style={{
          willChange: 'transform',
          width: hovering ? '56px' : '40px',
          height: hovering ? '56px' : '40px',
          borderColor: hovering ? 'rgba(124, 58, 237, 0.6)' : 'rgba(255,255,255,0.3)',
          marginLeft: hovering ? '-8px' : '0px',
          marginTop: hovering ? '-8px' : '0px',
        }}
      />
    </>
  )
}

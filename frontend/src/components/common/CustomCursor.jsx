import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from "framer-motion";

import { audio } from "../../lib/audio";
import { useTheme } from "../../lib/theme";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const { activeTheme } = useTheme();

  const isHoveredRef = useRef(isHovered);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth physics
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.5 });

  const slowX = useSpring(mouseX, { damping: 50, stiffness: 150, mass: 1.5 });
  const slowY = useSpring(mouseY, { damping: 50, stiffness: 150, mass: 1.5 });

  const trailingX = useSpring(mouseX, { damping: 60, stiffness: 100, mass: 2 });
  const trailingY = useSpring(mouseY, { damping: 60, stiffness: 100, mass: 2 });

  // Velocity for rotation effects
  const xVel = useVelocity(mouseX);
  const rotation = useTransform(xVel, [-1000, 1000], [-90, 90]);
  const counterRotation = useTransform(rotation, r => -r);
  const skewX = useTransform(xVel, [-1000, 1000], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Enable only on desktop
      if (window.innerWidth < 1024) {
        if (isVisible) setIsVisible(false);
        return;
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        if (!isHoveredRef.current) audio.playHover();
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        // Fallback for standard clickable items
        const isClickable = target.closest("button, a, input, select, textarea, [role='button']");
        if (isClickable) {
          if (!isHoveredRef.current) audio.playHover();
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      
      {/* 1. Trailing Outer Star (Slowest) */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : 40,
          height: isHovered ? 48 : 40,
          rotate: rotation,
        }}
        animate={{ scale: isClicking ? 0.8 : 1, opacity: isHovered ? 0.3 : 0.15 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl" style={{ fill: activeTheme.sky.start, opacity: 0.5 }}>
           {/* Beautiful curved 4-point star */}
           <path d="M50 0C50 27.6142 72.3858 50 100 50C72.3858 50 50 72.3858 50 100C50 72.3858 27.6142 50 0 50C27.6142 50 50 27.6142 50 0Z"/>
        </svg>
      </motion.div>

      {/* 2. Middle Counter-Rotating Star (Medium Slow) */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: slowX,
          y: slowY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 30 : 25,
          height: isHovered ? 30 : 25,
          rotate: counterRotation, // Counter-rotate relative to the outer star
        }}
        animate={{ scale: isClicking ? 0.8 : 1, opacity: isHovered ? 0.6 : 0.2 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: activeTheme.sky.start }}>
           <path d="M50 5C50 29 71 50 95 50C71 50 50 71 50 95C50 71 29 50 5 50C29 50 50 29 50 5Z"/>
        </svg>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute rounded-full filter blur-[15px] opacity-30 w-full h-full`}
            style={{ backgroundColor: activeTheme.sky.start }}
          />
        )}
      </motion.div>

      {/* 3. Core Physics Halo (Follows smoothed mouse) */}
      <motion.div
        className="absolute top-0 left-0 rounded-full flex items-center justify-center border"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 24 : 18,
          height: isHovered ? 24 : 18,
          skewX,
          borderColor: isHovered ? activeTheme.sky.start : activeTheme.river.color,
          backgroundColor: isHovered ? `${activeTheme.sky.start}1A` : 'transparent',
          boxShadow: isHovered ? `0 0 15px ${activeTheme.sky.start}66` : 'none',
        }}
        animate={{ scale: isClicking ? 0.7 : 1 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`absolute -bottom-6 whitespace-nowrap text-[8px] tracking-[0.3em] font-bold font-mono uppercase text-center ${activeTheme.ui.accent}`}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 4. Sharp Center Dot (Instantly follows raw mouse) */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: isHovered ? '#FFFFFF' : activeTheme.sky.start }}>
           <path d="M50 0C50 27.6142 72.3858 50 100 50C72.3858 50 50 72.3858 50 100C50 72.3858 27.6142 50 0 50C27.6142 50 50 27.6142 50 0Z"/>
        </svg>
      </motion.div>
    </div>
  );
}

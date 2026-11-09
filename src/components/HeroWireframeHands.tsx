import { motion } from "motion/react";

interface HeroWireframeHandsProps {
  motionEnabled: boolean;
}

/**
 * Animated Framer Motion hero visual using the uploaded monochrome wireframe
 * hands asset (/assets/aistudio/image_56def60e.png) inside an Isoquant
 * dotted-blueprint schematic frame.
 */
export function HeroWireframeHands({ motionEnabled }: HeroWireframeHandsProps) {
  const imgUrl = `${import.meta.env.BASE_URL}assets/aistudio/image_56def60e.png`;

  return (
    <motion.div
      className="hero-schematic-frame"
      initial={motionEnabled ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="hero-wireframe-stage">
        {/* Top-Right Wireframe Hand gliding diagonally down-left toward center */}
        <motion.div
          className="wireframe-layer wireframe-top-right"
          style={{ backgroundImage: `url("${imgUrl}")` }}
          initial={motionEnabled ? { x: 48, y: -48, opacity: 0.35 } : false}
          animate={
            motionEnabled
              ? {
                  x: [48, 0, 6, 0],
                  y: [-48, 0, -6, 0],
                  opacity: [0.35, 1, 0.92, 1],
                }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={
            motionEnabled
              ? {
                  duration: 6.5,
                  times: [0, 0.42, 0.72, 1],
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }
              : { duration: 0 }
          }
        />

        {/* Bottom-Left Wireframe Hand gliding diagonally up-right toward center */}
        <motion.div
          className="wireframe-layer wireframe-bottom-left"
          style={{ backgroundImage: `url("${imgUrl}")` }}
          initial={motionEnabled ? { x: -48, y: 48, opacity: 0.35 } : false}
          animate={
            motionEnabled
              ? {
                  x: [-48, 0, -6, 0],
                  y: [48, 0, 6, 0],
                  opacity: [0.35, 1, 0.92, 1],
                }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={
            motionEnabled
              ? {
                  duration: 6.5,
                  times: [0, 0.42, 0.72, 1],
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }
              : { duration: 0 }
          }
        />

        {/* Subtle Engineering Schematic Hairline Overlay */}
        <svg className="hero-schematic-svg" viewBox="0 0 564 704" fill="none">
          <line
            x1="0"
            y1="352"
            x2="564"
            y2="352"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="248"
            y1="0"
            x2="248"
            y2="704"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <motion.circle
            cx="248"
            cy="352"
            r="6"
            stroke="#ffffff"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.15)"
            animate={
              motionEnabled
                ? { scale: [0.8, 1.6, 0.8], opacity: [0.3, 0.95, 0.3] }
                : { scale: 1, opacity: 0.6 }
            }
            transition={
              motionEnabled
                ? { duration: 3.25, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0 }
            }
          />
          <rect
            x="16"
            y="16"
            width="532"
            height="672"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
        </svg>

        <div className="hero-schematic-vignette" />
      </div>
    </motion.div>
  );
}

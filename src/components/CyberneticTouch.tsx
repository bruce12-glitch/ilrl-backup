import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { RotateCcw, Sparkles, Unlink } from "lucide-react";
import {
  buildElectricArc,
  buildSupernovaShockwaves,
  computeStageTilt,
  CONTACT_NORM,
  getContactCoordinates,
  getHandOffsets,
  type ElectricArc,
  type ShockwaveRing,
  type SparkParticle,
} from "../utils/touchPhysics";
import creationTouchImg from "../assets/images/creation_touch_vertical_1794244050806.jpg";

interface CyberneticTouchProps {
  motionEnabled?: boolean;
  variant?: "hero" | "bottom";
}

export function CyberneticTouch({ motionEnabled = true, variant = "bottom" }: CyberneticTouchProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [connected, setConnected] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [phaseLabel, setPhaseLabel] = useState<"approaching" | "connected" | "separated">("approaching");

  const particlesRef = useRef<SparkParticle[]>([]);
  const shockwavesRef = useRef<ShockwaveRing[]>([]);
  const electricArcsRef = useRef<ElectricArc[]>([]);
  const animationPhaseRef = useRef<0 | 1>(0);
  const touchProgressRef = useRef<number>(0);
  const approachRafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const createSupernovaBurst = useCallback((x: number, y: number, stageWidth: number) => {
    shockwavesRef.current.push(...buildSupernovaShockwaves(stageWidth));
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.008,
        color: Math.random() > 0.3 ? "#ffecb3" : "#ffa433",
      });
    }
  }, []);

  const triggerConnection = useCallback(() => {
    if (approachRafRef.current) cancelAnimationFrame(approachRafRef.current);
    if (timerRef.current) window.clearTimeout(timerRef.current);

    setConnected(false);
    setPhaseLabel("approaching");
    particlesRef.current = [];
    shockwavesRef.current = [];
    electricArcsRef.current = [];
    animationPhaseRef.current = 0;
    touchProgressRef.current = 0;

    if (!motionEnabled) {
      setConnected(true);
      setPhaseLabel("connected");
      animationPhaseRef.current = 1;
      touchProgressRef.current = 1;
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setConnected(true);
      const startTime = performance.now();
      const duration = 2800;

      const trackApproach = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        touchProgressRef.current = progress;

        const canvas = canvasRef.current;
        const width = canvas?.width ?? 480;
        const height = canvas?.height ?? 853;
        const { x: targetX, y: targetY } = getContactCoordinates(width, height);

        if (progress > 0.45 && progress < 0.95 && Math.random() < 0.35) {
          electricArcsRef.current.push(buildElectricArc(targetX, targetY, progress));
        }

        if (progress >= 0.95 && animationPhaseRef.current === 0) {
          animationPhaseRef.current = 1;
          setPhaseLabel("connected");
          createSupernovaBurst(targetX, targetY, width);
        }

        if (progress < 1) {
          approachRafRef.current = requestAnimationFrame(trackApproach);
        }
      };

      approachRafRef.current = requestAnimationFrame(trackApproach);
    }, 150);
  }, [createSupernovaBurst, motionEnabled]);

  const separateHands = useCallback(() => {
    if (approachRafRef.current) cancelAnimationFrame(approachRafRef.current);
    if (timerRef.current) window.clearTimeout(timerRef.current);

    setConnected(false);
    setPhaseLabel("separated");
    particlesRef.current = [];
    shockwavesRef.current = [];
    electricArcsRef.current = [];
    animationPhaseRef.current = 0;
    touchProgressRef.current = 0;
  }, []);

  const handleToggleMode = useCallback(() => {
    if (connected) {
      separateHands();
    } else {
      triggerConnection();
    }
  }, [connected, separateHands, triggerConnection]);

  useEffect(() => {
    triggerConnection();
    return () => {
      if (approachRafRef.current) cancelAnimationFrame(approachRafRef.current);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [triggerConnection]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width));
      canvas.height = Math.max(1, Math.round(rect.height));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const { x: targetX, y: targetY } = getContactCoordinates(width, height);

      ctx.clearRect(0, 0, width, height);

      if (motionEnabled && animationPhaseRef.current === 1 && Math.random() < 0.15) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.5;
        particlesRef.current.push({
          x: targetX + (Math.random() - 0.5) * 6,
          y: targetY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 2 + 0.8,
          alpha: 0.9,
          decay: 0.02,
          color: "#ffe29a",
        });
      }

      const arcs = electricArcsRef.current;
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = Math.max(0, arc.life);
        ctx.beginPath();
        ctx.moveTo(arc.x1, arc.y1);

        const steps = 5;
        for (let j = 1; j < steps; j++) {
          const t = j / steps;
          const px = arc.x1 + (arc.x2 - arc.x1) * t + (Math.random() - 0.5) * 16;
          const py = arc.y1 + (arc.y2 - arc.y1) * t + (Math.random() - 0.5) * 16;
          ctx.lineTo(px, py);
        }
        ctx.lineTo(arc.x2, arc.y2);
        ctx.stroke();

        arc.life -= arc.decay;
        if (arc.life <= 0) arcs.splice(i, 1);
      }

      const waves = shockwavesRef.current;
      for (let i = waves.length - 1; i >= 0; i--) {
        const sw = waves[i];
        ctx.beginPath();
        ctx.arc(targetX, targetY, sw.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 235, 185, ${sw.alpha})`;
        ctx.lineWidth = sw.width;
        ctx.stroke();

        sw.r += sw.speed;
        sw.alpha = Math.max(0, 1 - sw.r / sw.maxR);
        if (sw.r >= sw.maxR) waves.splice(i, 1);
      }

      const parts = particlesRef.current;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) parts.splice(i, 1);
      }

      ctx.globalAlpha = 1.0;
      if (motionEnabled) {
        rafId = requestAnimationFrame(render);
      }
    };

    if (motionEnabled) {
      rafId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [motionEnabled]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setTilt(computeStageTilt(e.clientX, e.clientY, rect, 8));
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const offsets = getHandOffsets(connected);
  const bgUrl = `url("${creationTouchImg}")`;

  return (
    <div
      className={`cyber-touch-wrapper cyber-touch-${variant}`}
      data-testid={`cyber-touch-${variant}`}
      data-state={phaseLabel}
    >
      <div className="cyber-stage-frame">
        <div
          ref={stageRef}
          id={variant === "bottom" ? "stage" : `stage-${variant}`}
          className={`stage ${connected ? "connected" : ""}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={triggerConnection}
          role="img"
          aria-label="Cybernetic hand and human hand reaching toward the center in a Creation of Adam convergence"
          style={{
            transform: `perspective(1000px) rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg)`,
          }}
        >
          {/* Atmospheric Blurred Underlayer */}
          <div className="layer-bg" style={{ backgroundImage: bgUrl }} />
          <div className="vignette" />

          {/* Diagonal split isolation: Cyber Hand (Top-Left) */}
          <motion.div
            id={variant === "bottom" ? "handCyber" : `handCyber-${variant}`}
            className="hand hand-cyber"
            style={{ backgroundImage: bgUrl }}
            initial={{ x: -160, y: -160 }}
            animate={{ x: offsets.cyber.x, y: offsets.cyber.y }}
            transition={
              motionEnabled
                ? { duration: 2.8, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
          />

          {/* Diagonal split isolation: Human Hand (Bottom-Right) */}
          <motion.div
            id={variant === "bottom" ? "handHuman" : `handHuman-${variant}`}
            className="hand hand-human"
            style={{ backgroundImage: bgUrl }}
            initial={{ x: 160, y: 160 }}
            animate={{ x: offsets.human.x, y: offsets.human.y }}
            transition={
              motionEnabled
                ? { duration: 2.8, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
          />

          {/* Particle and Lightning Arc Canvas */}
          <canvas
            ref={canvasRef}
            id={variant === "bottom" ? "fxCanvas" : `fxCanvas-${variant}`}
            className="fx-canvas"
          />

          {/* Divine Light Emergence Elements */}
          <div
            className="light-core"
            style={{
              left: `${CONTACT_NORM.x * 100}%`,
              top: `${CONTACT_NORM.y * 100}%`,
            }}
          />
          <div
            className="flare-streak"
            style={{
              left: `${CONTACT_NORM.x * 100}%`,
              top: `${CONTACT_NORM.y * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="controls" role="group" aria-label="Cybernetic convergence animation controls">
        <button
          type="button"
          className="btn"
          id={variant === "bottom" ? "replayBtn" : `replayBtn-${variant}`}
          onClick={triggerConnection}
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>Replay Reconnection</span>
        </button>
        <button
          type="button"
          className="btn"
          id={variant === "bottom" ? "toggleModeBtn" : `toggleModeBtn-${variant}`}
          onClick={handleToggleMode}
        >
          {connected ? <Unlink size={14} aria-hidden="true" /> : <Sparkles size={14} aria-hidden="true" />}
          <span>{connected ? "Separate Hands" : "Touch Hands"}</span>
        </button>
      </div>
    </div>
  );
}

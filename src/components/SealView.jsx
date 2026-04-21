import { useState, useRef, useMemo } from "react";

export function SealView({ theme, onBack, onBroken }) {
  const [progress, setProgress] = useState(0);
  const [shatter, setShatter] = useState(false);
  const holdRef = useRef(null);
  const rafRef = useRef(null);

  const tick = () => {
    if (!holdRef.current) return;
    const elapsed = (performance.now() - holdRef.current) / 1200;
    const p = Math.min(1, elapsed);
    setProgress(p);
    if (p >= 1) {
      setShatter(true);
      holdRef.current = null;
      setTimeout(() => onBroken(), 680);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (shatter) return;
    holdRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  };

  const end = () => {
    if (shatter) return;
    holdRef.current = null;
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
  };

  const stars = useMemo(
    () =>
      Array.from({ length: 22 }).map(() => ({
        x: 50 + (Math.random() - 0.5) * 80,
        y: 50 + (Math.random() - 0.5) * 80,
        d: Math.random() * 0.35,
        s: 0.5 + Math.random() * 0.7,
        r: Math.random() * 360,
      })),
    [],
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.bg,
        color: theme.fg,
        display: "flex",
        flexDirection: "column",
        padding: "0 22px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          paddingTop: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: theme.muted,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "none",
            color: theme.muted,
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← назад
        </button>
        <span>печат</span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {shatter &&
          stars.map((st, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${st.x}%`,
                top: `${st.y}%`,
                color: theme.accent,
                fontSize: 14 * st.s,
                transform: `rotate(${st.r}deg)`,
                animation: `starPop 900ms ${st.d}s ease-out both`,
                pointerEvents: "none",
              }}
            >
              ✦
            </span>
          ))}

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: 4,
            color: theme.accent,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          предпоследна стъпка
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 30,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 36,
          }}
        >
          Счупи печата
        </div>

        <div
          onMouseDown={start}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchEnd={end}
          style={{
            position: "relative",
            width: 160,
            height: 160,
            cursor: shatter ? "default" : "pointer",
            touchAction: "none",
            transform: shatter
              ? "scale(1.18)"
              : `scale(${1 + progress * 0.06})`,
            transition: shatter
              ? "transform 0.35s ease-out"
              : "transform 0.12s",
          }}
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            style={{ position: "absolute", inset: 0 }}
          >
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke={theme.hair}
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke={theme.accent}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={`${progress * 452.39} 452.39`}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              style={{
                transition: progress === 0 ? "stroke-dasharray 0.3s" : "none",
              }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 22,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${theme.accent}, ${theme.accent}99 60%, ${theme.accent}55)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--display)",
              fontSize: 52,
              color: theme.bg,
              fontStyle: "italic",
              fontWeight: 400,
              boxShadow: `inset 0 0 18px rgba(0,0,0,0.3)`,
              opacity: shatter ? 0 : 1,
              transition: "opacity 0.35s",
            }}
          >
            Д
          </div>
          {shatter && (
            <svg
              viewBox="0 0 160 160"
              style={{
                position: "absolute",
                inset: 0,
                animation: "shardFade 600ms ease-out",
              }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <line
                  key={a}
                  x1="80"
                  y1="80"
                  x2={80 + Math.cos((a * Math.PI) / 180) * 66}
                  y2={80 + Math.sin((a * Math.PI) / 180) * 66}
                  stroke={theme.accent}
                  strokeWidth="2"
                />
              ))}
            </svg>
          )}
        </div>

        <div
          style={{
            fontFamily: "var(--serif-text)",
            fontSize: 14,
            color: theme.muted,
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 36,
            minHeight: 20,
          }}
        >
          {shatter
            ? "отворено ✦"
            : progress === 0
              ? "задръж"
              : progress < 1
                ? "...още малко"
                : "счупено"}
        </div>
      </div>
    </div>
  );
}

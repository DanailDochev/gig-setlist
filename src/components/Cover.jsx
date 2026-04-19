import { useState, useEffect } from "react";
import { PhotoBg } from "./PhotoBg";
import { Grain } from "./Grain";

export function Cover({ theme, coverPhoto, onEnter }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.bg,
        color: theme.fg,
        overflow: "hidden",
      }}
    >
      <PhotoBg
        src={coverPhoto}
        shade={0.68}
        pos="50% 28%"
        scale={mounted ? 1.22 : 1.35}
        blur={0}
      />
      <Grain o={0.28} />

      {/* glow orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)`,
            top: "-60px",
            left: "-80px",
            animation: "glowDrift1 12s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.accent}20 0%, transparent 70%)`,
            bottom: "80px",
            right: "-60px",
            animation: "glowDrift2 17s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)`,
            top: "35%",
            left: "30%",
            animation: "glowDrift3 9s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* scan lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
        }}
      />

      {/* top meta */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 22,
          right: 22,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: 3,
          color: theme.muted,
          textTransform: "uppercase",
        }}
      >
        <span>Акустично</span>
        <span>Акустично</span>
      </div>

      {/* typographic block */}
      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: "18%",
          transition: "all 1.1s 0.2s cubic-bezier(.2,.7,.2,1)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(18px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: 3,
            color: theme.accent,
            textTransform: "uppercase",
            marginBottom: 16,
            fontWeight: 700,
          }}
        >
          Дани Дочев — на живо
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 82,
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.035em",
          }}
        >
          Мементо
          <br />
          <i style={{ color: theme.accent, fontWeight: 300 }}>21.04.26</i>
        </div>
        <div
          style={{
            marginTop: 18,
            width: 52,
            height: 1,
            background: theme.fg,
            opacity: 0.4,
            transition: "transform 1.2s 0.9s ease-out",
            transform: mounted ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            fontFamily: "var(--serif-text)",
            fontSize: 15,
            lineHeight: 1.55,
            color: theme.fg,
            marginTop: 18,
            opacity: 0.72,
            maxWidth: 290,
            fontStyle: "italic",
          }}
        >
          1.Неиздавани песни.
          <br />
          2.Main set list.
          <br />
          3.Изненада :)
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(transparent, ${theme.bg} 55%)`,
          padding: "60px 22px 44px",
        }}
      >
        <button
          onClick={onEnter}
          style={{
            width: "100%",
            padding: "18px 20px",
            background: theme.fg,
            color: theme.bg,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 500,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Влез в програмата</span>
          <span>⟶</span>
        </button>
      </div>
    </div>
  );
}

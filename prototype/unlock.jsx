// Unlock sequence · PIN → Wax Seal → Riddle → Reveal
const { useState, useEffect, useRef } = React;

// ── Config ────────────────────────────────────────────────────────────────────
const THEME = {
  bg: "#0e0a09",
  fg: "#f0ece4",
  accent: "#8b1a1a",
  muted: "#5a4a42",
  hair: "#2a1f1a",
  alt: "#140d0b",
};
const SECRET_PIN = "2104";
const WORD = "КАРАОКЕ".split(""); // К А Р А О К Е
const SHOWN = new Set([0, WORD.length - 1]); // reveal К (0) and Е (6)
const RIDDLE =
  "Забавление, при което ентусиасти пеят под акомпанимента на известни песни. Обикновено има сцена с микрофон и екран, на който се показва текста на песента заедно с музиката.";
const ALPHA = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ".split("");
// ─────────────────────────────────────────────────────────────────────────────

// inject keyframes once
if (!document.getElementById("unlock-css")) {
  const s = document.createElement("style");
  s.id = "unlock-css";
  s.textContent = `
    @keyframes ul-fadeSlide { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes ul-pinShake  { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-12px)} 40%{transform:translateX(12px)} 60%{transform:translateX(-7px)} 80%{transform:translateX(7px)} }
    @keyframes ul-letterPop { 0%{transform:scale(0.4) translateY(10px);opacity:0} 65%{transform:scale(1.35)} 100%{transform:scale(1) translateY(0);opacity:1} }
    @keyframes ul-wrongWig  { 0%,100%{transform:translateX(0) scale(1)} 30%{transform:translateX(-5px) scale(0.9)} 70%{transform:translateX(5px) scale(0.9)} }
    @keyframes ul-crackIn   { from{opacity:0;stroke-dashoffset:90} to{opacity:1;stroke-dashoffset:0} }
    @keyframes ul-solvedPulse { 0%,100%{opacity:1;letter-spacing:-0.01em} 50%{opacity:0.75;letter-spacing:0.06em} }
    @keyframes ul-dotPop    { 0%{transform:scale(0.6)} 60%{transform:scale(1.3)} 100%{transform:scale(1)} }
    @keyframes ul-sealShake { 0%,100%{transform:scale(1.07) rotate(0deg)} 25%{transform:scale(1.09) rotate(-3deg)} 75%{transform:scale(1.09) rotate(3deg)} }
  `;
  document.head.appendChild(s);
}

// ── Grain ─────────────────────────────────────────────────────────────────────
function Grain({ o = 0.18 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let t;
    const draw = () => {
      cv.width = cv.height = 160;
      const img = ctx.createImageData(160, 160);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 80 + Math.random() * 175;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = Math.random() * 24;
      }
      ctx.putImageData(img, 0, 0);
      t = setTimeout(() => requestAnimationFrame(draw), 110);
    };
    draw();
    return () => clearTimeout(t);
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: o,
        imageRendering: "pixelated",
      }}
    />
  );
}

// ── Screen wrapper ────────────────────────────────────────────────────────────
function Screen({ children, scroll = false }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: THEME.bg,
        overflow: scroll ? "auto" : "hidden",
        animation: "ul-fadeSlide 0.55s cubic-bezier(.2,.8,.2,1) both",
      }}
    >
      <Grain />
      {children}
    </div>
  );
}

// ── PIN Screen ────────────────────────────────────────────────────────────────
function PinScreen({ onSuccess }) {
  const [digits, setDigits] = useState([]);
  const [shake, setShake] = useState(false);
  const [ok, setOk] = useState(false);

  const press = (d) => {
    if (ok || digits.length >= 4) return;
    const next = [...digits, d];
    setDigits(next);
    if (next.length === 4) {
      if (next.join("") === SECRET_PIN) {
        setOk(true);
        setTimeout(onSuccess, 820);
      } else {
        setTimeout(() => {
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setDigits([]);
          }, 480);
        }, 60);
      }
    }
  };

  const del = () => {
    if (!ok) setDigits((p) => p.slice(0, -1));
  };

  return (
    <Screen>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 38,
          padding: "0 24px",
        }}
      >
        {/* label */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: 6,
              color: THEME.accent,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Финален акт · 3 / 3
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 38,
              fontWeight: 300,
              fontStyle: "italic",
              color: THEME.fg,
              lineHeight: 1,
            }}
          >
            Секретен код
          </div>
        </div>

        {/* dot indicators */}
        <div
          style={{
            display: "flex",
            gap: 16,
            animation: shake ? "ul-pinShake 0.48s ease" : "none",
          }}
        >
          {[0, 1, 2, 3].map((i) => {
            const filled = i < digits.length;
            return (
              <div
                key={i}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  border: `1.5px solid ${filled ? (ok ? THEME.accent : THEME.fg) : THEME.hair}`,
                  background: filled
                    ? ok
                      ? THEME.accent
                      : THEME.fg
                    : "transparent",
                  boxShadow: ok && filled ? `0 0 14px ${THEME.accent}` : "none",
                  transition: "all 0.15s",
                  animation: filled ? "ul-dotPop 0.25s ease" : "none",
                }}
              />
            );
          })}
        </div>

        {/* numpad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
            width: 224,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "⌫"].map((k, i) => (
            <button
              key={i}
              onClick={() =>
                k === "⌫" ? del() : k != null ? press(String(k)) : null
              }
              style={{
                height: 58,
                borderRadius: 4,
                border: `1px solid ${THEME.hair}`,
                background: k == null ? "transparent" : THEME.alt,
                color: k === "⌫" ? THEME.muted : THEME.fg,
                fontFamily: "var(--mono)",
                fontSize: k === "⌫" ? 18 : 22,
                cursor: k == null ? "default" : "pointer",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                transition: "transform 0.08s, background 0.1s",
              }}
              onPointerDown={(e) => {
                if (k != null) e.currentTarget.style.transform = "scale(0.91)";
              }}
              onPointerUp={(e) => {
                e.currentTarget.style.transform = "";
              }}
            >
              {k ?? ""}
            </button>
          ))}
        </div>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 3,
            color: THEME.muted,
            textTransform: "uppercase",
          }}
        >
          Дата на концерта · ДДММ
        </div>
      </div>
    </Screen>
  );
}

// ── Wax Seal ──────────────────────────────────────────────────────────────────
function WaxSeal({ cracking }) {
  // 16-pointed star polygon (outer r=80, inner r=70)
  const pts = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 80 : 70;
    return `${(90 + r * Math.cos(a)).toFixed(2)},${(90 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

  const cracks = [
    [90, 6, 87, 90],
    [150, 36, 90, 90],
    [162, 98, 90, 90],
    [126, 168, 90, 90],
    [26, 150, 90, 90],
    [14, 76, 90, 90],
  ];

  return (
    <svg width="190" height="190" viewBox="0 0 180 180" fill="none">
      <defs>
        <radialGradient id="waxG" cx="36%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#cc2a2a" />
          <stop offset="48%" stopColor="#8b1a1a" />
          <stop offset="100%" stopColor="#430c0c" />
        </radialGradient>
      </defs>

      {/* body */}
      <polygon points={pts} fill="url(#waxG)" />

      {/* inner decoration rings */}
      <circle
        cx="90"
        cy="90"
        r="63"
        fill="none"
        stroke="#f0ece41a"
        strokeWidth="1.2"
      />
      <circle
        cx="90"
        cy="90"
        r="56"
        fill="none"
        stroke="#f0ece40e"
        strokeWidth="0.7"
      />

      {/* monogram */}
      <text
        x="90"
        y="111"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="70"
        fontStyle="italic"
        fontWeight="300"
        fill="#f0ece4"
        opacity="0.9"
      >
        К
      </text>

      {/* crack lines */}
      {cracking &&
        cracks.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f0ece4"
            strokeWidth={1.4 - i * 0.1}
            opacity={0.75 - i * 0.07}
            strokeLinecap="round"
            strokeDasharray="90"
            style={{ animation: `ul-crackIn 0.28s ${i * 0.07}s ease both` }}
          />
        ))}
    </svg>
  );
}

function SealScreen({ onBreak }) {
  const [phase, setPhase] = useState("idle"); // idle | cracking | broken

  const crack = () => {
    if (phase !== "idle") return;
    setPhase("cracking");
    setTimeout(() => setPhase("broken"), 900);
    setTimeout(onBreak, 1200);
  };

  return (
    <Screen>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 6,
            color: THEME.muted,
            textTransform: "uppercase",
          }}
        >
          Финална тайна
        </div>

        {/* seal */}
        <div
          onClick={crack}
          style={{
            cursor: phase === "idle" ? "pointer" : "default",
            opacity: phase === "broken" ? 0 : 1,
            transition: "opacity 0.4s",
            filter:
              phase === "cracking"
                ? `drop-shadow(0 0 30px ${THEME.accent})`
                : `drop-shadow(0 0 14px ${THEME.accent}55)`,
            animation:
              phase === "cracking"
                ? "ul-sealShake 0.18s ease infinite"
                : "none",
          }}
        >
          <WaxSeal cracking={phase === "cracking"} />
        </div>

        <div
          style={{
            fontFamily: "var(--serif-text)",
            fontStyle: "italic",
            fontSize: 13,
            color: THEME.muted,
            opacity: phase === "idle" ? 1 : 0,
            transition: "opacity 0.25s",
          }}
        >
          Натисни, за да разбиеш печата
        </div>
      </div>
    </Screen>
  );
}

// ── Riddle / Hangman Screen ───────────────────────────────────────────────────
function RiddleScreen({ onSolve }) {
  const [guessed, setGuessed] = useState(new Set());
  const [flash, setFlash] = useState(null);
  const [wiggle, setWiggle] = useState(null);
  const [solved, setSolved] = useState(false);

  const guess = (letter) => {
    if (guessed.has(letter) || solved) return;
    const next = new Set([...guessed, letter]);
    setGuessed(next);

    if (WORD.includes(letter)) {
      setFlash(letter);
      setTimeout(() => setFlash(null), 650);
      if (WORD.every((l, i) => SHOWN.has(i) || next.has(l))) {
        setTimeout(() => {
          setSolved(true);
          setTimeout(onSolve, 1600);
        }, 500);
      }
    } else {
      setWiggle(letter);
      setTimeout(() => setWiggle(null), 420);
    }
  };

  const wrongCount = [...guessed].filter((l) => !WORD.includes(l)).length;

  return (
    <Screen scroll>
      <div
        style={{
          padding: "44px 22px 52px",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          position: "relative",
        }}
      >
        {/* heading */}
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: 6,
              color: THEME.accent,
              textTransform: "uppercase",
              marginBottom: 11,
            }}
          >
            Финалната загадка
          </div>
          <div
            style={{
              fontFamily: "var(--serif-text)",
              fontStyle: "italic",
              fontSize: 13.5,
              lineHeight: 1.72,
              color: THEME.fg,
              opacity: 0.7,
            }}
          >
            {RIDDLE}
          </div>
        </div>

        <div style={{ height: 1, background: THEME.hair }} />

        {/* word display */}
        <div
          style={{
            display: "flex",
            gap: 7,
            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          {WORD.map((letter, i) => {
            const visible = SHOWN.has(i) || guessed.has(letter);
            const preset = SHOWN.has(i);
            const isFlash = flash === letter && !preset;
            return (
              <div key={i} style={{ textAlign: "center", width: 32 }}>
                <div
                  style={{
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--display)",
                    fontSize: 32,
                    fontWeight: 300,
                    color: preset ? `${THEME.fg}cc` : THEME.accent,
                    opacity: visible ? 1 : 0,
                    transform: isFlash ? "scale(1.45)" : "scale(1)",
                    transition: "opacity 0.2s, transform 0.18s",
                    textShadow: isFlash ? `0 0 22px ${THEME.accent}` : "none",
                    animation:
                      !preset && visible && !isFlash
                        ? "ul-letterPop 0.38s ease"
                        : "none",
                  }}
                >
                  {letter}
                </div>
                <div
                  style={{
                    height: 2,
                    borderRadius: 1,
                    background: visible
                      ? preset
                        ? THEME.muted
                        : THEME.accent
                      : `${THEME.hair}cc`,
                    transition: "background 0.28s",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* wrong-guess dots + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 8,
              letterSpacing: 3,
              color: THEME.muted,
              textTransform: "uppercase",
            }}
          >
            Грешки
          </span>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i < wrongCount ? THEME.accent : THEME.hair,
                transition: "background 0.22s",
              }}
            />
          ))}
        </div>

        {/* solved banner */}
        {solved && (
          <div
            style={{
              textAlign: "center",
              padding: "12px 0",
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 22,
              color: THEME.accent,
              animation: "ul-solvedPulse 1.3s ease infinite",
            }}
          >
            Браво!✦ финалът е отключен
          </div>
        )}

        <div style={{ height: 1, background: THEME.hair }} />

        {/* alphabet grid */}
        {!solved && (
          <>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 8,
                letterSpacing: 4,
                color: THEME.muted,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Избери буква
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
              }}
            >
              {ALPHA.map((letter) => {
                const used = guessed.has(letter);
                const isCorrect = used && WORD.includes(letter);
                const isWrong = used && !WORD.includes(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => guess(letter)}
                    disabled={used}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 3,
                      border: `1px solid ${isCorrect ? THEME.accent : THEME.hair}`,
                      background: isCorrect
                        ? `${THEME.accent}1c`
                        : "transparent",
                      color: isWrong ? `${THEME.muted}55` : THEME.fg,
                      fontFamily: "var(--mono)",
                      fontSize: 14,
                      cursor: used ? "default" : "pointer",
                      opacity: isWrong ? 0.25 : 1,
                      textDecoration: isWrong ? "line-through" : "none",
                      outline: "none",
                      WebkitTapHighlightColor: "transparent",
                      boxShadow: isCorrect
                        ? `0 0 8px ${THEME.accent}44`
                        : "none",
                      transition:
                        "opacity 0.18s, border-color 0.18s, box-shadow 0.18s",
                      animation:
                        wiggle === letter
                          ? "ul-wrongWig 0.38s ease"
                          : flash === letter && isCorrect
                            ? "ul-letterPop 0.38s ease"
                            : "none",
                    }}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
function UnlockFlow({ onUnlock }) {
  const [step, setStep] = useState("pin");
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {step === "pin" && <PinScreen onSuccess={() => setStep("seal")} />}
      {step === "seal" && <SealScreen onBreak={() => setStep("riddle")} />}
      {step === "riddle" && (
        <RiddleScreen
          onSolve={() => {
            setStep("done");
            onUnlock?.();
          }}
        />
      )}
    </div>
  );
}

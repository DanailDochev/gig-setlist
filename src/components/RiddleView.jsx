import { useState } from "react";

const WORD = "КАРАОКЕ".split("");
const SHOWN = new Set([0, WORD.length - 1]); // К and Е pre-revealed
const RIDDLE =
  "Забавление, при което ентусиасти пеят под акомпанимента на известни песни, само инструментала. Обикновено има сцена с микрофон и екран, на който се показва текста на песента заедно с музиката.";
const ALPHA = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ".split("");

export function RiddleView({ theme, onBack, onSolved }) {
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
          setTimeout(onSolved, 1600);
        }, 500);
      }
    } else {
      setWiggle(letter);
      setTimeout(() => setWiggle(null), 420);
    }
  };

  const wrongCount = [...guessed].filter((l) => !WORD.includes(l)).length;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.bg,
        color: theme.fg,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "44px 22px 52px",
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <button
          onClick={onBack}
          style={{
            alignSelf: "flex-start",
            background: "transparent",
            border: "none",
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 4,
            color: theme.muted,
            textTransform: "uppercase",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← назад
        </button>

        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: 6,
              color: theme.accent,
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
              color: theme.fg,
              opacity: 0.7,
            }}
          >
            {RIDDLE}
          </div>
        </div>

        <div style={{ height: 1, background: theme.hair }} />

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
                    color: preset ? `${theme.fg}cc` : theme.accent,
                    opacity: visible ? 1 : 0,
                    transform: isFlash ? "scale(1.45)" : "scale(1)",
                    transition: "opacity 0.2s, transform 0.18s",
                    textShadow: isFlash ? `0 0 22px ${theme.accent}` : "none",
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
                        ? theme.muted
                        : theme.accent
                      : `${theme.hair}cc`,
                    transition: "background 0.28s",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* wrong-guess dots */}
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
              color: theme.muted,
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
                background: i < wrongCount ? theme.accent : theme.hair,
                transition: "background 0.22s",
              }}
            />
          ))}
        </div>

        {solved && (
          <div
            style={{
              textAlign: "center",
              padding: "12px 0",
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 22,
              color: theme.accent,
            }}
          >
            БРАВО ✦ Финалът е открит
          </div>
        )}

        <div style={{ height: 1, background: theme.hair }} />

        {!solved && (
          <>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 8,
                letterSpacing: 4,
                color: theme.muted,
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
                      border: `1px solid ${isCorrect ? theme.accent : theme.hair}`,
                      background: isCorrect ? `${theme.accent}1c` : "transparent",
                      color: isWrong ? `${theme.muted}55` : theme.fg,
                      fontFamily: "var(--mono)",
                      fontSize: 14,
                      cursor: used ? "default" : "pointer",
                      opacity: isWrong ? 0.25 : 1,
                      textDecoration: isWrong ? "line-through" : "none",
                      outline: "none",
                      WebkitTapHighlightColor: "transparent",
                      boxShadow: isCorrect ? `0 0 8px ${theme.accent}44` : "none",
                      transition: "opacity 0.18s, border-color 0.18s",
                      transform: wiggle === letter ? "scale(0.88)" : "scale(1)",
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
    </div>
  );
}

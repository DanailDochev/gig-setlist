import { useState, useEffect, useCallback } from "react";

export function PasswordView({ theme, pin, onBack, onUnlock }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState("idle");
  const PIN_LEN = 4;

  const submit = useCallback(
    (p) => {
      if (p === String(pin) && String(pin).length > 0) {
        setStatus("ok");
        setTimeout(() => onUnlock(), 480);
      } else {
        setStatus("wrong");
        setShake(true);
        setTimeout(() => setShake(false), 420);
        setTimeout(() => {
          setStatus("idle");
          setValue("");
        }, 900);
      }
    },
    [pin, onUnlock],
  );

  const press = (d) => {
    if (status !== "idle") return;
    setValue((v) => {
      if (v.length >= PIN_LEN) return v;
      const next = v + d;
      if (next.length === PIN_LEN) setTimeout(() => submit(next), 120);
      return next;
    });
  };

  const backspace = () => {
    if (status !== "idle") return;
    setValue((v) => v.slice(0, -1));
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key >= "0" && e.key <= "9") press(e.key);
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

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
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← назад
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          animation: shake ? "shake 0.42s" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 18,
            marginBottom: 14,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 54 54" fill="none">
            <circle
              cx="17"
              cy="27"
              r="10"
              stroke={theme.accent}
              strokeWidth="1.3"
              fill="none"
            />
            <circle cx="17" cy="27" r="3" fill={theme.accent} />
            <path
              d="M27 27 L48 27 M44 27 L44 34 M38 27 L38 32"
              stroke={theme.accent}
              strokeWidth="1.3"
              strokeLinecap="square"
            />
          </svg>
        </div>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: 4,
            color: theme.accent,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 10,
          }}
        ></div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 30,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Въведи PIN
        </div>
        <div
          style={{
            fontFamily: "var(--serif-text)",
            fontSize: 12,
            color: theme.muted,
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 22,
            maxWidth: 240,
            alignSelf: "center",
            lineHeight: 1.5,
          }}
        ></div>

        {/* dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginBottom: 18,
          }}
        >
          {Array.from({ length: PIN_LEN }).map((_, i) => {
            const filled = i < value.length;
            const ok = status === "ok";
            const wrong = status === "wrong";
            return (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: `1px solid ${wrong ? "#c24a4a" : theme.accent}`,
                  background: filled
                    ? ok
                      ? theme.accent
                      : wrong
                        ? "#c24a4a"
                        : theme.fg
                    : "transparent",
                  transition: "background 0.15s ease, transform 0.15s ease",
                  transform: filled ? "scale(1.1)" : "scale(1)",
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 2,
            color:
              status === "wrong"
                ? "#c24a4a"
                : status === "ok"
                  ? theme.accent
                  : theme.muted,
            textAlign: "center",
            textTransform: "uppercase",
            minHeight: 14,
            marginBottom: 18,
          }}
        >
          {status === "wrong"
            ? "грешен PIN"
            : status === "ok"
              ? "добре дошъл"
              : "\u00a0"}
        </div>

        {/* keypad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            maxWidth: 280,
            margin: "0 auto 24px",
            width: "100%",
          }}
        >
          {keys.map((k, i) => {
            if (k === "") return <div key={i} />;
            const isBack = k === "⌫";
            return (
              <button
                key={i}
                onClick={() => (isBack ? backspace() : press(k))}
                disabled={status !== "idle"}
                style={{
                  height: 56,
                  background: "transparent",
                  border: `1px solid ${theme.hair}`,
                  color: isBack ? theme.muted : theme.fg,
                  fontFamily: isBack ? "var(--mono)" : "var(--display)",
                  fontSize: isBack ? 18 : 26,
                  fontWeight: 300,
                  cursor: status === "idle" ? "pointer" : "default",
                  transition: "background 0.15s, border-color 0.15s",
                  userSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = theme.alt;
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = theme.hair;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = theme.hair;
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background = theme.alt;
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = theme.hair;
                }}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

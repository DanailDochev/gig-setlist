import { CigaretteIcon, WineGlass } from "./Icons";

function KaraokeDivider({ theme }) {
  return (
    <div
      style={{
        padding: "22px 22px 20px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 16,
        borderTop: `1px solid ${theme.accent}`,
        marginTop: 4,
        background: `linear-gradient(180deg, ${theme.alt}, transparent)`,
      }}
    >
      <svg
        width="28"
        height="36"
        viewBox="0 0 28 36"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <rect
          x="1"
          y="1"
          width="26"
          height="34"
          rx="13"
          stroke={theme.accent}
          strokeWidth="1"
          fill="none"
        />
        <circle cx="14" cy="14" r="4" fill={theme.accent} />
        <path d="M14 18 L11 28 L17 28 Z" fill={theme.accent} />
      </svg>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 4,
            color: theme.accent,
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          отключено
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 22,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            color: theme.fg,
          }}
        >
          КАРАОКЕ
        </div>
      </div>
    </div>
  );
}

function SurpriseRow({ item, theme, onOpen, unlocked }) {
  return (
    <button
      onClick={onOpen}
      style={{
        width: "calc(100% - 32px)",
        margin: "22px 16px 10px",
        padding: "22px 20px",
        border: `1px dashed ${theme.accent}`,
        background: "transparent",
        color: theme.fg,
        fontFamily: "var(--sans)",
        textAlign: "left",
        cursor: "pointer",
        position: "relative",
        display: "block",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: 4,
          color: theme.accent,
          textTransform: "uppercase",
        }}
      >
        {unlocked ? "финал" : "финал"}
      </div>
      <div
        style={{
          fontFamily: "var(--display)",
          fontSize: 32,
          fontWeight: 300,
          fontStyle: "italic",
          marginTop: 8,
          letterSpacing: "-0.02em",
          color: theme.fg,
          lineHeight: 1,
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          fontFamily: "var(--serif-text)",
          fontSize: 13,
          color: theme.muted,
          marginTop: 8,
          fontStyle: "italic",
        }}
      >
        {unlocked ? "тайните песни са долу ↓" : "натисни за да отключиш"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          fontFamily: "var(--mono)",
          fontSize: 12,
          color: theme.accent,
        }}
      >
        {unlocked ? "✦" : "→"}
      </div>
    </button>
  );
}

function ProgramRow({
  item,
  index,
  theme,
  isNow,
  past,
  onOpen,
  unlocked,
  onSetNow,
}) {
  if (item.type === "karaoke-divider") return <KaraokeDivider theme={theme} />;

  if (item.type === "break") {
    return (
      <div
        style={{
          padding: "26px 22px 26px",
          borderTop: `1px solid ${theme.hair}`,
          borderBottom: `1px solid ${theme.hair}`,
          background: theme.alt,
          opacity: past ? 0.45 : 1,
          display: "flex",
          alignItems: "center",
          gap: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1, paddingRight: 12 }}>
          {item.icon === "cigarette" ? (
            <CigaretteIcon color={theme.accent} size={52} />
          ) : (
            <WineGlass color={theme.accent} size={42} fill={0.55} />
          )}
        </div>
        <div
          style={{ flex: 1, position: "relative", zIndex: 1, paddingLeft: 12 }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: 4,
              color: theme.muted,
              textTransform: "uppercase",
            }}
          >
            10 минути
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 28,
              fontWeight: 300,
              fontStyle: "italic",
              marginTop: 2,
              letterSpacing: "-0.01em",
              color: theme.accent,
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontFamily: "var(--serif-text)",
              fontSize: 13,
              color: theme.muted,
              fontStyle: "italic",
              marginTop: 4,
            }}
          >
            {item.note}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "surprise") {
    return (
      <SurpriseRow
        item={item}
        theme={theme}
        onOpen={onOpen}
        unlocked={unlocked}
      />
    );
  }

  // song row
  const num = String(item.id).padStart(2, "0");
  return (
    <button
      onClick={onOpen}
      style={{
        width: "100%",
        background: isNow ? `${theme.accent}10` : "transparent",
        border: "none",
        padding: isNow ? "18px 22px" : "16px 22px",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderBottom: `1px solid ${theme.hair}`,
        borderTop: isNow ? `1px solid ${theme.accent}30` : "none",
        color: theme.fg,
        fontFamily: "var(--sans)",
        opacity: past ? 0.38 : 1,
        position: "relative",
        transition: "background 0.4s",
      }}
    >
      {isNow && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: theme.accent,
          }}
        />
      )}
      {/* tap track number to toggle now-playing */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onSetNow(item.id);
        }}
        title="Докосни за да маркираш като 'сега свири'"
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: isNow ? theme.accent : theme.muted,
          minWidth: 22,
          letterSpacing: 1,
          cursor: "pointer",
          padding: "4px 0",
        }}
      >
        {num}
      </span>
      <span style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: isNow ? theme.accent : theme.fg,
            fontStyle: isNow ? "italic" : "normal",
            display: "block",
            lineHeight: 1.15,
          }}
        >
          {item.title}
        </span>
        <span
          style={{
            display: "flex",
            gap: 8,
            marginTop: 4,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {isNow && (
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 8,
                color: theme.accent,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.accent,
                  animation: "liveDot 1.2s ease-in-out infinite alternate",
                  display: "inline-block",
                }}
              />
              СЕГА
            </span>
          )}
          {item.secret && (
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 8,
                color: isNow ? theme.accent : theme.muted,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "2px 6px",
                border: `1px solid ${isNow ? theme.accent : theme.hair}`,
              }}
            >
              ♪ пей с нас
            </span>
          )}
        </span>
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: isNow ? theme.accent : theme.muted,
          minWidth: 32,
          textAlign: "right",
        }}
      >
        {item.duration}
      </span>
    </button>
  );
}

export function ProgramView({
  theme,
  program,
  nowId,
  onOpen,
  unlocked,
  onSetNow,
}) {
  const nowIndex =
    nowId != null ? program.findIndex((item) => item.id === nowId) : -1;
  const nowItem = nowIndex >= 0 ? program[nowIndex] : null;

  const songCount = program.filter(
    (i) => i.type === "song" && !i.secret,
  ).length;
  const breakCount = program.filter((i) => i.type === "break").length;
  const hasSecret = program.some((i) => i.type === "surprise");

  return (
    <div
      data-program-scroll
      style={{
        position: "absolute",
        inset: 0,
        background: theme.bg,
        color: theme.fg,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* NOW PLAYING sticky banner */}
      {nowItem && nowItem.type === "song" && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: theme.accent,
            padding: "10px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "flex",
                gap: 3,
                alignItems: "flex-end",
                height: 14,
              }}
            >
              {[0, 1, 2, 3].map((b) => (
                <span
                  key={b}
                  style={{
                    width: 2.5,
                    background: theme.bg,
                    display: "inline-block",
                    animation: `barPulse 0.${5 + b}s ease-in-out ${b * 0.1}s infinite alternate`,
                  }}
                />
              ))}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: 3,
                color: theme.bg,
                textTransform: "uppercase",
              }}
            >
              сега свири
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 15,
              fontWeight: 400,
              fontStyle: "italic",
              color: theme.bg,
              letterSpacing: "-0.01em",
            }}
          >
            {nowItem.title}
          </span>
        </div>
      )}

      {/* header */}
      <div
        style={{
          padding: "36px 22px 22px",
          borderBottom: `1px solid ${theme.hair}`,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 4,
            color: theme.accent,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Програма
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 44,
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          <i>Мементо 21.04.26,</i>
          <br />
          акустично.
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            color: theme.muted,
            letterSpacing: 2,
            marginTop: 14,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span>
            {songCount} {songCount === 1 ? "песен" : "песни"}
          </span>
          {breakCount > 0 && (
            <>
              <span>·</span>
              <span>
                {breakCount} {breakCount === 1 ? "пауза" : "паузи"}
              </span>
            </>
          )}
          {hasSecret && (
            <>
              <span>·</span>
              <span>1 изненада</span>
            </>
          )}
          {unlocked && (
            <>
              <span>·</span>
              <span style={{ color: theme.accent }}>+5 тайни</span>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: "4px 0 80px" }}>
        {program.map((item, i) => (
          <ProgramRow
            key={item.id != null ? item.id : `${item.type}-${i}`}
            item={item}
            index={i}
            theme={theme}
            isNow={item.id != null && item.id === nowId}
            past={nowIndex >= 0 && i < nowIndex}
            onOpen={() => onOpen(item)}
            unlocked={unlocked}
            onSetNow={onSetNow}
          />
        ))}
      </div>
    </div>
  );
}

// Wireframes — low-fi explorations of structure. Sketchy, b&w.
const wireframeStyles = {
  frame: {
    background: "#fafaf7",
    border: "1.5px solid #1a1a1a",
    borderRadius: 22,
    width: 300,
    height: 620,
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
    fontFamily: "'Caveat', 'Comic Sans MS', cursive",
    color: "#1a1a1a",
    boxShadow: "4px 4px 0 rgba(0,0,0,0.15)",
  },
  label: {
    textAlign: "center",
    fontFamily: "'Caveat', cursive",
    fontSize: 22,
    color: "#1a1a1a",
    marginTop: 14,
    letterSpacing: 0.5,
  },
  sub: {
    textAlign: "center",
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
};

function Scribble({ w = "100%", h = 10, density = 3, color = "#1a1a1a" }) {
  const d = Array.from({ length: density })
    .map((_, i) => {
      const y = (i + 1) * (100 / (density + 1));
      return `M 5 ${y} Q 20 ${y - 3} 35 ${y} T 65 ${y} T 95 ${y}`;
    })
    .join(" ");
  return (
    <svg
      width={w}
      height={h * density}
      viewBox={`0 0 100 ${h * density}`}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <path d={d} stroke={color} strokeWidth="0.6" fill="none" opacity="0.55" />
    </svg>
  );
}

function WBox({ children, style, dashed, filled }) {
  return (
    <div
      style={{
        border: `1.3px ${dashed ? "dashed" : "solid"} #1a1a1a`,
        borderRadius: 6,
        padding: 8,
        background: filled ? "#ebe6d8" : "transparent",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Wire 1 — classic list with open accordion
function WireListAccordion() {
  return (
    <div style={wireframeStyles.frame}>
      <div
        style={{
          padding: 14,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 28,
            textAlign: "center",
            fontFamily: "'Caveat', cursive",
          }}
        >
          SETLIST
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            textAlign: "center",
            letterSpacing: 2,
            color: "#666",
          }}
        >
          — live @ sofia —
        </div>
        <WBox style={{ padding: 6, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>01 · Двупосочен</span>
            <span>▼</span>
          </div>
          <div
            style={{
              marginTop: 6,
              paddingTop: 6,
              borderTop: "1px dashed #999",
            }}
          >
            <Scribble density={5} h={5} />
          </div>
        </WBox>
        {[
          "02 · Още малко",
          "03 · Парфюм",
          "04 · Бриз",
          "05 · Все едно",
          "06 · Тайна",
          "07 · Край",
        ].map((t) => (
          <WBox
            key={t}
            style={{
              padding: 6,
              fontSize: 13,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{t}</span>
            <span style={{ color: "#999" }}>▶</span>
          </WBox>
        ))}
      </div>
    </div>
  );
}

// Wire 2 — full-screen lyric with bottom drawer navigation
function WireFullScreenLyric() {
  return (
    <div style={wireframeStyles.frame}>
      <div
        style={{
          padding: 16,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            fontFamily: "monospace",
            color: "#666",
          }}
        >
          <span>03 / 11</span>
          <span>NOW</span>
        </div>
        <div
          style={{
            fontSize: 26,
            fontFamily: "'Caveat', cursive",
            marginTop: 6,
          }}
        >
          Парфюм
        </div>
        <Scribble density={2} h={4} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Scribble density={10} h={8} />
        </div>
        <WBox style={{ padding: 8, fontSize: 11, fontFamily: "monospace" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>◀ БРИЗ</span>
            <span>═══</span>
            <span>ВСЕ ЕДНО ▶</span>
          </div>
        </WBox>
      </div>
    </div>
  );
}

// Wire 3 — index card / setlist paper feel
function WireIndexCard() {
  return (
    <div style={wireframeStyles.frame}>
      <div
        style={{
          padding: 18,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontFamily: "'Caveat', cursive",
            transform: "rotate(-1.5deg)",
          }}
        >
          Setlist.
        </div>
        <div
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "#666",
            borderBottom: "1px solid #1a1a1a",
            paddingBottom: 4,
          }}
        >
          дани дочев · акустично · 18.04.26
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
          <div
            key={n}
            style={{
              display: "flex",
              gap: 8,
              fontSize: 15,
              fontFamily: "'Caveat', cursive",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "#888",
                minWidth: 18,
              }}
            >
              0{n < 10 ? n : ""}
              {n >= 10 ? n : ""}
            </span>
            <span
              style={{
                borderBottom: n === 3 ? "2px solid #c9734a" : "1px dotted #aaa",
                flex: 1,
                paddingBottom: 1,
              }}
            >
              {
                [
                  "Същата болка (unreleased)",
                  "Още малко само",
                  "Парфюм",
                  "Бриз",
                  "Все едно",
                  "Тайна",
                  "Край",
                  "Подпис",
                  "Дим",
                  "Някъде там",
                  "Вино",
                ][n - 1]
              }
            </span>
            <span
              style={{ fontFamily: "monospace", fontSize: 9, color: "#aaa" }}
            >
              {
                [
                  "3:42",
                  "4:10",
                  "3:28",
                  "3:50",
                  "3:15",
                  "3:33",
                  "4:02",
                  "4:20",
                  "3:48",
                  "4:15",
                  "3:55",
                ][n - 1]
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wire 4 — vertical timeline / rail
function WireTimeline() {
  return (
    <div style={wireframeStyles.frame}>
      <div
        style={{
          padding: 16,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 22, fontFamily: "'Caveat', cursive" }}>
          the show.
        </div>
        <div
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: "#666",
            letterSpacing: 2,
          }}
        >
          SCROLL TO FOLLOW
        </div>
        <div style={{ flex: 1, display: "flex", gap: 12, marginTop: 12 }}>
          <div
            style={{ width: 2, background: "#1a1a1a", position: "relative" }}
          >
            {[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: -4,
                  top: `${p * 100}%`,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: i === 2 ? "#c9734a" : "#fafaf7",
                  border: "1.5px solid #1a1a1a",
                }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            {[
              "Двупосочен",
              "Още малко",
              "Парфюм ← now",
              "Бриз",
              "Все едно",
              "Тайна",
              "Край",
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  fontFamily: i === 2 ? "'Caveat', cursive" : "monospace",
                  fontSize: i === 2 ? 18 : 12,
                  opacity: i === 2 ? 1 : 0.6,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wire 5 — grid of cards / mosaic
function WireMosaic() {
  return (
    <div style={wireframeStyles.frame}>
      <div
        style={{
          padding: 14,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 22, fontFamily: "'Caveat', cursive" }}>
          11 songs.
        </div>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#666" }}>
          TAP A CARD
        </div>
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 10,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <WBox
              key={i}
              filled={i === 2}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontSize: 10,
                fontFamily: "monospace",
              }}
            >
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 15 }}>
                {
                  [
                    "Двупосочен",
                    "Още малко",
                    "Парфюм",
                    "Бриз",
                    "Все едно",
                    "Тайна",
                    "Край",
                    "Подпис",
                  ][i]
                }
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#666",
                }}
              >
                <span>0{i + 1}</span>
                <span>
                  {
                    [
                      "3:42",
                      "4:10",
                      "3:28",
                      "3:50",
                      "3:15",
                      "3:33",
                      "4:02",
                      "4:20",
                    ][i]
                  }
                </span>
              </div>
            </WBox>
          ))}
        </div>
      </div>
    </div>
  );
}

window.WireframeGrid = function WireframeGrid() {
  const items = [
    {
      c: <WireListAccordion />,
      label: "A · List + accordion",
      sub: "familiar, tap-to-expand",
    },
    {
      c: <WireFullScreenLyric />,
      label: "B · Full-screen lyric",
      sub: "one song per screen, swipe between",
    },
    {
      c: <WireIndexCard />,
      label: "C · Paper setlist",
      sub: "looks like the artist's own setlist",
    },
    {
      c: <WireTimeline />,
      label: "D · Timeline rail",
      sub: "show progress through the gig",
    },
    {
      c: <WireMosaic />,
      label: "E · Mosaic grid",
      sub: "explore non-linearly",
    },
  ];
  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#f0ebdf",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 42,
            textAlign: "center",
            transform: "rotate(-1deg)",
          }}
        >
          wireframes.
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: 3,
            color: "#666",
            marginBottom: 30,
          }}
        >
          FIVE STRUCTURAL DIRECTIONS · PICK ONE TO TAKE FURTHER
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
          }}
        >
          {items.map((it, i) => (
            <div key={i}>
              {it.c}
              <div style={wireframeStyles.label}>{it.label}</div>
              <div style={wireframeStyles.sub}>{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

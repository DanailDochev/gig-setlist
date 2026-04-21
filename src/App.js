import { useState, useMemo } from "react";
import "./App.css";
import {
  PROGRAM,
  KARAOKE_SONGS,
  SECRET_PIN,
  LYRICS,
  KARAOKE_LYRICS,
} from "./data/songs";
import { Cover } from "./components/Cover";
import { ProgramView } from "./components/ProgramView";
import { LyricView } from "./components/LyricView";
import { PasswordView } from "./components/PasswordView";
import { SealView } from "./components/SealView";
import { RiddleView } from "./components/RiddleView";

const PUBLIC_URL = process.env.PUBLIC_URL || "";

const photos = {
  cover: `${PUBLIC_URL}/assets/photo-04.jpg`,
  song: `${PUBLIC_URL}/assets/photo-03.jpg`,
};

const THEMES = {
  editorial: {
    dark: {
      bg: "#0d0c0a",
      fg: "#eae3d2",
      muted: "#7a7365",
      hair: "rgba(234,227,210,0.12)",
      alt: "rgba(255,255,255,0.015)",
      accent: "#b89968",
    },
    light: {
      bg: "#f1ece1",
      fg: "#1a1712",
      muted: "#6b6456",
      hair: "rgba(26,23,18,0.14)",
      alt: "rgba(0,0,0,0.02)",
      accent: "#7a5a30",
    },
  },
  ink: {
    dark: {
      bg: "#0a0808",
      fg: "#ece8e2",
      muted: "#7d7871",
      hair: "rgba(236,232,226,0.1)",
      alt: "rgba(255,255,255,0.02)",
      accent: "#9c3b3b",
    },
    light: {
      bg: "#f5f1ea",
      fg: "#141110",
      muted: "#6a645b",
      hair: "rgba(20,17,16,0.13)",
      alt: "rgba(0,0,0,0.02)",
      accent: "#7a2424",
    },
  },
  mono: {
    dark: {
      bg: "#0a0a0a",
      fg: "#fafaf6",
      muted: "#777",
      hair: "rgba(255,255,255,0.1)",
      alt: "rgba(255,255,255,0.02)",
      accent: "#fafaf6",
    },
    light: {
      bg: "#f6f4ee",
      fg: "#0a0a0a",
      muted: "#777",
      hair: "rgba(0,0,0,0.1)",
      alt: "rgba(0,0,0,0.02)",
      accent: "#0a0a0a",
    },
  },
};

export default function App() {
  const [screen, setScreen] = useState("cover");
  const [activeSongId, setActiveSongId] = useState(null);
  const [nowId, setNowId] = useState(null);
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem("setlist-secret-unlocked") === "1";
    } catch (e) {
      return false;
    }
  });

  // aesthetic / themeMode can be wired to UI controls later
  const [aesthetic] = useState("ink");
  const [themeMode] = useState("dark");
  const fontSize = 16;

  const theme = useMemo(
    () => THEMES[aesthetic]?.[themeMode] ?? THEMES.editorial.dark,
    [aesthetic, themeMode],
  );

  const program = useMemo(() => {
    const visible = PROGRAM.filter(
      (item) => item.type !== "song" || !item.hidden,
    );
    if (unlocked && KARAOKE_SONGS.length > 0) {
      return [...visible, { type: "karaoke-divider" }, ...KARAOKE_SONGS];
    }
    return visible;
  }, [unlocked]);

  const songItems = useMemo(
    () => program.filter((item) => item.type === "song"),
    [program],
  );
  const activeSong =
    activeSongId != null ? songItems.find((s) => s.id === activeSongId) : null;
  const activeSongPos = activeSong ? songItems.indexOf(activeSong) : -1;
  const hasPrev = activeSongPos > 0;
  const hasNext = activeSongPos >= 0 && activeSongPos < songItems.length - 1;

  function getLyrics(song) {
    if (!song) return "";
    if (song.secret) return KARAOKE_LYRICS[song.id] || "";
    return LYRICS[song.id] || "";
  }

  function openItem(item) {
    if (item.type === "song") {
      setActiveSongId(item.id);
      setScreen("song");
    } else if (item.type === "surprise") {
      if (unlocked) {
        setTimeout(() => {
          const el = document.querySelector("[data-program-scroll]");
          if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        }, 30);
      } else {
        setScreen("password");
      }
    }
  }

  function toggleNow(id) {
    setNowId((prev) => (prev === id ? null : id));
  }

  function handleRiddleSolved() {
    try {
      localStorage.setItem("setlist-secret-unlocked", "1");
    } catch (e) {}
    setUnlocked(true);
    setScreen("program");
    setTimeout(() => {
      try {
        const el = document.querySelector("[data-program-scroll]");
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      } catch (e) {}
    }, 80);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        fontFamily: "var(--sans)",
        background: theme.bg,
        color: theme.fg,
        overflow: "hidden",
      }}
    >
      {screen === "cover" && (
        <Cover
          theme={theme}
          coverPhoto={photos.cover}
          onEnter={() => setScreen("program")}
        />
      )}
      {screen === "program" && (
        <ProgramView
          theme={theme}
          program={program}
          nowId={nowId}
          onOpen={openItem}
          unlocked={unlocked}
          onSetNow={toggleNow}
        />
      )}
      {screen === "password" && (
        <PasswordView
          theme={theme}
          pin={SECRET_PIN}
          onBack={() => setScreen("program")}
          onUnlock={() => setScreen("seal")}
        />
      )}
      {screen === "seal" && (
        <SealView
          theme={theme}
          onBack={() => setScreen("program")}
          onBroken={() => setScreen("riddle")}
        />
      )}
      {screen === "riddle" && (
        <RiddleView
          theme={theme}
          onBack={() => setScreen("program")}
          onSolved={handleRiddleSolved}
        />
      )}
      {screen === "song" && activeSong && (
        <LyricView
          song={activeSong}
          lyrics={getLyrics(activeSong)}
          theme={theme}
          songPhoto={photos.song}
          fontSize={fontSize}
          onBack={() => setScreen("program")}
          onPrev={() => {
            if (hasPrev) setActiveSongId(songItems[activeSongPos - 1].id);
          }}
          onNext={() => {
            if (hasNext) setActiveSongId(songItems[activeSongPos + 1].id);
          }}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </div>
  );
}

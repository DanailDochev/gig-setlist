// Филмична/редакторска естетика · bg-only
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ── SWAP COVER IMAGE HERE ─────────────────────────────────────────────────────
// Change this path to try a different photo. The glow overlay reacts to it.
const COVER_PHOTO = 'assets/photo-04.jpg';
// ─────────────────────────────────────────────────────────────────────────────

// ---- grain ----
function useGrain() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let t;
    const draw = () => {
      const w = cv.width = 160, h = cv.height = 160;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 80 + Math.random() * 175;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v;
        img.data[i+3] = Math.random() * 24;
      }
      ctx.putImageData(img, 0, 0);
      t = setTimeout(() => requestAnimationFrame(draw), 110);
    };
    draw();
    return () => clearTimeout(t);
  }, []);
  return ref;
}
function Grain({ o = 0.22 }) {
  const r = useGrain();
  return <canvas ref={r} style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', mixBlendMode: 'overlay', opacity: o,
    imageRendering: 'pixelated'
  }}/>;
}

// ---- heavily abstracted photo — dark, grainy, cropped, never literal ----
function PhotoBg({ src, shade = 0.6, pos = 'center', scale = 1.3, blur = 0 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: pos,
        transform: `scale(${scale})`,
        filter: `grayscale(1) contrast(1.35) brightness(0.55) blur(${blur}px)`,
        animation: 'photoDrift 22s ease-in-out infinite alternate'
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, rgba(10,9,8,${shade*0.4}), rgba(10,9,8,${shade}))`
      }}/>
    </div>
  );
}

// ---------- Cover ----------
function Cover({ theme, onEnter, photo }) {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 40); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, background: theme.bg, color: theme.fg, overflow: 'hidden' }}>
      <PhotoBg src={COVER_PHOTO} shade={0.68} pos="50% 28%" scale={m ? 1.22 : 1.35} blur={0}/>
      <Grain o={0.28}/>

      {/* animated glow orbs — depend on accent colour, move independently */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', width: 340, height: 340, borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)`,
          top: '-60px', left: '-80px',
          animation: 'glowDrift1 12s ease-in-out infinite alternate'
        }}/>
        <div style={{
          position: 'absolute', width: 280, height: 280, borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent}20 0%, transparent 70%)`,
          bottom: '80px', right: '-60px',
          animation: 'glowDrift2 17s ease-in-out infinite alternate'
        }}/>
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)`,
          top: '35%', left: '30%',
          animation: 'glowDrift3 9s ease-in-out infinite alternate'
        }}/>
      </div>

      {/* scan-line texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)'
      }}/>

      {/* top meta */}
      <div style={{
        position: 'absolute', top: 20, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3, color: theme.muted,
        textTransform: 'uppercase'
      }}>
        <span>Акустично — 01</span>
        <span>MMXXVI</span>
      </div>

      {/* typographic block — upper area */}
      <div style={{
        position: 'absolute', left: 22, right: 22, top: '18%',
        transition: 'all 1.1s 0.2s cubic-bezier(.2,.7,.2,1)',
        opacity: m ? 1 : 0, transform: m ? 'translateY(0)' : 'translateY(18px)'
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: 3,
          color: theme.accent, textTransform: 'uppercase', marginBottom: 16,
          fontWeight: 700
        }}>
          Дани Дочев — на живо
        </div>
        <div style={{
          fontFamily: 'var(--display)',
          fontSize: 82, fontWeight: 300, lineHeight: 0.9,
          letterSpacing: '-0.035em'
        }}>
          Една<br/><i style={{ color: theme.accent, fontWeight: 300 }}>нощ</i>
        </div>
        <div style={{
          marginTop: 18, width: 52, height: 1, background: theme.fg, opacity: 0.4,
          transition: 'transform 1.2s 0.9s ease-out',
          transform: m ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left'
        }}/>
        <div style={{
          fontFamily: 'var(--serif-text)', fontSize: 15, lineHeight: 1.55,
          color: theme.fg, marginTop: 18, opacity: 0.72, maxWidth: 290,
          fontStyle: 'italic'
        }}>
          Следвай програмата.<br/>Пей с нас. Краят е изненада.
        </div>
      </div>

      {/* CTA — pinned to bottom, beneath image fade */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: `linear-gradient(transparent, ${theme.bg} 55%)`,
        padding: '60px 22px 44px'
      }}>
        <button onClick={onEnter} style={{
          width: '100%',
          padding: '18px 20px',
          background: theme.fg, color: theme.bg,
          border: 'none', cursor: 'pointer',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 3,
          textTransform: 'uppercase', fontWeight: 500,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span>Влез в програмата</span><span>⟶</span>
        </button>
      </div>
    </div>
  );
}

// ---------- Program List (songs + breaks + surprise) ----------
function ProgramView({ theme, photo, nowIndex, onOpen, program, onToggleNow, onSecretTap, unlocked, onLock }) {
  return (
    <div data-program-scroll style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.fg,
      overflowY: 'auto', overflowX: 'hidden'
    }}>
      {/* NOW PLAYING sticky banner */}
      {nowIndex >= 0 && program[nowIndex] && program[nowIndex].type === 'song' && (
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: theme.accent,
          padding: '10px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 14 }}>
              {[0,1,2,3].map(b => (
                <span key={b} style={{
                  width: 2.5, background: theme.bg, display: 'inline-block',
                  animation: `barPulse 0.${5+b}s ease-in-out ${b*0.1}s infinite alternate`
                }}/>
              ))}
            </span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
              color: theme.bg, textTransform: 'uppercase'
            }}>сега свири</span>
          </div>
          <span style={{
            fontFamily: 'var(--display)', fontSize: 15, fontWeight: 400,
            fontStyle: 'italic', color: theme.bg, letterSpacing: '-0.01em'
          }}>
            {program[nowIndex].title}
          </span>
        </div>
      )}

      {/* title block — no photo here, strictly typographic */}
      <div style={{
        padding: '36px 22px 22px',
        borderBottom: `1px solid ${theme.hair}`,
        position: 'relative'
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 4,
          color: theme.accent, textTransform: 'uppercase', marginBottom: 10
        }}>
          Програма
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 44, fontWeight: 300,
          lineHeight: 1, letterSpacing: '-0.02em'
        }}>
          <i>Една нощ,</i><br/>тринайсет спирки.
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, color: theme.muted,
          letterSpacing: 2, marginTop: 14, display: 'flex', gap: 16, flexWrap: 'wrap'
        }}>
          <span>11 песни</span>
          <span>·</span>
          <span>1 пауза</span>
          <span>·</span>
          <span>1 изненада</span>
          {unlocked && <>
            <span>·</span>
            <span style={{ color: theme.accent }}>+5 тайни</span>
          </>}
        </div>
      </div>

      <div style={{ padding: '4px 0 80px' }}>
        {program.map((item, i) => (
          <ProgramRow
            key={i}
            item={item} index={i}
            theme={theme}
            isNow={i === nowIndex}
            past={i < nowIndex}
            onOpen={() => onOpen(i)}
            onLock={onLock}
            unlocked={unlocked}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Surprise Row — entry point to the hidden karaoke set ----------
// Just a clickable row that leads to the PIN gate. Mysterious but simple.
function SurpriseRow({ item, theme, onOpen, unlocked }) {
  return (
    <button onClick={onOpen} style={{
      width: 'calc(100% - 32px)', margin: '22px 16px 10px',
      padding: '22px 20px',
      border: `1px dashed ${theme.accent}`,
      background: 'transparent',
      color: theme.fg, fontFamily: 'var(--sans)',
      textAlign: 'left', cursor: 'pointer',
      position: 'relative', display: 'block'
    }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 4,
        color: theme.accent, textTransform: 'uppercase'
      }}>
        {unlocked ? 'финал · отворен' : 'заключен финал'}
      </div>
      <div style={{
        fontFamily: 'var(--display)', fontSize: 32, fontWeight: 300,
        fontStyle: 'italic', marginTop: 8, letterSpacing: '-0.02em',
        color: theme.fg, lineHeight: 1
      }}>
        {item.title}
      </div>
      <div style={{
        fontFamily: 'var(--serif-text)', fontSize: 13,
        color: theme.muted, marginTop: 8, fontStyle: 'italic'
      }}>
        {unlocked ? 'тайните песни са долу ↓' : 'докосни за да влезеш'}
      </div>
      <div style={{
        position: 'absolute', top: 14, right: 16,
        fontFamily: 'var(--mono)', fontSize: 12, color: theme.accent
      }}>
        {unlocked ? '✦' : '→'}
      </div>
    </button>
  );
}

// ---------- Seal View — press-and-hold the wax seal to break it ----------
function SealView({ theme, onBack, onBroken }) {
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

  const stars = useMemo(() => Array.from({ length: 22 }).map(() => ({
    x: 50 + (Math.random() - 0.5) * 80,
    y: 50 + (Math.random() - 0.5) * 80,
    d: Math.random() * 0.35, s: 0.5 + Math.random() * 0.7,
    r: Math.random() * 360
  })), []);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.fg,
      display: 'flex', flexDirection: 'column', padding: '0 22px',
      overflow: 'hidden', userSelect: 'none'
    }}>
      <div style={{
        paddingTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
        textTransform: 'uppercase', color: theme.muted
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', color: theme.muted,
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
          textTransform: 'uppercase', cursor: 'pointer', padding: 0
        }}>← назад</button>
        <span>печат</span>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative'
      }}>
        {shatter && stars.map((st, i) => (
          <span key={i} style={{
            position: 'absolute', left: `${st.x}%`, top: `${st.y}%`,
            color: theme.accent, fontSize: 14 * st.s,
            transform: `rotate(${st.r}deg)`,
            animation: `starPop 900ms ${st.d}s ease-out both`,
            pointerEvents: 'none'
          }}>✦</span>
        ))}

        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 4,
          color: theme.accent, textTransform: 'uppercase', marginBottom: 14
        }}>
          последна стъпка
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 30, fontWeight: 300,
          fontStyle: 'italic', letterSpacing: '-0.02em',
          textAlign: 'center', lineHeight: 1.1, marginBottom: 36
        }}>
          Счупи печата
        </div>

        <div
          onMouseDown={start} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchEnd={end}
          style={{
            position: 'relative', width: 160, height: 160,
            cursor: shatter ? 'default' : 'pointer', touchAction: 'none',
            transform: shatter ? 'scale(1.18)' : `scale(${1 + progress * 0.06})`,
            transition: shatter ? 'transform 0.35s ease-out' : 'transform 0.12s'
          }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="80" cy="80" r="72" stroke={theme.hair} strokeWidth="1.5" fill="none"/>
            <circle cx="80" cy="80" r="72" stroke={theme.accent} strokeWidth="1.5" fill="none"
              strokeDasharray={`${progress * 452.39} 452.39`}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              style={{ transition: progress === 0 ? 'stroke-dasharray 0.3s' : 'none' }}/>
          </svg>
          <div style={{
            position: 'absolute', inset: 22, borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${theme.accent}, ${theme.accent}99 60%, ${theme.accent}55)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--display)', fontSize: 52, color: theme.bg,
            fontStyle: 'italic', fontWeight: 400,
            boxShadow: `inset 0 0 18px rgba(0,0,0,0.3)`,
            opacity: shatter ? 0 : 1,
            transition: 'opacity 0.35s'
          }}>
            Д
          </div>
          {shatter && (
            <svg viewBox="0 0 160 160" style={{ position: 'absolute', inset: 0, animation: 'shardFade 600ms ease-out' }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                <line key={a} x1="80" y1="80"
                  x2={80 + Math.cos(a * Math.PI/180) * 66}
                  y2={80 + Math.sin(a * Math.PI/180) * 66}
                  stroke={theme.accent} strokeWidth="2"/>
              ))}
            </svg>
          )}
        </div>

        <div style={{
          fontFamily: 'var(--serif-text)', fontSize: 14, color: theme.muted,
          fontStyle: 'italic', textAlign: 'center', marginTop: 36,
          minHeight: 20
        }}>
          {shatter ? 'отворено ✦' :
           progress === 0 ? 'задръж печата' :
           progress < 1 ? '...още малко' : 'счупено'}
        </div>
      </div>
    </div>
  );
}

// Wine-glass SVG — line drawing with subtle wine level

function CigaretteIcon({ color = '#b89968', size = 52 }) {
  return (
    <svg width={size * 2.2} height={size * 0.7} viewBox="0 0 110 36" fill="none">
      {/* filter tip */}
      <rect x="0" y="13" width="18" height="10" rx="1" stroke={color} strokeWidth="1" fill={`${color}22`}/>
      {/* body */}
      <rect x="18" y="13" width="58" height="10" rx="0.5" stroke={color} strokeWidth="1" fill="none"/>
      {/* paper lines */}
      <line x1="34" y1="13" x2="34" y2="23" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <line x1="50" y1="13" x2="50" y2="23" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      {/* burning tip — no circle, just a small ember rect */}
      <rect x="76" y="15" width="6" height="6" rx="0.5" fill={`${color}55`} stroke={color} strokeWidth="0.6"/>
      {/* curly smoke wisps */}
      <path d="M82 13 C 84 9, 80 6, 83 2" stroke={color} strokeWidth="0.9" fill="none" opacity="0.55"
        style={{animation:'smokeCurl 4s ease-in-out infinite', transformOrigin:'82px 13px'}}/>
      <path d="M85 12 C 88 7, 84 4, 87 0" stroke={color} strokeWidth="0.65" fill="none" opacity="0.38"
        style={{animation:'smokeCurl 5.2s ease-in-out 0.6s infinite', transformOrigin:'85px 12px'}}/>
      <path d="M89 13 C 91 8, 88 5, 91 1" stroke={color} strokeWidth="0.5" fill="none" opacity="0.25"
        style={{animation:'smokeCurl 3.8s ease-in-out 1.1s infinite', transformOrigin:'89px 13px'}}/>
    </svg>
  );
}

function WineGlass({ color = '#b89968', size = 54, fill = 0.55 }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" fill="none">
      <defs>
        <clipPath id="cup">
          <path d="M14 6 Q 14 42 30 44 Q 46 42 46 6 Z"/>
        </clipPath>
      </defs>
      {/* wine */}
      <rect x="14" y={6 + (1 - fill) * 38} width="32" height="40" fill={color} opacity="0.35" clipPath="url(#cup)"/>
      <path d="M14 6 Q 14 42 30 44 Q 46 42 46 6 Z" stroke={color} strokeWidth="1.2" fill="none"/>
      <path d="M30 44 L 30 78" stroke={color} strokeWidth="1.2"/>
      <path d="M18 82 Q 30 78 42 82" stroke={color} strokeWidth="1.2" fill="none"/>
      {/* shine */}
      <path d="M20 12 Q 20 26 22 32" stroke={color} strokeWidth="0.6" opacity="0.55" fill="none"/>
    </svg>
  );
}

function ProgramRow({ item, index, theme, isNow, past, onOpen, onLock, unlocked }) {
  if (item.type === 'secret-divider') {
    return <SecretDivider theme={theme} onLock={onLock}/>;
  }
  if (item.type === 'break') {
    return (
      <div style={{
        padding: '26px 22px 26px',
        borderTop: `1px solid ${theme.hair}`,
        borderBottom: `1px solid ${theme.hair}`,
        background: theme.alt,
        opacity: past ? 0.45 : 1,
        display: 'flex', alignItems: 'center', gap: 20,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative hair lines left & right */}
        <div style={{ position: 'relative', zIndex: 1, paddingRight: 12 }}>
          {item.icon === 'cigarette'
            ? <CigaretteIcon color={theme.accent} size={52}/>
            : <WineGlass color={theme.accent} size={42} fill={0.55}/>}
        </div>
        <div style={{ flex: 1, position: 'relative', zIndex: 1, paddingLeft: 12 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 4,
            color: theme.muted, textTransform: 'uppercase'
          }}>
            10 минути
          </div>
          <div style={{
            fontFamily: 'var(--display)', fontSize: 28, fontWeight: 300,
            fontStyle: 'italic', marginTop: 2, letterSpacing: '-0.01em',
            color: theme.accent
          }}>
            {item.title}
          </div>
          <div style={{
            fontFamily: 'var(--serif-text)', fontSize: 13, color: theme.muted,
            fontStyle: 'italic', marginTop: 4
          }}>
            {item.note}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === 'surprise') {
    return <SurpriseRow item={item} theme={theme} onOpen={onOpen} unlocked={unlocked}/>;
  }

  // song row
  const num = String(item.id).padStart(2, '0');
  return (
    <button onClick={onOpen} style={{
      width: '100%', background: isNow ? `${theme.accent}10` : 'transparent',
      border: 'none',
      padding: isNow ? '18px 22px' : '16px 22px',
      textAlign: 'left', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14,
      borderBottom: `1px solid ${theme.hair}`,
      borderTop: isNow ? `1px solid ${theme.accent}30` : 'none',
      color: theme.fg, fontFamily: 'var(--sans)',
      opacity: past ? 0.38 : 1,
      position: 'relative',
      transition: 'background 0.4s'
    }}>
      {/* thick left accent bar for now-playing */}
      {isNow && (
        <span style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: theme.accent
        }}/>
      )}
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        color: isNow ? theme.accent : theme.muted,
        minWidth: 22, letterSpacing: 1
      }}>{num}</span>
      <span style={{ flex: 1 }}>
        <span style={{
          fontFamily: 'var(--display)',
          fontSize: 22, fontWeight: 400,
          letterSpacing: '-0.01em',
          color: isNow ? theme.accent : theme.fg,
          fontStyle: isNow ? 'italic' : 'normal',
          display: 'block', lineHeight: 1.15
        }}>{item.title}</span>
        <span style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          {isNow && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 8,
              color: theme.accent, letterSpacing: 2.5,
              textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: theme.accent,
                animation: 'liveDot 1.2s ease-in-out infinite alternate',
                display: 'inline-block'
              }}/>
              СЕГА
            </span>
          )}
          {item.karaoke && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 8,
              color: isNow ? theme.accent : theme.muted,
              letterSpacing: 2, textTransform: 'uppercase',
              padding: '2px 6px',
              border: `1px solid ${isNow ? theme.accent : theme.hair}`,
            }}>
              ♪ пей с нас
            </span>
          )}
        </span>
      </span>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 10, color: isNow ? theme.accent : theme.muted,
        minWidth: 32, textAlign: 'right'
      }}>{item.duration}</span>
    </button>
  );
}

// ---------- Karaoke / Lyric View ----------
function LyricView({ song, theme, photo, fontSize, onBack, onPrev, onNext, hasPrev, hasNext }) {
  const lyrics = (window.LYRICS && window.LYRICS[song.id]) || (window.SECRET_LYRICS && window.SECRET_LYRICS[song.id]);
  const lines = useMemo(() => (lyrics || '').split('\n'), [lyrics]);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.fg,
      overflow: 'hidden', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }}>
        <PhotoBg src={photo} shade={0.8} pos="30% 70%" scale={1.4} blur={1.2}/>
      </div>
      <Grain o={0.18}/>

      {/* header */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '18px 22px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${theme.hair}`
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: theme.muted,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2.5,
          cursor: 'pointer', textTransform: 'uppercase', padding: 0
        }}>← програма</button>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: theme.accent, letterSpacing: 2
        }}>♪ пей с нас</span>
      </div>

      {/* title with decorative bar visualiser */}
      <div style={{ position: 'relative', zIndex: 2, padding: '18px 22px 10px' }}>
        {/* animated EQ bars as decoration — top right corner */}
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28, position: 'absolute', top: 18, right: 22 }}>
          {[0,1,2,3,4,5,6].map(b => (
            <span key={b} style={{
              width: 2.5, background: theme.accent, borderRadius: 1, opacity: 0.55,
              animation: `barPulse 0.${4+b}s ease-in-out ${b*0.11}s infinite alternate`
            }}/>
          ))}
        </div>
        {/* small ornamental cross */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginBottom: 8, opacity: 0.5 }}>
          <line x1="6" y1="0" x2="6" y2="12" stroke={theme.accent} strokeWidth="0.8"/>
          <line x1="0" y1="6" x2="12" y2="6" stroke={theme.accent} strokeWidth="0.8"/>
          <circle cx="6" cy="6" r="1.5" fill={theme.accent}/>
        </svg>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 4,
          color: theme.muted, textTransform: 'uppercase'
        }}>
          № {String(song.id).padStart(2, '0')} · {song.key} · {song.duration}
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 42, fontWeight: 300,
          lineHeight: 1, letterSpacing: '-0.02em', marginTop: 6
        }}>
          <i>{song.title}</i>
        </div>
        {/* underline with wave */}
        <svg width="100%" height="14" viewBox="0 0 320 14" preserveAspectRatio="none" style={{ display: 'block', marginTop: 12, opacity: 0.35 }}>
          <path d="M0 7 Q 40 2 80 7 Q 120 12 160 7 Q 200 2 240 7 Q 280 12 320 7" stroke={theme.accent} strokeWidth="0.8" fill="none"/>
        </svg>
      </div>

      {/* lyrics */}
      <div style={{
        position: 'relative', zIndex: 2, flex: 1, overflowY: 'auto',
        padding: '8px 22px 100px', WebkitOverflowScrolling: 'touch'
      }}>
        {/* ornamental top rule */}
        <svg width="100%" height="18" viewBox="0 0 320 18" preserveAspectRatio="none" style={{ display: 'block', marginBottom: 12, opacity: 0.4 }}>
          <line x1="0" y1="9" x2="130" y2="9" stroke={theme.accent} strokeWidth="0.5"/>
          <path d="M138 9 Q145 3 152 9 Q159 15 166 9" stroke={theme.accent} strokeWidth="0.7" fill="none"/>
          <circle cx="160" cy="9" r="1.5" fill={theme.accent}/>
          <line x1="168" y1="9" x2="320" y2="9" stroke={theme.accent} strokeWidth="0.5"/>
        </svg>
        {lines.map((line, i) => {
          const isHeader = /^\[.+\]$/.test(line.trim());
          const isEmpty = line.trim() === '';
          if (isEmpty) return <div key={i} style={{ height: fontSize * 0.55 }}/>;
          if (isHeader) {
            return (
              <div key={i} style={{ margin: '22px 0 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
                    <path d="M0 6 Q4 1 9 6 Q14 11 18 6" stroke={theme.accent} strokeWidth="0.8" fill="none"/>
                  </svg>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
                    color: theme.accent, textTransform: 'uppercase', flex: 1
                  }}>
                    {line.replace(/[\[\]]/g, '')}
                  </div>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
                    <path d="M18 6 Q14 1 9 6 Q4 11 0 6" stroke={theme.accent} strokeWidth="0.8" fill="none"/>
                  </svg>
                </div>
                <div style={{ height: 1, background: theme.hair }}/>
              </div>
            );
          }
          return (
            <div key={i} style={{
              fontFamily: 'var(--display)', fontSize,
              lineHeight: 1.4, fontWeight: 300,
              color: theme.fg, padding: '1px 0',
              letterSpacing: '-0.003em'
            }}>{line}</div>
          );
        })}
        {/* ornamental bottom rule */}
        <svg width="100%" height="28" viewBox="0 0 320 28" preserveAspectRatio="none" style={{ display: 'block', marginTop: 24, opacity: 0.3 }}>
          <line x1="0" y1="14" x2="110" y2="14" stroke={theme.accent} strokeWidth="0.5"/>
          <path d="M118 14 Q124 8 130 14" stroke={theme.accent} strokeWidth="0.7" fill="none"/>
          <circle cx="130" cy="14" r="1.2" fill={theme.accent}/>
          <path d="M130 14 Q136 20 142 14" stroke={theme.accent} strokeWidth="0.7" fill="none"/>
          <line x1="150" y1="14" x2="320" y2="14" stroke={theme.accent} strokeWidth="0.5"/>
        </svg>
      </div>

      {/* bottom nav (prev / next, only when available) */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        padding: '16px 22px',
        background: `linear-gradient(transparent, ${theme.bg} 40%)`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2.5,
        textTransform: 'uppercase', color: theme.muted
      }}>
        <button onClick={onPrev} disabled={!hasPrev} style={{
          background: hasPrev ? 'rgba(255,255,255,0.04)' : 'transparent',
          border: `1px solid ${hasPrev ? theme.hair : 'transparent'}`,
          borderRadius: 8,
          color: hasPrev ? theme.fg : theme.hair,
          fontFamily: 'inherit', fontSize: 12, letterSpacing: 'inherit',
          cursor: hasPrev ? 'pointer' : 'default',
          padding: '12px 18px', minWidth: 80, textAlign: 'center'
        }}>← пред.</button>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${theme.hair}`,
          borderRadius: 8,
          color: theme.muted,
          fontFamily: 'inherit', fontSize: 12, letterSpacing: 'inherit',
          cursor: 'pointer', padding: '12px 18px', minWidth: 70, textAlign: 'center'
        }}>списък</button>
        <button onClick={onNext} disabled={!hasNext} style={{
          background: hasNext ? 'rgba(255,255,255,0.04)' : 'transparent',
          border: `1px solid ${hasNext ? theme.hair : 'transparent'}`,
          borderRadius: 8,
          color: hasNext ? theme.fg : theme.hair,
          fontFamily: 'inherit', fontSize: 12, letterSpacing: 'inherit',
          cursor: hasNext ? 'pointer' : 'default',
          padding: '12px 18px', minWidth: 80, textAlign: 'center'
        }}>след. →</button>
      </div>
    </div>
  );
}

// ---------- Break / Surprise detail ----------
function PauseView({ item, theme, onBack }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.fg,
      display: 'flex', flexDirection: 'column',
      padding: '24px 22px'
    }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: theme.muted,
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2.5,
        cursor: 'pointer', textTransform: 'uppercase',
        padding: 0, alignSelf: 'flex-start'
      }}>← програма</button>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        textAlign: 'center', padding: '0 10px'
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 4,
          color: theme.accent, textTransform: 'uppercase'
        }}>
          {item.type === 'surprise' ? 'финал' : 'интермедия'}
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 68, fontWeight: 300,
          fontStyle: 'italic', letterSpacing: '-0.03em', marginTop: 14, lineHeight: 0.95
        }}>
          {item.title}
        </div>
        <div style={{
          fontFamily: 'var(--serif-text)', fontSize: 17,
          color: theme.muted, marginTop: 22, fontStyle: 'italic'
        }}>
          {item.note}
        </div>
        {item.type === 'surprise' && (
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 3,
            color: theme.muted, marginTop: 38, textTransform: 'uppercase'
          }}>
            ✦ ✦ ✦
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Secret Section Divider ----------
// Appears between the base program and the hidden karaoke set once unlocked.
// A keyhole silhouette sitting on a doubled hairline — reads as "door opened".
function SecretDivider({ theme }) {
  return (
    <div style={{
      padding: '22px 22px 20px', position: 'relative',
      display: 'flex', alignItems: 'center', gap: 16,
      borderTop: `1px solid ${theme.accent}`,
      marginTop: 4,
      background: `linear-gradient(180deg, ${theme.alt}, transparent)`,
    }}>
      {/* keyhole glyph */}
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" style={{ flexShrink: 0 }}>
        <rect x="1" y="1" width="26" height="34" rx="13" stroke={theme.accent} strokeWidth="1" fill="none"/>
        <circle cx="14" cy="14" r="4" fill={theme.accent}/>
        <path d="M14 18 L11 28 L17 28 Z" fill={theme.accent}/>
      </svg>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 4,
          color: theme.accent, textTransform: 'uppercase', marginBottom: 2
        }}>
          скрит сет · отключен
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 22, fontWeight: 300,
          fontStyle: 'italic', letterSpacing: '-0.01em', color: theme.fg
        }}>
          Пет тайни песни
        </div>
      </div>
    </div>
  );
}

// ---------- Discreet key button (hidden in plain sight on program footer) ----------
function KeyButton({ theme, onClick }) {
  return (
    <button onClick={onClick} aria-label="таен вход" style={{
      position: 'absolute', bottom: 18, right: 18,
      width: 38, height: 38, borderRadius: '50%',
      background: 'transparent',
      border: `1px solid ${theme.hair}`,
      color: theme.muted,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', padding: 0,
      transition: 'border-color 0.3s ease, color 0.3s ease'
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.hair; e.currentTarget.style.color = theme.muted; }}>
      {/* tiny ornamental key */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="5" cy="9" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M8 9 L16 9 M14 9 L14 12 M12 9 L12 11" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
      </svg>
    </button>
  );
}

// ---------- PIN entry screen ----------
function PasswordView({ theme, onBack, onUnlock }) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | wrong | ok
  const PIN_LEN = 4;

  const submit = useCallback((pin) => {
    const expected = (window.SECRET_PIN || '').toString();
    if (pin === expected && expected.length > 0) {
      setStatus('ok');
      setTimeout(() => onUnlock(), 480);
    } else {
      setStatus('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 420);
      setTimeout(() => { setStatus('idle'); setValue(''); }, 900);
    }
  }, [onUnlock]);

  const press = (d) => {
    if (status !== 'idle') return;
    setValue(v => {
      if (v.length >= PIN_LEN) return v;
      const next = v + d;
      if (next.length === PIN_LEN) {
        setTimeout(() => submit(next), 120);
      }
      return next;
    });
  };
  const backspace = () => {
    if (status !== 'idle') return;
    setValue(v => v.slice(0, -1));
  };

  // keyboard support
  useEffect(() => {
    const h = (e) => {
      if (e.key >= '0' && e.key <= '9') press(e.key);
      else if (e.key === 'Backspace') backspace();
      else if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [status]);

  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.fg,
      display: 'flex', flexDirection: 'column', padding: '0 22px',
      overflow: 'hidden'
    }}>
      {/* top bar */}
      <div style={{
        paddingTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
        textTransform: 'uppercase', color: theme.muted
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', color: theme.muted,
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
          textTransform: 'uppercase', cursor: 'pointer', padding: 0
        }}>← назад</button>
        <span>вход</span>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        animation: shake ? 'shake 0.42s' : 'none'
      }}>
        {/* big key glyph */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, marginBottom: 14 }}>
          <svg width="46" height="46" viewBox="0 0 54 54" fill="none">
            <circle cx="17" cy="27" r="10" stroke={theme.accent} strokeWidth="1.3" fill="none"/>
            <circle cx="17" cy="27" r="3" fill={theme.accent}/>
            <path d="M27 27 L48 27 M44 27 L44 34 M38 27 L38 32" stroke={theme.accent} strokeWidth="1.3" strokeLinecap="square"/>
          </svg>
        </div>

        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 4,
          color: theme.accent, textTransform: 'uppercase',
          textAlign: 'center', marginBottom: 10
        }}>
          Скрит сет
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 30, fontWeight: 300,
          fontStyle: 'italic', letterSpacing: '-0.02em',
          textAlign: 'center', lineHeight: 1.1, marginBottom: 8
        }}>
          Въведи PIN
        </div>
        <div style={{
          fontFamily: 'var(--serif-text)', fontSize: 12, color: theme.muted,
          fontStyle: 'italic', textAlign: 'center', marginBottom: 22,
          maxWidth: 240, alignSelf: 'center', lineHeight: 1.5
        }}>
          само хората които трябва да знаят, знаят.
        </div>

        {/* PIN dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 18
        }}>
          {Array.from({ length: PIN_LEN }).map((_, i) => {
            const filled = i < value.length;
            const ok = status === 'ok';
            const wrong = status === 'wrong';
            return (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: '50%',
                border: `1px solid ${wrong ? '#c24a4a' : theme.accent}`,
                background: filled ? (ok ? theme.accent : wrong ? '#c24a4a' : theme.fg) : 'transparent',
                transition: 'background 0.15s ease, transform 0.15s ease',
                transform: filled ? 'scale(1.1)' : 'scale(1)'
              }}/>
            );
          })}
        </div>

        {/* status line */}
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2,
          color: status === 'wrong' ? '#c24a4a' : status === 'ok' ? theme.accent : theme.muted,
          textAlign: 'center', textTransform: 'uppercase',
          minHeight: 14, marginBottom: 18
        }}>
          {status === 'wrong' ? 'грешен PIN' : status === 'ok' ? 'добре дошъл' : '\u00a0'}
        </div>

        {/* numeric keypad */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10, maxWidth: 280, margin: '0 auto 24px', width: '100%'
        }}>
          {keys.map((k, i) => {
            if (k === '') return <div key={i}/>;
            const isBack = k === '⌫';
            return (
              <button
                key={i}
                onClick={() => isBack ? backspace() : press(k)}
                disabled={status !== 'idle'}
                style={{
                  height: 56,
                  background: 'transparent',
                  border: `1px solid ${theme.hair}`,
                  color: isBack ? theme.muted : theme.fg,
                  fontFamily: isBack ? 'var(--mono)' : 'var(--display)',
                  fontSize: isBack ? 18 : 26,
                  fontWeight: 300,
                  cursor: status === 'idle' ? 'pointer' : 'default',
                  transition: 'background 0.15s, border-color 0.15s',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onMouseDown={e => { e.currentTarget.style.background = theme.alt; e.currentTarget.style.borderColor = theme.accent; }}
                onMouseUp={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = theme.hair; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = theme.hair; }}
                onTouchStart={e => { e.currentTarget.style.background = theme.alt; e.currentTarget.style.borderColor = theme.accent; }}
                onTouchEnd={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = theme.hair; }}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

// ---------- Main ----------
window.FilmicApp = function FilmicApp({ themeMode = 'dark', fontSize = 19, aesthetic = 'editorial' }) {
  const baseProgram = window.PROGRAM;
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem('setlist-secret-unlocked') === '1'; } catch(e) { return false; }
  });
  const program = useMemo(() => {
    if (unlocked && window.SECRET_SONGS) {
      return [
        ...baseProgram,
        { type: 'secret-divider' },
        ...window.SECRET_SONGS
      ];
    }
    return baseProgram;
  }, [baseProgram, unlocked]);

  const [screen, setScreen] = useState('cover'); // cover | program | song | pause | password
  const [activeIdx, setActiveIdx] = useState(null);
  const [nowIndex, setNowIndex] = useState(2); // demo: "now playing" is Парфюм

  const theme = useMemo(() => {
    if (aesthetic === 'editorial') {
      return themeMode === 'dark' ? {
        bg: '#0d0c0a', fg: '#eae3d2', muted: '#7a7365', hair: 'rgba(234,227,210,0.12)',
        alt: 'rgba(255,255,255,0.015)',
        accent: '#b89968' // warm bone/champagne gold — restrained, not orange
      } : {
        bg: '#f1ece1', fg: '#1a1712', muted: '#6b6456', hair: 'rgba(26,23,18,0.14)',
        alt: 'rgba(0,0,0,0.02)',
        accent: '#7a5a30'
      };
    }
    if (aesthetic === 'ink') {
      // near-black + oxblood
      return themeMode === 'dark' ? {
        bg: '#0a0808', fg: '#ece8e2', muted: '#7d7871', hair: 'rgba(236,232,226,0.1)',
        alt: 'rgba(255,255,255,0.02)',
        accent: '#9c3b3b' // oxblood
      } : {
        bg: '#f5f1ea', fg: '#141110', muted: '#6a645b', hair: 'rgba(20,17,16,0.13)',
        alt: 'rgba(0,0,0,0.02)',
        accent: '#7a2424'
      };
    }
    if (aesthetic === 'mono') {
      // strictly b&w + gallery white
      return themeMode === 'dark' ? {
        bg: '#0a0a0a', fg: '#fafaf6', muted: '#777', hair: 'rgba(255,255,255,0.1)',
        alt: 'rgba(255,255,255,0.02)',
        accent: '#fafaf6'
      } : {
        bg: '#f6f4ee', fg: '#0a0a0a', muted: '#777', hair: 'rgba(0,0,0,0.1)',
        alt: 'rgba(0,0,0,0.02)',
        accent: '#0a0a0a'
      };
    }
    return {};
  }, [themeMode, aesthetic]);

  // abstract photo crops — never show the literal subject
  const photos = {
    cover: 'assets/photo-04.jpg', // silhouette cover
    list:  'assets/photo-02.jpg',
    song:  'assets/photo-03.jpg'
  };

  const current = activeIdx != null ? program[activeIdx] : null;
  const songIndexes = program.map((p, i) => p.type === 'song' ? i : -1).filter(i => i >= 0);
  const songPos = activeIdx != null ? songIndexes.indexOf(activeIdx) : -1;
  const hasPrev = songPos > 0;
  const hasNext = songPos >= 0 && songPos < songIndexes.length - 1;

  const openItem = (i) => {
    const it = program[i];
    if (it.type === 'song') { setActiveIdx(i); setScreen('song'); }
    else if (it.type === 'surprise') {
      if (unlocked) {
        // already unlocked — just scroll to secret section
        setTimeout(() => {
          const container = document.querySelector('[data-program-scroll]');
          if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }, 30);
      } else {
        setScreen('password');
      }
    }
  };

  const doUnlock = () => {
    // PIN ok → advance to the seal break
    setScreen('seal');
  };
  const doSealBroken = () => {
    try { localStorage.setItem('setlist-secret-unlocked', '1'); } catch(e) {}
    setUnlocked(true);
    setScreen('program');
    setTimeout(() => {
      try {
        const container = document.querySelector('[data-program-scroll]');
        if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      } catch(e) {}
    }, 80);
  };
  const doLock = () => {
    try { localStorage.removeItem('setlist-secret-unlocked'); } catch(e) {}
    setUnlocked(false);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      fontFamily: 'var(--sans)', background: theme.bg, color: theme.fg
    }}>
      {screen === 'cover' && <Cover theme={theme} photo={photos.cover} onEnter={() => setScreen('program')}/>}
      {screen === 'program' && (
        <ProgramView theme={theme} photo={photos.list} program={program}
          nowIndex={nowIndex} onOpen={openItem}
          unlocked={unlocked}
          onLock={doLock}
        />
      )}
      {screen === 'password' && (
        <PasswordView theme={theme}
          onBack={() => setScreen('program')}
          onUnlock={doUnlock}
        />
      )}
      {screen === 'seal' && (
        <SealView theme={theme}
          onBack={() => setScreen('program')}
          onBroken={doSealBroken}
        />
      )}
      {screen === 'song' && current && current.type === 'song' && (
        <LyricView
          song={current} theme={theme} photo={photos.song} fontSize={fontSize}
          onBack={() => setScreen('program')}
          onPrev={() => { if (hasPrev) setActiveIdx(songIndexes[songPos - 1]); }}
          onNext={() => { if (hasNext) setActiveIdx(songIndexes[songPos + 1]); }}
          hasPrev={hasPrev} hasNext={hasNext}
        />
      )}
    </div>
  );
};

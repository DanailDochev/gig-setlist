import { useMemo } from 'react';
import { PhotoBg } from './PhotoBg';
import { Grain } from './Grain';

export function LyricView({ song, lyrics, theme, songPhoto, fontSize = 16, onBack, onPrev, onNext, hasPrev, hasNext }) {
  const lines = useMemo(() => (lyrics || '').split('\n'), [lyrics]);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.fg,
      overflow: 'hidden', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }}>
        <PhotoBg src={songPhoto} shade={0.8} pos="30% 70%" scale={1.4} blur={1.2}/>
      </div>
      <Grain o={0.18}/>

      {/* header nav */}
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
        {song.karaoke && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: theme.accent, letterSpacing: 2 }}>
            ♪ пей с нас
          </span>
        )}
      </div>

      {/* song title block */}
      <div style={{ position: 'relative', zIndex: 2, padding: '18px 22px 10px' }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28, position: 'absolute', top: 18, right: 22 }}>
          {[0, 1, 2, 3, 4, 5, 6].map(b => (
            <span key={b} style={{
              width: 2.5, background: theme.accent, borderRadius: 1, opacity: 0.55,
              animation: `barPulse 0.${4 + b}s ease-in-out ${b * 0.11}s infinite alternate`
            }}/>
          ))}
        </div>
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
        <svg width="100%" height="14" viewBox="0 0 320 14" preserveAspectRatio="none" style={{ display: 'block', marginTop: 12, opacity: 0.35 }}>
          <path d="M0 7 Q 40 2 80 7 Q 120 12 160 7 Q 200 2 240 7 Q 280 12 320 7" stroke={theme.accent} strokeWidth="0.8" fill="none"/>
        </svg>
      </div>

      {/* lyrics scroll area */}
      <div style={{
        position: 'relative', zIndex: 2, flex: 1, overflowY: 'auto',
        padding: '8px 22px 100px', WebkitOverflowScrolling: 'touch'
      }}>
        <svg width="100%" height="18" viewBox="0 0 320 18" preserveAspectRatio="none" style={{ display: 'block', marginBottom: 12, opacity: 0.4 }}>
          <line x1="0" y1="9" x2="130" y2="9" stroke={theme.accent} strokeWidth="0.5"/>
          <path d="M138 9 Q145 3 152 9 Q159 15 166 9" stroke={theme.accent} strokeWidth="0.7" fill="none"/>
          <circle cx="160" cy="9" r="1.5" fill={theme.accent}/>
          <line x1="168" y1="9" x2="320" y2="9" stroke={theme.accent} strokeWidth="0.5"/>
        </svg>

        {lines.map((line, i) => {
          const t = line.trim();
          const isHeader = t.length > 2 && t[0] === '[' && t[t.length - 1] === ']';
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
              color: theme.fg, padding: '1px 0', letterSpacing: '-0.003em'
            }}>{line}</div>
          );
        })}

        <svg width="100%" height="28" viewBox="0 0 320 28" preserveAspectRatio="none" style={{ display: 'block', marginTop: 24, opacity: 0.3 }}>
          <line x1="0" y1="14" x2="110" y2="14" stroke={theme.accent} strokeWidth="0.5"/>
          <path d="M118 14 Q124 8 130 14" stroke={theme.accent} strokeWidth="0.7" fill="none"/>
          <circle cx="130" cy="14" r="1.2" fill={theme.accent}/>
          <path d="M130 14 Q136 20 142 14" stroke={theme.accent} strokeWidth="0.7" fill="none"/>
          <line x1="150" y1="14" x2="320" y2="14" stroke={theme.accent} strokeWidth="0.5"/>
        </svg>
      </div>

      {/* bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        padding: '16px 22px',
        background: `linear-gradient(transparent, ${theme.bg} 40%)`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={onPrev} disabled={!hasPrev} style={{
          background: hasPrev ? 'rgba(255,255,255,0.04)' : 'transparent',
          border: `1px solid ${hasPrev ? theme.hair : 'transparent'}`,
          borderRadius: 8, color: hasPrev ? theme.fg : theme.hair,
          fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 2.5,
          textTransform: 'uppercase', cursor: hasPrev ? 'pointer' : 'default',
          padding: '12px 18px', minWidth: 80, textAlign: 'center'
        }}>← пред.</button>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${theme.hair}`,
          borderRadius: 8, color: theme.muted,
          fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 2.5,
          textTransform: 'uppercase', cursor: 'pointer',
          padding: '12px 18px', minWidth: 70, textAlign: 'center'
        }}>списък</button>
        <button onClick={onNext} disabled={!hasNext} style={{
          background: hasNext ? 'rgba(255,255,255,0.04)' : 'transparent',
          border: `1px solid ${hasNext ? theme.hair : 'transparent'}`,
          borderRadius: 8, color: hasNext ? theme.fg : theme.hair,
          fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 2.5,
          textTransform: 'uppercase', cursor: hasNext ? 'pointer' : 'default',
          padding: '12px 18px', minWidth: 80, textAlign: 'center'
        }}>след. →</button>
      </div>
    </div>
  );
}

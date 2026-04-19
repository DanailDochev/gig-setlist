export function CigaretteIcon({ color = '#b89968', size = 52 }) {
  return (
    <svg width={size * 2.2} height={size * 0.7} viewBox="0 0 110 36" fill="none">
      <rect x="0" y="13" width="18" height="10" rx="1" stroke={color} strokeWidth="1" fill={`${color}22`}/>
      <rect x="18" y="13" width="58" height="10" rx="0.5" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="34" y1="13" x2="34" y2="23" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <line x1="50" y1="13" x2="50" y2="23" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <path d="M81 13 C 78 8, 83 4, 79 -1" stroke={color} strokeWidth="1.1" fill="none" opacity="0.75"
        style={{ animation: 'smokeCurl 3.6s ease-in-out infinite', transformOrigin: '81px 13px' }}/>
      <path d="M84 12 C 87 6, 82 2, 86 -3" stroke={color} strokeWidth="1.0" fill="none" opacity="0.65"
        style={{ animation: 'smokeCurl 4.8s ease-in-out 0.4s infinite', transformOrigin: '84px 12px' }}/>
      <path d="M87 13 C 90 7, 86 3, 90 -2" stroke={color} strokeWidth="0.85" fill="none" opacity="0.55"
        style={{ animation: 'smokeCurl 3.9s ease-in-out 0.9s infinite', transformOrigin: '87px 13px' }}/>
      <path d="M83 11 C 80 5, 85 1, 81 -4" stroke={color} strokeWidth="0.75" fill="none" opacity="0.45"
        style={{ animation: 'smokeCurl 5.5s ease-in-out 1.5s infinite', transformOrigin: '83px 11px' }}/>
      <path d="M86 12 C 90 5, 85 0, 89 -5" stroke={color} strokeWidth="0.6" fill="none" opacity="0.35"
        style={{ animation: 'smokeCurl 4.2s ease-in-out 2.1s infinite', transformOrigin: '86px 12px' }}/>
      <path d="M80 13 C 77 6, 82 2, 78 -3" stroke={color} strokeWidth="0.5" fill="none" opacity="0.28"
        style={{ animation: 'smokeCurl 6.0s ease-in-out 0.7s infinite', transformOrigin: '80px 13px' }}/>
    </svg>
  );
}

export function WineGlass({ color = '#b89968', size = 54, fill = 0.55 }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" fill="none">
      <defs>
        <clipPath id="cup">
          <path d="M14 6 Q 14 42 30 44 Q 46 42 46 6 Z"/>
        </clipPath>
      </defs>
      <rect x="14" y={6 + (1 - fill) * 38} width="32" height="40" fill={color} opacity="0.35" clipPath="url(#cup)"/>
      <path d="M14 6 Q 14 42 30 44 Q 46 42 46 6 Z" stroke={color} strokeWidth="1.2" fill="none"/>
      <path d="M30 44 L 30 78" stroke={color} strokeWidth="1.2"/>
      <path d="M18 82 Q 30 78 42 82" stroke={color} strokeWidth="1.2" fill="none"/>
      <path d="M20 12 Q 20 26 22 32" stroke={color} strokeWidth="0.6" opacity="0.55" fill="none"/>
    </svg>
  );
}

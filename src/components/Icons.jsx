export function CigaretteIcon({ color = '#b89968', size = 52 }) {
  return (
    <svg width={size * 2.2} height={size * 0.7} viewBox="0 0 110 36" fill="none">
      <rect x="0" y="13" width="18" height="10" rx="1" stroke={color} strokeWidth="1" fill={`${color}22`}/>
      <rect x="18" y="13" width="58" height="10" rx="0.5" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="34" y1="13" x2="34" y2="23" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <line x1="50" y1="13" x2="50" y2="23" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <rect x="76" y="15" width="6" height="6" rx="0.5" fill={`${color}55`} stroke={color} strokeWidth="0.6"/>
      <path d="M82 13 C 84 9, 80 6, 83 2" stroke={color} strokeWidth="0.9" fill="none" opacity="0.55"
        style={{ animation: 'smokeCurl 4s ease-in-out infinite', transformOrigin: '82px 13px' }}/>
      <path d="M85 12 C 88 7, 84 4, 87 0" stroke={color} strokeWidth="0.65" fill="none" opacity="0.38"
        style={{ animation: 'smokeCurl 5.2s ease-in-out 0.6s infinite', transformOrigin: '85px 12px' }}/>
      <path d="M89 13 C 91 8, 88 5, 91 1" stroke={color} strokeWidth="0.5" fill="none" opacity="0.25"
        style={{ animation: 'smokeCurl 3.8s ease-in-out 1.1s infinite', transformOrigin: '89px 13px' }}/>
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

// Glyphs — small monoline SVG icons that replace emoji
window.Glyph = function Glyph({ name, size = 18, stroke = 'currentColor' }) {
  const s = size;
  const props = {
    width: s, height: s, viewBox: '0 0 24 24',
    fill: 'none', stroke, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  const paths = {
    ticket: <><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M9 6v12" strokeDasharray="1.5 2"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    flower: <><circle cx="12" cy="12" r="2.5"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4"/></>,
    wind: <><path d="M3 8h10a3 3 0 1 0-3-3M3 12h14a3 3 0 1 1-3 3M3 16h7a2 2 0 1 1-2 2"/></>,
    shrug: <><path d="M6 8V6a2 2 0 1 1 4 0M18 8V6a2 2 0 1 0-4 0M4 11l2 3v4M20 11l-2 3v4M9 13h6"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    pen: <><path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/></>,
    smoke: <><path d="M4 18h12a3 3 0 1 0-.5-6 5 5 0 0 0-9.8 1A3 3 0 0 0 4 18zM18 21h2M14 21h2M8 21h2"/></>,
    star: <><path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14l-5-4.5L9.5 9z"/></>,
    wine: <><path d="M8 3h8l-1 6a3 3 0 0 1-6 0zM12 15v6M9 21h6"/></>
  };
  return (
    <svg {...props}>{paths[name] || paths.star}</svg>
  );
};

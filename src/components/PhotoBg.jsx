export function PhotoBg({ src, shade = 0.6, pos = 'center', scale = 1.3, blur = 0 }) {
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
        background: `linear-gradient(180deg, rgba(10,9,8,${shade * 0.4}), rgba(10,9,8,${shade}))`
      }}/>
    </div>
  );
}

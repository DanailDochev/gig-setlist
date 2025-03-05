import React from 'react';

const LyricDisplay = ({ songLyrics }) => {
  const lyricStyles = {
    container: {
      backgroundColor: '#1A1A1D',
      color: '#A64D79',
      padding: '1.5rem',
      borderRadius: '10px',
      lineHeight: '1.6',
      fontFamily: "'Courier New', monospace",
      fontSize: '16px',
      whiteSpace: 'pre-wrap',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxHeight: '300px',
      overflowY: 'auto'
    }
  };

  return (
    <pre style={lyricStyles.container}>
      {songLyrics}
    </pre>
  );
};

export default LyricDisplay;
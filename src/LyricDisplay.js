import React from 'react';

const LyricDisplay = ({ songLyrics }) => {
  const lyricStyles = {
    container: {
      backgroundColor: '#1A1A1D',
      color: '#A64D79',
      padding: '0.2rem',
      margin: '0',
      borderRadius: '10px',
      lineHeight: '1.3',
      fontFamily: "'Courier New', monospace",
      fontSize: '16px',
      whiteSpace: 'pre-wrap',
      letterSpacing: '0.2px',
      boxShadow: '0 4px 6px rgba(1,5,5,0.1)',
      maxHeight: '30.5rem',
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
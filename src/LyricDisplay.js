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

  // Process lyrics to add styling to section headers
  const processLyrics = () => {
    if (!songLyrics) return null;
    
    // Split lyrics into lines
    const lines = songLyrics.split('\n');
    
    return lines.map((line, index) => {
      // Check if line contains a section header (куплет or припев)
      if (line.toLowerCase().includes('куплет') || line.toLowerCase().includes('припев')
          || line.toLowerCase().includes('бридж')) {
        return (
          <div 
            key={index} 
            style={{
              fontStyle: 'italic',
              fontSize: '15px',
              textDecoration: 'underline',
              textAlign: 'center',
              margin: '0.5rem 0',
              color: '#ff6b9d',
              fontWeight: 'bold'
            }}
          >
            {line}
          </div>
        );
      } else {
        return <div key={index}>{line}</div>;
      }
    });
  };

  return (
    <div style={lyricStyles.container}>
      {processLyrics()}
    </div>
  );
};

export default LyricDisplay;
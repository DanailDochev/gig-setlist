// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { lyrics } from './Lyrics';
import LyricDisplay from './LyricDisplay';

const songs = [
  { id: 1, title: "Двупосочен Билет 🎫", lyrics: lyrics[1] },
  { id: 2, title: "Още малко само 🕰️", lyrics: "" },
  { id: 3, title: "Парфюм 💐", lyrics: "" },
  { id: 4, title: "Бриз 🌬️", lyrics: "" },
  { id: 5, title: "Все едно 🤷", lyrics: "" },
  { id: 6, title: "Тайна 🤫", lyrics: "" },
  { id: 7, title: "Край 🔚", lyrics: "" },
  { id: 8, title: "Подпис ✍️", lyrics: "" },
  { id: 9, title: "Дим 💨", lyrics: "" },
  { id: 10, title: "Някъде Там 🌌", lyrics: "" },
  { id: 11, title: "Вино 🍷", lyrics: "" }
];

// Custom component for lyrics display
const SimpleLyricDisplay = ({ songLyrics }) => {
  // Split by newlines and map to paragraphs
  return (
    <div style={{ color: '#A64D79', lineHeight: '1.6' }}>
      {songLyrics.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

function HomePage() {
  return (
    <div style={{
      maxWidth: '42rem',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#A64D79'
      }}>
        Setlist
      </h1>
      
      <div>
        {songs.map((song) => (
          <Link 
            key={song.id}
            to={`/song/${song.id}`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div 
              style={{
                backgroundColor: '#3B1C32',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.25rem' }}>{song.title}</span>
                <span>▶</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function SongPage() {
  // Get the songId from URL parameter
  const songId = parseInt(window.location.pathname.split('/')[2]);
  const song = songs.find(s => s.id === songId);

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div style={{
      maxWidth: '42rem',
      margin: '0 auto',
      paddingBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#A64D79',
          fontSize: '1.25rem'
        }}>
          ← Back
        </Link>
      </div>
      
      <h2 style={{
        fontSize: '1.5=rem',
        fontWeight: 'bold',
        color: '#A64D79',
        textAlign: 'center',
        marginBottom: '1.5rem'
      }}>
        {song.title}
      </h2>
      
      {/* Purple container with black background for lyrics */}
      <div style={{
        backgroundColor: '#3B1C32',
        borderRadius: '0.95rem',
        padding: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          fontSize: '0.9rem',
          backgroundColor: '#1A1A1D',
          borderRadius: '0.9rem',
          padding: '1.5rem'
          
        }}>
          {song.lyrics ? (
            <SimpleLyricDisplay songLyrics={song.lyrics} />
          ) : (
            <p style={{ color: '#A64D79', fontStyle: 'italic', textAlign: 'center' }}>
              Lyrics will be added soon...
            </p>
          )}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem'
      }}>
        {songId > 1 && (
          <Link to={`/song/${songId - 1}`} style={{ 
            textDecoration: 'none', 
            color: '#A64D79',
            backgroundColor: '#3B1C32',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem'
          }}>
            ← Previous
          </Link>
        )}
        {songId < songs.length && (
          <Link to={`/song/${songId + 1}`} style={{ 
            textDecoration: 'none', 
            color: '#A64D79',
            backgroundColor: '#3B1C32',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            marginLeft: 'auto'
          }}>
            Next → 
          </Link>
        )}
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      <a 
        href="https://www.instagram.com/danydochev/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          color: '#A64D79',
          textDecoration: 'none'
        }}
      >
        Instagram
      </a>
      <a 
        href="https://www.youtube.com/@danydochev" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          color: '#A64D79',
          textDecoration: 'none'
        }}
      >
        YouTube
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{
        backgroundColor: '#1A1A1D',
        color: 'white',
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/song/:id" element={<SongPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
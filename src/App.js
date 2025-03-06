import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { lyrics } from './Lyrics';
import LyricDisplay from './LyricDisplay';

const songs = [
  { id: 1, title: "Двупосочен Билет 🎫", lyrics: lyrics[1] },
  { id: 2, title: "Още малко само 🕰️", lyrics: lyrics[2]},
  { id: 3, title: "Парфюм 💐", lyrics: lyrics[3] },
  { id: 4, title: "Бриз 🌬️", lyrics: lyrics[4] },
  { id: 5, title: "Все едно 🤷", lyrics: lyrics[5] },
  { id: 6, title: "Тайна 🤫", lyrics: lyrics[6] },
  { id: 7, title: "Край 🔚", lyrics: lyrics[7] },
  { id: 8, title: "Подпис ✍️", lyrics: lyrics[8] },
  { id: 9, title: "Дим 💨", lyrics: lyrics[9] },
  { id: 10, title: "Някъде Там 🌌", lyrics: lyrics[10] },
  { id: 11, title: "Вино 🍷", lyrics: lyrics[11] }
];

function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div style={{
      backgroundColor: '#1A1A1D',
      color: 'white',
      minHeight: '100vh',
      padding: '0.4rem'
    }}>
      <div style={{
        maxWidth: '45rm',
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
            <div 
              key={song.id} 
              style={{
                backgroundColor: '#3B1C32',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedSong(selectedSong === song ? null : song)}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.25rem' }}>{song.title}</span>
                <span>{selectedSong === song ? '▲' : '▼'}</span>
              </div>
              
              {selectedSong === song && (
                <div style={{
                  marginTop: '1rem',
                  backgroundColor: '#1A1A1D',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  {song.lyrics ? (
                    <LyricDisplay songLyrics={song.lyrics} />
                  ) : (
                    <p style={{ color: 'gray', fontStyle: 'italic' }}>
                      Lyrics will be added soon...
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
const AudioContext = window.AudioContext || window.webkitAudioContext;

const modes = {
  'ionian': [0, 2, 4, 5, 7, 9, 11, 12],
  'dorian': [0, 2, 3, 5, 7, 9, 10, 12],
  'phrygian': [0, 1, 3, 5, 7, 8, 10, 12],
  'lydian': [0, 2, 4, 6, 7, 9, 11, 12],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10, 12],
  'aeolian': [0, 2, 3, 5, 7, 8, 10, 12],
  'locrian': [0, 1, 3, 5, 6, 8, 10, 12],
};

const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const rootNote = 60; // middle C



const ArpeggioPlayer = () => {
  const [mode, setMode] = useState('ionian');
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteName, setNoteName] = useState('');

  useEffect(() => {    
    if (!isPlaying) return;

    const context = new AudioContext()
    
    
    const scale = modes[mode];
    
    let current = 0;
    let oscillator = null;
   
    const play = () => {     
      const note = rootNote + scale[current];
      const noteName = noteNames[note % 12];    

      setNoteName(noteName);

      oscillator = context.createOscillator();
      oscillator.frequency.value = 440 * Math.pow(2, (note - 69) / 12);
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
      
      current++;
      
      if(current < scale.length) oscillator.addEventListener('ended', play);
    };
    
    play();
    
    return () => {
      oscillator.removeEventListener('ended', play);
      oscillator = null;
      context.close();
    };
  }, [mode, isPlaying]);  

  return (
    <div>
      <select value={mode} onChange={e => setMode(e.target.value)}>
        {Object.keys(modes).map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
     <h1>{noteName}</h1>
    </div>
  );
};
export default ArpeggioPlayer;
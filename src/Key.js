import React, { useState, useEffect } from 'react';
import Guitar from 'react-guitar'
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

const noteNames = {'c':60, 'c#':61, 'd':62, 'd#':63, 'e':64, 'f':65, 'f#':66, 'g':67, 'g#':68, 'a':69, 'a#':70, 'b':71}



const ArpeggioPlayer = () => {
  const [mode, setMode] = useState('ionian');
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteName, setNoteName] = useState('');
  const [rootNote, setRootNote] = useState(60)

  const keyNames = Object.keys(modes).map(m => (
    <option key={m} value={m}>{m}</option>
  ))




  useEffect(() => {    
    if (!isPlaying) return;

    const context = new AudioContext()
  
    const scale = modes[mode];
    
    let current = 0;
    let oscillator = null;
    const play = () => {     
      const note = rootNote + scale[current];
 
      oscillator = context.createOscillator();
      oscillator.frequency.value = 440 * Math.pow(2, (note - 69) / 12);
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
      
      current++;
      
console.log(current)

      if(current < scale.length) 
        oscillator.addEventListener('ended', play)
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
        {keyNames}
      </select>

      <select value={noteNames[rootNote]} onChange={e => setRootNote(noteNames[e.target.value])}>
        {Object.keys(noteNames).map(note => (
          <option key={note} value={note}>{note}</option>
        ))}
      </select>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <Guitar strings={[0, 1, 2, 2, 0, -1]} />,
      <h1>{noteName}</h1>
    </div>
  );
};
export default ArpeggioPlayer;
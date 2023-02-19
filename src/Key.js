import React, { useState, useEffect, useMemo } from 'react';
import Guitar from 'react-guitar'
import { standard } from 'react-guitar-tunings'
import useSound from 'react-guitar-sound'
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

const noteNames = {
  'C': {
  midi: 60,
  fretPosition: [-1, 3, -1, -1, -1, -1]
  },
  'C#': {
  midi: 61,
  fretPosition: [-1, 4, -1, -1, -1, -1]
  },
  'D': {
  midi: 62,
  fretPosition: [-1, 5, -1, -1, -1, -1]
  },
  'D#': {
  midi: 63,
  fretPosition: [-1, 6, -1, -1, -1, -1]
  },
  'E': {
  midi: 64,
  fretPosition: [-1, 7, -1, -1, -1, -1]
  },
  'F': {
  midi: 65,
  fretPosition: [-1, 8, -1, -1, -1, -1]
  },
  'F#': {
  midi: 66,
  fretPosition: [-1, 9, -1, -1, -1, -1]
  },
  'G': {
  midi: 67,
  fretPosition: [-1, 10, -1, -1, -1, -1]
  },
  'G#': {
  midi: 68,
  fretPosition: [-1, 11, -1, -1, -1, -1]
  },
  'A': {
  midi: 69,
  fretPosition: [-1, 12, -1, -1, -1, -1]
  },
  'A#': {
  midi: 70,
  fretPosition: [-1, 13, -1, -1, -1, -1]
  },
  'B': {
  midi: 71,
  fretPosition: [-1, 14, -1, -1, -1, -1]
  },
  'C2': {
    midi: 72,
    fretPosition: [-1, 15, -1, -1, -1, -1]
    }
  };


const ArpeggioPlayer = () => {
  const [mode, setMode] = useState('ionian');
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteName, setNoteName] = useState('');
  const [rootNote, setRootNote] = useState(60)
  const [fretPosition, setFretPosition] = useState([-1, 3, -1, -1, -1, -1])
  const strings = useMemo(() => [0, 1, 2, 2, 0, -1], [])
  const { play, strum } = useSound({ fretting: strings, tuning: standard })

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

      console.log(rootNote, current, note)
      setFretPosition(noteNames[Object.keys(noteNames).find(key => noteNames[key].midi === note)].fretPosition)

      setNoteName(Object.keys(noteNames).find(key => noteNames[key].midi === note))    
      oscillator = context.createOscillator();
      oscillator.frequency.value = 440 * Math.pow(2, (note - 69) / 12);
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
      
      current++;
      
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
      <Guitar id ="Guitar"strings={fretPosition} onPlay={play} />
      <h1>{noteName}</h1>
    </div>
  );
};
export default ArpeggioPlayer;
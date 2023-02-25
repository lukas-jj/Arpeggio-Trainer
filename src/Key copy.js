import React, { useState, useEffect } from 'react';
const AudioContext = window.AudioContext || window.webkitAudioContext;

export const modes = {
  'ionian': [0, 2, 4, 5, 7, 9, 11, 12],
  'dorian': [0, 2, 3, 5, 7, 9, 10, 12],
  'phrygian': [0, 1, 3, 5, 7, 8, 10, 12],
  'lydian': [0, 2, 4, 6, 7, 9, 11, 12],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10, 12],
  'aeolian': [0, 2, 3, 5, 7, 8, 10, 12],
  'locrian': [0, 1, 3, 5, 6, 8, 10, 12],
};

export const noteNamesA = {
  'A': {

    midi: 57,
    fretPosition: [-1, -1, -1, -1, 0, -1]
    },
  'A#': {

    midi: 58,
    fretPosition: [-1, -1, -1, -1, 1, -1]
    },
  'B': {

    midi: 59,
    fretPosition: [-1, -1, -1, -1, 2, -1]
    },
  'C': {

  midi: 60,
  fretPosition: [-1, -1, -1, -1, 3, -1]
  },
  'C#': {

  midi: 61,
  fretPosition: [-1, -1, -1, -1, 4, -1]
  },
  'D': {
  midi: 62,
  fretPosition: [-1, -1, -1, -1, 5, -1]
  },
  'D#': {
  string: A,
  midi: 63,
  fretPosition: [-1, -1, -1, -1, 6, -1]
  },
  'E': {    
  string: A,
  midi: 64,
  fretPosition: [-1, -1, -1, -1, 7, -1]
  },
  'F': {
  string: A,
  midi: 65,
  fretPosition: [-1, -1, -1, -1, 8, -1]
  },
  'F#': {
  string: A,
  midi: 66,
  fretPosition: [-1, -1, -1, -1, 9, -1]
  },
  'G': {
  string: A,
  midi: 67,
  fretPosition: [-1, -1, -1, -1, 10, -1]
  },
  'G#': {
  string: A,
  midi: 68,
  fretPosition: [-1, -1, -1, -1, 11, -1]
  },
  'A2': {

    midi: 69,
    fretPosition: [-1, -1, -1, -1, 12, -1]
    },
  };

  export const noteNamesB = {
    'A': {
      string: B,
      midi: 57,
      fretPosition: [-1, -1, -1, -1, 0, -1]
      },
    'A#': {
      string: B,
      midi: 58,
      fretPosition: [-1, -1, -1, -1, 1, -1]
      },
    'B': {
      string: B,
      midi: 59,
      fretPosition: [-1, -1, -1, -1, 2, -1]
      },
    'C': {
      string: B,
    midi: 60,
    fretPosition: [-1, -1, -1, -1, 3, -1]
    },
    'C#': {
      string: B,
    midi: 61,
    fretPosition: [-1, -1, -1, -1, 4, -1]
    },
    'D': {
    midi: 62,
    fretPosition: [-1, -1, -1, -1, 5, -1]
    },
    'D#': {
    string: B,
    midi: 63,
    fretPosition: [-1, -1, -1, -1, 6, -1]
    },
    'E': {    
    string: B,
    midi: 64,
    fretPosition: [-1, -1, -1, -1, 7, -1]
    },
    'F': {
    string: B,
    midi: 65,
    fretPosition: [-1, -1, -1, -1, 8, -1]
    },
    'F#': {
    string: B,
    midi: 66,
    fretPosition: [-1, -1, -1, -1, 9, -1]
    },
    'G': {
    string: B,
    midi: 67,
    fretPosition: [-1, -1, -1, -1, 10, -1]
    },
    'G#': {
    string: B,
    midi: 68,
    fretPosition: [-1, -1, -1, -1, 11, -1]
    },
    'A2': {
      string: B,
      midi: 69,
      fretPosition: [-1, -1, -1, -1, 12, -1]
      },
    };


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
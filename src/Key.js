import React, { useState, useEffect, useMemo } from 'react';
import Guitar from 'react-guitar'
import { standard } from 'react-guitar-tunings'
import useSound from 'react-guitar-sound'
import {modes, noteNamesA} from './MusicData.js';
const AudioContext = window.AudioContext || window.webkitAudioContext;

console.log(modes)


const ArpeggioPlayer = () => {

  const [mode, setMode] = useState('ionian');
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteName, setNoteName] = useState('');
  const [rootNote, setRootNote] = useState(57)
  const [fretPosition, setFretPosition] = useState([-1, -1, -1, -1, -1, -1])
  const strings = useMemo(() => [-1, -1, -1, -1, -1, -1], [])
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
    let note = rootNote + scale[current];

      if (note > 69) {
        note = note - 12;
      }

      setFretPosition(noteNamesA[Object.keys(noteNamesA).find(key => noteNamesA[key].midi === note)].fretPosition)
      setNoteName(Object.keys(noteNamesA).find(key => noteNamesA[key].midi === note))    

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

      <select value={noteNamesA[rootNote]} onChange={e => setRootNote(noteNamesA[e.target.value].midi)}>
        {Object.keys(noteNamesA).map(note => (
          <option key={note} value={note}>Note: {note}</option>
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
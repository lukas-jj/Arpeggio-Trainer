import React, { useState, useEffect, useMemo } from "react";
import Guitar from "react-guitar";
import { standard } from "react-guitar-tunings";
import useSound from "react-guitar-sound";
import { modes, noteNamesA, noteNamesB, emptyFretboard, fretBoardLength, totalFrets } from "./musicData.js";
const AudioContext = window.AudioContext || window.webkitAudioContext;

console.log(totalFrets);


const ArpeggioPlayer = () => {
  const [mode, setMode] = useState("ionian");
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [rootNote, setRootNote] = useState(57);
  const [fretPosition, setFretPosition] = useState(emptyFretboard);
  const strings = useMemo(() => emptyFretboard, []);
  const [fretboardAmount, setFretboardAmount] = useState(fretBoardLength);
  const [isLooping, setIsLooping] = useState(false);
  const { play, strum } = useSound({
    fretting: strings,
    tuning: standard,
  })

  const keyNames = Object.keys(modes).map((m) => (
    <option key={m} value={m}>
      {m}
    </option>
  ));
  

  function getMidiValueByFretPosition(num) {
    // iterate through the noteNames object
    for (let note in noteNamesA) {
      // if the note's fretPosition is equal to the number passed in, return the midi value
      // needs to refactor to use string number
      if (noteNamesA[note].fretPosition[4] === + num) return noteNamesA[note].midi;
    }
    // if no match is found, return null
    return null;
  }

  useEffect(() => {
    if (!isPlaying) return;
    const context = new AudioContext();
    const scale = modes[mode];

    let current = 0;
    let oscillator = null;
    const play = () => {
      let note = rootNote + scale[current];
      let topMidi = getMidiValueByFretPosition(fretboardAmount);
      console.log(topMidi, note, "topMidi, note")
      if (note > topMidi) {
        note = note - 12;
      }

      setFretPosition(x => x = noteNamesA[Object.keys(noteNamesA).find((key) => noteNamesA[key].midi === note)].fretPosition);

      setNoteName(
        Object.keys(noteNamesA).find((key) => noteNamesA[key].midi === note)
      );

      oscillator = context.createOscillator();
      oscillator.frequency.value = 440 * Math.pow(2, (note - 69) / 12);
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);

      current++;

if (current < scale.length) {
  oscillator.addEventListener("ended", play);
} else {
  // Play the octave note before stopping
  if (isLooping) {
    current = 0;
    oscillator.addEventListener("ended", play);
  } else {
    setIsPlaying(false);
  }
}    };
    // Guitar.onPlay(noteName, fretPosition, fretboardAmount, play)
    play();

    return () => {
      oscillator.removeEventListener("ended", play);
      oscillator = null;
      context.close();
    };
  }, [mode, isPlaying]);

  return (

    <div>
      <label for="fretboard-amount">Fretboard Amount:</label>
      <select id="fretboard-amount" onChange={(e) => setFretboardAmount(e.target.value)} >
        {totalFrets.map((fret) => ((fret > 12) ? <option value={fret}>{fret}</option> : null))}
      </select>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        {keyNames}
      </select>
      <select
        value={noteNamesA[rootNote]}
        onChange={(e) => setRootNote(noteNamesA[e.target.value].midi)}
      >
        {Object.keys(noteNamesA).map((note) => (
          <option key={note} value={note}>
            Note: {note}
          </option>
        ))}
      </select>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Start"}
      </button><button onClick={() => setIsLooping(!isLooping)}>
  {isLooping ? "Disable Loop" : "Enable Loop"}
</button>

      <Guitar className="Guitar" strings={fretPosition} onPlay={play} />
      <h1>{}</h1>
      <h2>Note: {noteName}</h2>
     <h2>String: {fretPosition[4]}</h2>
    </div>
  );
};
export default ArpeggioPlayer;

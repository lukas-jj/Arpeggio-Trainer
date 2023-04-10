// Parent Component
// Fretboard setup
export const emptyFretboard = [-1, -1, -1, -1, -1, -1]

export const fretBoardLength = 22;

export const totalFrets = Array.from(Array(fretBoardLength).keys());

// Notes
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
    midi: 63,
    fretPosition: [-1, -1, -1, -1, 6, -1]
  },
  'E': {
    midi: 64,
    fretPosition: [-1, -1, -1, -1, 7, -1]
  },
  'F': {
    midi: 65,
    fretPosition: [-1, -1, -1, -1, 8, -1]
  },
  'F#': {
    midi: 66,
    fretPosition: [-1, -1, -1, -1, 9, -1]
  },
  'G': {
    midi: 67,
    fretPosition: [-1, -1, -1, -1, 10, -1]
  },
  'G#': {
    midi: 68,
    fretPosition: [-1, -1, -1, -1, 11, -1]
  },
  'A(octave)': {
    midi: 69,
    fretPosition: [-1, -1, -1, -1, 12, -1]
  },
  'A#(octave)': {
    midi: 70,
    fretPosition: [-1, -1, -1, -1, 13, -1]
  },
  'B(octave)': {
    midi: 71,
    fretPosition: [-1, -1, -1, -1, 14, -1]
  },
  'C(octave)': {
    midi: 72,
    fretPosition: [-1, -1, -1, -1, 15, -1]
  },
  'C#(octave)': {
    midi: 73,
    fretPosition: [-1, -1, -1, -1, 16, -1]
  },
  'D(octave)': {
    midi: 74,
    fretPosition: [-1, -1, -1, -1, 17, -1]
  },
  'D#(octave)': {
    midi: 75,
    fretPosition: [-1, -1, -1, -1, 18, -1]
  },
  'E(octave)': {
    midi: 76,
    fretPosition: [-1, -1, -1, -1, 19, -1]
  },
  'F(octave)': {
    midi: 77,
    fretPosition: [-1, -1, -1, -1, 20, -1]
  },
  'F#(octave)': {
    midi: 78,
    fretPosition: [-1, -1, -1, -1, 21, -1]
  },
  'G(octave)': {
    midi: 79,
    fretPosition: [-1, -1, -1, -1, 22, -1]
  }
};

const noteNamesB = {
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
    midi: 63,
    fretPosition: [-1, -1, -1, -1, 6, -1]
  },
  'E': {
    midi: 64,
    fretPosition: [-1, -1, -1, -1, 7, -1]
  },
  'F': {
    midi: 65,
    fretPosition: [-1, -1, -1, -1, 8, -1]
  },
  'F#': {
    midi: 66,
    fretPosition: [-1, -1, -1, -1, 9, -1]
  },
  'G': {
    midi: 67,
    fretPosition: [-1, -1, -1, -1, 10, -1]
  },
  'G#': {
    midi: 68,
    fretPosition: [-1, -1, -1, -1, 11, -1]
  },
  'A(octave)': {
    midi: 69,
    fretPosition: [-1, -1, -1, -1, 12, -1]
  },
  'B(octave)': {
midi: 70,
fretPosition: [-1, -1, -1, -1, 13, -1]
  },
  'C(octave)': {
midi: 71,
fretPosition: [-1, -1, -1, -1, 14, -1]
  },
  'C#(octave)': {
midi: 72,
fretPosition: [-1, -1, -1, -1, 15, -1]
  },
  'D(octave)': {
midi: 73,
fretPosition: [-1, -1, -1, -1, 16, -1]
  },
  'D#(octave)': {
midi: 74,
fretPosition: [-1, -1, -1, -1, 17, -1]
  },
  'E(octave)': {
midi: 75,
fretPosition: [-1, -1, -1, -1, 18, -1]
  },
  'F(octave)': {
midi: 76,
fretPosition: [-1, -1, -1, -1, 19, -1]
  },
  'F#(octave)': {
midi: 77,
fretPosition: [-1, -1, -1, -1, 20, -1]
  },
  'G(octave)': {
midi: 78,
fretPosition: [-1, -1, -1, -1, 21, -1]
  },
  'G#(octave)': {
midi: 79,
fretPosition: [-1, -1, -1, -1, 22, -1]
  }
};

//Theory
export const modes = {
  'ionian': [0, 2, 4, 5, 7, 9, 11, 12],
  'dorian': [0, 2, 3, 5, 7, 9, 10, 12],
  'phrygian': [0, 1, 3, 5, 7, 8, 10, 12],
  'lydian': [0, 2, 4, 6, 7, 9, 11, 12],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10, 12],
  'aeolian': [0, 2, 3, 5, 7, 8, 10, 12],
  'locrian': [0, 1, 3, 5, 6, 8, 10, 12],
};


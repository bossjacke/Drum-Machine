import React, { useState, useEffect } from 'react';
import './App.css';

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const [isPowerOn, setIsPowerOn] = useState(false);

  const drumPads = [
    { key: 'Q', id: 'Heater-1', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
    { key: 'W', id: 'Heater-2', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
    { key: 'E', id: 'Heater-3', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
    { key: 'A', id: 'Heater-4', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
    { key: 'S', id: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
    { key: 'D', id: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
    { key: 'Z', id: "Kick-n'-Hat", src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
    { key: 'X', id: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
    { key: 'C', id: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
  ];

  const playSound = (key, id) => {
    if (!isPowerOn) return;
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(id);
    }
  };

  const handlePadClick = (key, id) => {
    playSound(key, id);
  };

  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
    if (!isPowerOn) {
      setDisplay('POWER ON');
    } else {
      setDisplay('POWER OFF');
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const pad = drumPads.find(p => p.key === key);
      if (pad) {
        playSound(pad.key, pad.id);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <button 
        className={`power-button ${isPowerOn ? 'on' : ''}`}
        onClick={togglePower}
      >
        {isPowerOn ? 'ON' : 'OFF'}
      </button>
      <div id="display">{display}</div>
      <div className={`drum-pads ${!isPowerOn ? 'disabled' : ''}`}>
        {drumPads.map((pad) => (
          <div
            key={pad.key}
            className={`drum-pad ${!isPowerOn ? 'disabled' : ''}`}
            id={pad.id}
            onClick={() => handlePadClick(pad.key, pad.id)}
          >
            {pad.key}
            <audio
              className="clip"
              id={pad.key}
              src={pad.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <DrumMachine />
    </div>
  );
}

export default App;

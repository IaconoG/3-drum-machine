import './App.css';
import React, { useEffect, useState, useRef } from 'react';

function App() {
  const sounds = [
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',    
    'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  ];
  const nameSounds = ['Heater 1', 'Heater 2', 'Heater 3', 'Heater 4', 'Clap', 'Open HH', 'Kick n Hat', 'Kick', 'Closed HH']
  const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

  const [display, setDisplay] = useState('Sound');
  const [audio, setAudio] = useState('');
  const padsContainer = useRef();
  const [rangeValue, setRangeValue] = useState(0.5);


  const handleKeyDown = (e) => {
    const pads = padsContainer.current.children;
    const pad = Array.from(pads).find(pad => pad.id === e.key.toUpperCase());
    if (pad) {
      setDisplay(pad.dataset.sonido);
      setAudio(pad.children[0]);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = rangeValue;
    audio.play();
    setAudio('');
  }, [audio]);

  const handleClickPad = (e) => {
    setDisplay(e.target.dataset.sonido);
    setAudio(e.target.children[0]);
  }
  const handleRangeChange = (e) => {
    setRangeValue(e.target.value / 100)
  };


  return (
    <div id="drum-machine">
      <div className='pads-container' ref={padsContainer}>
        {sounds.map((sound, i) => {
          return (
            <div key={i} id={keys[i]} data-sonido={nameSounds[i]} className='drum-pads' onClick={handleClickPad}>
              <audio key={i} className='clip'>
                <source src={sound} typeof='audio/mp3'/>
              </audio>
              {keys[i]}
            </div>
          )
        })}
      </div>
      <div id="display"> 
        <span>{display}</span>
        <div className="volume">
          <input type="range" min="0" max="100" onChange={handleRangeChange} />
          <p>{(rangeValue * 100).toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}

export default App;

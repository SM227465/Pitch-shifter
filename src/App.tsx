import { Container } from '@mantine/core';
import Controls from './components/Controls';
import OfflineFile from './components/OfflineFile';
import OnlineFile from './components/OnlineFile';
import { useState } from 'react';

function App() {
  const [pitchValue, setPitchValue] = useState(0);
  const [semitone, setSemitone] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShifter, setIsShifter] = useState(false);

  function handlePlayPause() {
    setIsPlaying((state: boolean) => !state);
  }

  return (
    <Container>
      <OnlineFile />
      <OfflineFile isPlaying={isPlaying} handlePlayPause={handlePlayPause} isShifter={isShifter} />
      <Controls
        pitchValue={pitchValue}
        setPitchValue={setPitchValue}
        semitone={semitone}
        setSemitone={setSemitone}
        isPlaying={isPlaying}
        setIsShifter={setIsShifter}
      />
    </Container>
  );
}

export default App;

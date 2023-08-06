import { Container } from '@mantine/core';
import Controls from './components/Controls';
import OfflineFile from './components/OfflineFile';
import OnlineFile from './components/OnlineFile';
import { useState } from 'react';

function App() {
  const [pitchValue, setPitchValue] = useState(0);
  const [semitone, setSemitone] = useState(0);

  return (
    <Container>
      <OnlineFile />
      <OfflineFile />
      <Controls
        pitchValue={pitchValue}
        setPitchValue={setPitchValue}
        semitone={semitone}
        setSemitone={setSemitone}
      />
    </Container>
  );
}

export default App;

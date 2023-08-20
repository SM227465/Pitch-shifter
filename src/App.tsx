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
  const [progress, setProgress] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [endTime, setEndTime] = useState(0);
  const [fileName, setFileName] = useState<string>('');
  // const [audioDuration, setAudioDuration] = useState({
  //   currentTime: '0',
  //   endTime: 0,
  //   formattedDuration: '0',
  // });

  function handlePlayPause() {
    setIsPlaying((state: boolean) => !state);
  }

  return (
    <Container>
      <OnlineFile setFileName={setFileName} setIsShifter={setIsShifter} />
      <OfflineFile
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        isShifter={isShifter}
        currentTime={currentTime}
        progress={progress}
        setProgress={setProgress}
        setSeekTime={setSeekTime}
        duration={duration}
        endTime={endTime}
        setFileName={setFileName}
        fileName={fileName}
      />
      <Controls
        pitchValue={pitchValue}
        setPitchValue={setPitchValue}
        semitone={semitone}
        setSemitone={setSemitone}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setIsShifter={setIsShifter}
        setCurrentTime={setCurrentTime}
        setProgress={setProgress}
        seekTime={seekTime}
        setDuration={setDuration}
        setEndTime={setEndTime}
      />
    </Container>
  );
}

export default App;

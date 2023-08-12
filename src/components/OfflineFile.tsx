import { Box, Button, FileInput, Flex, Slider, Text, rem } from '@mantine/core';
import { useState } from 'react';
import { connectSoundtouch } from './Controls';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';

interface Props {
  isPlaying: boolean;
  handlePlayPause: () => void;
  isShifter: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  setSeekTime: (seekTime: number) => void;
  currentTime: string;
  duration: string;
  endTime: number;
}

const OfflineFile = (props: Props) => {
  const {
    isPlaying,
    handlePlayPause,
    isShifter,
    currentTime,
    progress,
    setProgress,
    duration,
    endTime,
  } = props;
  const [value] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleFileChange(event: File | null) {
    if (!event) {
      return;
    }

    setFileName(event.name);
    const buffer = await event?.arrayBuffer();

    if (!buffer) {
      return;
    }

    connectSoundtouch(buffer);
  }

  function handleAudioSeek(event: number) {
    console.log(event);
    // const pct = Number(((event / audioDuration.endTime) * 100).toFixed(2));
    // console.log('PCT', pct);
    // setSeekTime(pct);
  }

  return (
    <Box mt={20} bg='#f7e9e9' style={{ borderRadius: '21px' }}>
      <Flex p={20} direction='column' align='center' gap={20}>
        <Text fw={600} variant='gradient' gradient={{ from: 'orange', to: 'red' }} fz={20}>
          {fileName || 'File name'}
        </Text>
        <Flex w='100%' align='center'>
          <Text w={50}>{currentTime}</Text>

          <Slider
            // labelAlwaysOn
            w='100%'
            radius='xl'
            color='pink'
            min={0}
            max={endTime}
            value={progress}
            onChangeEnd={(event) => handleAudioSeek(event)}
            // label={(value) => `${value} °C`}
            onChange={(value) => setProgress(value)}
          />
          <Text ta='right' w={50}>
            {duration}
          </Text>
        </Flex>
        <Flex gap={10}>
          {fileName && (
            <Button
              disabled={!isShifter}
              loading={!isShifter}
              radius='xl'
              leftIcon={
                isPlaying ? <IconPlayerPause size={rem(15)} /> : <IconPlayerPlay size={rem(15)} />
              }
              onClick={handlePlayPause}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          )}
          {!fileName && (
            <FileInput
              disabled={Boolean(fileName)}
              placeholder='Pick file'
              radius='xl'
              accept='.mp3,.wav'
              value={value}
              onChange={(event) => handleFileChange(event)}
            />
          )}
          {fileName && (
            <Button radius='xl' onClick={() => setFileName(null)}>
              Clear
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default OfflineFile;

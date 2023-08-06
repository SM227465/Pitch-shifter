import { Box, Button, FileInput, Flex, Slider, Text, rem } from '@mantine/core';
import { useState } from 'react';
import { connectSoundtouch } from './Controls';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';

interface Props {
  isPlaying: boolean;
  handlePlayPause: () => void;
  isShifter: boolean;
}

const OfflineFile = (props: Props) => {
  const { isPlaying, handlePlayPause, isShifter } = props;
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

  return (
    <Box mt={20} bg='#f7e9e9' style={{ borderRadius: '21px' }}>
      <Flex p={20} direction='column' align='center' gap={20}>
        <Text fw={600} variant='gradient' gradient={{ from: 'orange', to: 'red' }} fz={20}>
          {fileName || 'File name'}
        </Text>
        <Slider labelAlwaysOn w='100%' radius='xl' color='pink' defaultValue={60} />
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

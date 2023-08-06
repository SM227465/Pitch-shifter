import { Box, Button, FileInput, Flex, Slider, Text } from '@mantine/core';
import { useState } from 'react';
import { connectSoundtouch } from './Controls';

const OfflineFile = () => {
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
          <FileInput
            disabled={Boolean(fileName)}
            placeholder='Pick file'
            radius='xl'
            accept='.mp3,.wav'
            value={value}
            onChange={(event) => handleFileChange(event)}
          />
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

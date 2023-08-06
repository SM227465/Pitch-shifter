import { Box, Flex, Group, Slider, Text } from '@mantine/core';
import { useEffect } from 'react';
import { setPitchTranspose } from '../utils';

// @ts-ignore
import { PitchShifter } from 'soundtouchjs';

let audioCtx: AudioContext;
let shifter: any;

export async function connectSoundtouch(buffer: ArrayBuffer) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  const gainNode = audioCtx.createGain();

  if (shifter) {
    shifter.off();
  }

  const audioBuffer = await audioCtx.decodeAudioData(buffer);
  shifter = new PitchShifter(audioCtx, audioBuffer, 16384);
  shifter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
}

interface Props {
  pitchValue: number;
  setPitchValue: (pitchValue: number) => void;
  semitone: number;
  setSemitone: (semitone: number) => void;
}

const Controls = (props: Props) => {
  const { pitchValue, setPitchValue, semitone, setSemitone } = props;

  useEffect(() => {
    if (shifter) {
      const calculatedPitch = setPitchTranspose(semitone, pitchValue);
      shifter.pitch = calculatedPitch;
    }
    [shifter, pitchValue, semitone];
  });

  return (
    <Box bg='#f7e9e9' mt={20} style={{ borderRadius: '21px' }} p={20}>
      <Flex direction={'column'} gap={20}>
        <Flex direction='column' gap={10}>
          <Group position='center' spacing={3}>
            <Text fw={600}>Pitch :</Text>
            <Text>{pitchValue.toFixed(2)}</Text>
          </Group>
          <Flex gap={10} align='center' justify='space-between'>
            <Text w={50}>-1</Text>
            <Slider
              w='100%'
              radius='xl'
              color='pink'
              defaultValue={0}
              min={-1}
              max={1}
              step={0.01}
              onChange={(event) => setPitchValue(event)}
            />
            <Text ta='right' w={50}>
              1
            </Text>
          </Flex>
        </Flex>
        <Flex direction='column' gap={10}>
          <Group position='center' spacing={3}>
            <Text fw={600}>Semitone :</Text>
            <Text>{semitone}</Text>
          </Group>
          <Flex gap={10} align='center' justify='space-between'>
            <Text w={50}>-12</Text>
            <Slider
              w='100%'
              radius='xl'
              color='pink'
              defaultValue={0}
              min={-12}
              max={12}
              step={1}
              onChange={(event) => setSemitone(event)}
            />
            <Text ta='right' w={50}>
              12
            </Text>
          </Flex>
        </Flex>
        <Flex direction='column' gap={10}>
          <Group position='center' spacing={3}>
            <Text fw={600}>Speed :</Text>
            <Text>5:00</Text>
          </Group>
          <Flex gap={10} align='center' justify='space-between'>
            <Text w={50}>-2</Text>
            <Slider w='100%' radius='xl' color='pink' defaultValue={60} />
            <Text ta='right' w={50}>
              2
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Controls;

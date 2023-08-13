import { Box, Flex, Group, Slider, Text } from '@mantine/core';
import { useEffect } from 'react';
import { setPitchTranspose } from '../utils';

// @ts-ignore
import { PitchShifter } from 'soundtouchjs';

let audioCtx: AudioContext;
let shifter: any;
let gainNode: GainNode;
let audioBuffer: AudioBuffer;

export async function connectSoundtouch(buffer: ArrayBuffer) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  if (!gainNode) {
    gainNode = audioCtx.createGain();
  }

  if (shifter) {
    shifter.off();
  }

  audioBuffer = await audioCtx.decodeAudioData(buffer);
  shifter = new PitchShifter(audioCtx, audioBuffer, 16384);
}

interface Props {
  pitchValue: number;
  setPitchValue: (pitchValue: number) => void;
  semitone: number;
  setSemitone: (semitone: number) => void;
  isPlaying: boolean;
  setIsShifter: (shifter: boolean) => void;
  setProgress: (progress: number) => void;
  seekTime: number;
  setCurrentTime: (time: string) => void;
  setDuration: (time: string) => void;
  setEndTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const Controls = (props: Props) => {
  const {
    pitchValue,
    setPitchValue,
    semitone,
    setSemitone,
    isPlaying,
    setIsPlaying,
    setIsShifter,
    setCurrentTime,
    setProgress,
    seekTime,
    setDuration,
    setEndTime,
  } = props;

  function checkingForBuffer() {
    let flag: boolean = false;

    const intervalInstance = setInterval(() => {
      if (flag) {
        clearInterval(intervalInstance);
      }

      if (audioBuffer) {
        setIsShifter(true);
        setDuration(shifter.formattedDuration);
        setEndTime(shifter.duration);

        flag = true;

        shifter.on('play', (event: any) => {
          setProgress(event.timePlayed);
          setCurrentTime(event.formattedTimePlayed);

          if (event.percentagePlayed === 100) {
            shifter.percentagePlayed = 0;
            setIsPlaying(false);
            setCurrentTime('0:00');
            setProgress(0);
          }
        });
      }
    }, 1_000);
  }

  useEffect(() => {
    checkingForBuffer();
  }, []);

  // TODO: have to fix audio seek issue
  useEffect(() => {
    // if (shifter) {
    //   console.log(shifter);
    //   console.log(seekTime);
    //   shifter.percentagePlayed = seekTime;
    // }
  }, [seekTime]);

  useEffect(() => {
    if (shifter) {
      const calculatedPitch = setPitchTranspose(semitone, pitchValue);
      shifter.pitch = calculatedPitch;
    }
  }, [pitchValue, semitone]);

  useEffect(() => {
    if (!shifter) {
      return;
    }

    if (isPlaying) {
      shifter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      audioCtx.resume();
    } else {
      shifter.disconnect();
    }
  }, [isPlaying]);

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
              disabled={!shifter}
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
              disabled={!shifter}
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
            <Slider disabled={!shifter} w='100%' radius='xl' color='pink' defaultValue={60} />
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

import { Button, Flex, Input } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { connectSoundtouch } from './Controls';

interface Props {
  setFileName: (fileName: string) => void;
  setIsShifter: (shifter: boolean) => void;
}
const OnlineFile = (props: Props) => {
  const { setFileName, setIsShifter } = props;
  const [videoId, setVideoId] = useState('');
  const [allowToProcess, setAllowToProcess] = useState(false);
  const [processing, setProcessing] = useState(false);

  function findVideoId(event: ChangeEvent<HTMLInputElement>) {
    const videoId = event.target.value.split('=')[1];

    if (videoId) {
      setVideoId(videoId);
      setAllowToProcess(true);
    } else {
      setAllowToProcess(false);
    }
  }

  async function getBuffer() {
    getFileInfo();
    setProcessing(true);
    const baseUrl = 'https://youtube-video-to-audiobuffer.onrender.com/';
    const res = await fetch(`${baseUrl}api/v1/yt/${videoId}`);

    const buffer = await res.arrayBuffer();
    setProcessing(false);
    if (buffer) {
      connectSoundtouch(buffer);
      setIsShifter(true);
    }
  }

  async function getFileInfo() {
    const res = await fetch(
      `https://youtube-video-to-audio-link.onrender.com/api/v1/info/${videoId}`
    );
    const data = await res.json();
    if (data.success) {
      setFileName(data.details.title);
    }
  }
  return (
    <Flex p={4} mt={10} gap={5} bg={'#f7e9e9'} style={{ borderRadius: '21px' }}>
      <Input
        ml={5}
        placeholder='Paste link here'
        variant='unstyled'
        w={'100%'}
        onChange={(event) => findVideoId(event)}
      />
      <Button
        disabled={!allowToProcess}
        radius={'xl'}
        loading={processing}
        loaderPosition='right'
        variant='gradient'
        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
        onClick={getBuffer}
      >
        {processing ? 'Processing' : 'Process'}
      </Button>
    </Flex>
  );
};

export default OnlineFile;

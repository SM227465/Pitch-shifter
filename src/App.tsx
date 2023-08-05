import { Box, Button, Container, FileInput, Flex, Group, Input, Slider, Text } from '@mantine/core';
import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState<File | null>(null);

  return (
    <>
      <Container>
        <Flex p={4} mt={10} gap={5} bg={'#f7e9e9'} style={{ borderRadius: '21px' }}>
          <Input ml={5} placeholder='Paste link here' variant='unstyled' w={'100%'} />
          <Button
            radius={'xl'}
            loading={false}
            loaderPosition='right'
            variant='gradient'
            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
          >
            Process
          </Button>
        </Flex>
        <Box mt={20} bg='#f7e9e9' style={{ borderRadius: '21px' }}>
          <Flex p={20} direction='column' align='center' gap={20}>
            <Text fw={600} variant='gradient' gradient={{ from: 'orange', to: 'red' }} fz={20}>
              Title
            </Text>
            <Slider labelAlwaysOn w='100%' radius='xl' color='pink' defaultValue={60} />
            <FileInput
              placeholder='Pick file'
              radius='xl'
              accept='.mp3,.wav'
              value={value}
              onChange={setValue}
            />
            {/* <Button onClick={() => setValue(null)}>Clear</Button> */}
          </Flex>
        </Box>

        {/* Controls */}
        <Box bg='#f7e9e9' mt={20} style={{ borderRadius: '21px' }} p={20}>
          <Flex direction={'column'} gap={20}>
            <Flex direction='column' gap={10}>
              <Group position='center' spacing={3}>
                <Text fw={600}>Pitch :</Text>
                <Text>5:00</Text>
              </Group>
              <Flex gap={10} align='center' justify='space-between'>
                <Text w={50}>-1</Text>
                <Slider w='100%' radius='xl' color='pink' defaultValue={60} />
                <Text ta='right' w={50}>
                  1
                </Text>
              </Flex>
            </Flex>
            <Flex direction='column' gap={10}>
              <Group position='center' spacing={3}>
                <Text fw={600}>Semitone :</Text>
                <Text>5:00</Text>
              </Group>
              <Flex gap={10} align='center' justify='space-between'>
                <Text w={50}>-12</Text>
                <Slider w='100%' radius='xl' color='pink' defaultValue={60} />
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
      </Container>
      {/* <TextInput placeholder='paste link' rightSection/>
      <FileInput /> */}
    </>
  );
}

export default App;

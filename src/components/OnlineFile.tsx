import { Button, Flex, Input } from '@mantine/core';

const OnlineFile = () => {
  return (
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
  );
};

export default OnlineFile;

import { Center, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Center mt={12}>
      <Spinner color="purple.400" size="xl" thickness="3px" label="loading" />
    </Center>
  );
};

export default Loader;

import {
  Box,
  Flex,
  Input,
  Button,
  FormLabel,
  FormControl,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  LinkBox,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { auth } from '../lib/mutations';
import NextImage from 'next/image';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import NextLink from 'next/link';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;
    if (mode === 'signup' && (!firstName || !lastName)) return;

    setIsLoading(true);
    // returns user
    await auth(mode, { email, password, firstName, lastName });
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Box h="full" w="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        h="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>

      <Flex justify="center" align="center" py="10%">
        <Flex
          direction="column"
          gap={6}
          p="50px"
          bg="gray.900"
          borderRadius="lg"
          w={{ base: '90%', md: '60%' }}
        >
          <Heading>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Heading>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap={2} w="full">
              {mode === 'signup' && (
                <>
                  <FormControl id="firstname" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First Name"
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl id="lastname" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </>
              )}
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    cursor="pointer"
                    children={
                      showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                    }
                    onClick={() => setShowPassword((value) => !value)}
                  />
                </InputGroup>
              </FormControl>

              <Button
                mt={2}
                type="submit"
                bg="green.500"
                isLoading={isLoading}
                _hover={{
                  bg: 'green.300',
                }}
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </Button>
            </Flex>
          </form>
          <Box textAlign="center">
            <Box mb="2" fontWeight="semibold">
              OR
            </Box>
            <LinkBox color="green.400" textDecoration="underline">
              <Link
                as={NextLink}
                href={mode === 'signin' ? '/signup' : '/signin'}
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </Link>
            </LinkBox>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

AuthForm.propTypes = {};

export default AuthForm;

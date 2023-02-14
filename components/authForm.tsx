import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import NextLink from 'next/link';
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
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { auth } from '../lib/mutations';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;
    if (mode === 'signup' && (!firstName || !lastName)) return;

    setIsLoading(true);
    try {
      const response = await auth(mode, {
        email,
        password,
        firstName,
        lastName,
      });
      if (response.error) {
        throw new Error(response.error);
      } else {
        router.push('/user');
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5 * 1000,
        variant: 'top-accent',
        position: 'top-left',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        h="15vh"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" alt="logo" height={60} width={120} />
      </Flex>

      <Flex minH="85vh" justify="center" align="center" py="10%">
        <Flex
          direction="column"
          gap={6}
          p="50px"
          bg="gray.900"
          borderRadius="lg"
          w={{ base: '90%', md: '60%', lg: '40%' }}
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
                  <InputRightElement>
                    <IconButton
                      aria-label="Show/Hide Password button"
                      size="sm"
                      onClick={() => setShowPassword((value) => !value)}
                      bg="transparent"
                      _hover={{
                        bg: 'transparent',
                        transform: 'scale(1.1)',
                      }}
                      icon={
                        showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                      }
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                mt={2}
                type="submit"
                bg="purple.500"
                isLoading={isLoading}
                _hover={{
                  bg: 'purple.600',
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
            <LinkBox
              color="purple.400"
              fontWeight="semibold"
              textDecoration="underline"
            >
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

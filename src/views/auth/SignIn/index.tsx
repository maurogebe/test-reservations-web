import { injectReducer } from "../../../store";
import reducer from "./store";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  Text,
  FormLabel,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Icon
} from "@chakra-ui/react";
import useAuth from "../../../utils/hooks/useAuth";
import { signInImage } from "../../../assets/images";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useConfig } from "../../../utils/hooks/useConfig";
import { FaGoogle } from "react-icons/fa";

injectReducer('signin', reducer)

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const SignIn = () => {

  const { signIn, signInWithGoogle } = useAuth();
  const textColor = useColorModeValue("gray.400", "white");
  const { themeColor, primaryColorLevel } = useConfig()

	const color = themeColor
	const colorLevel = primaryColorLevel
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // signIn(data)
  }

  const onSubmitWithGoogle = () => {
    signInWithGoogle()
  }

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={`${color}.${colorLevel}`} fontSize='32px' mb='10px'>
              Bienvenido
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Ingresa tu correo y contraseña para iniciar sesión.
            </Text>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb='24px' isInvalid={!!errors.email}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Correo
                </FormLabel>
                <Input
                  id='email'
                  borderRadius='15px'
                  fontSize='sm'
                  type='text'
                  size='lg'
                  {...register('email')}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb='24px' isInvalid={!!errors.password}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Contraseña
                </FormLabel>
                <InputGroup>
                  <Input
                    id='password'
                    borderRadius='15px'
                    fontSize='sm'
                    type={showPassword ? 'text' : 'password'}
                    size='lg'
                    {...register('password')}
                  />
                  <InputRightElement height='100%' alignItems='center'>
                    { 
                      showPassword ? (
                        <ViewOffIcon color='teal.300' cursor='pointer' onClick={() => setShowPassword(false)} />
                      ) : (
                        <ViewIcon color='teal.300' cursor='pointer' onClick={() => setShowPassword(true)} />
                      ) 
                    }
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
                <Button
                  fontSize='16px'
                  type='submit'
                  bg='teal.300'
                  w='100%'
                  h='45'
                  mb='20px'
                  color='white'
                  mt='20px'
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}>
                  Iniciar sesión
                </Button>
            </Box>
          </Flex>
          <Flex direction='column' alignItems='center' gap={4}>
            <Text>Inicia con:</Text>
            <Icon as={FaGoogle} cursor='pointer' onClick={onSubmitWithGoogle} />
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignIn;

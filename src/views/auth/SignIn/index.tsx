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
  useColorModeValue
} from "@chakra-ui/react";
// import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../../utils/hooks/useAuth";
import { signInImage } from "../../../assets/images";

// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

injectReducer('signin', reducer)

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignIn = () => {

  const { signIn } = useAuth();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  
  // const [showPassword, setShowPassword] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit = (data: any) => {
    signIn(data)
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
            <Heading color={titleColor} fontSize='32px' mb='10px'>
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
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Correo
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                size='lg'
                {...register('email')}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Contraseña
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                size='lg'
                {...register('password')}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
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
            </FormControl>
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

import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../../../components/shared/Button/Button";
import { createReservation } from "../store/dataSlice";
import { Modal } from "../../../components/shared/Modal/Modal";
import { RootState } from "../../../store";

export const FormReservation = ({ onOpen, onClose, isOpen }: any) => {
  
	const dispatch = useDispatch();

	const { queries } = useSelector((state: RootState) => state.dashboard.data)
	const { roomSelected } = useSelector((state: RootState) => state.dashboard.state)
  
  const schema = Yup.object().shape({
		firstName: Yup.string().required('Ingresa tu nombre'),
		lastName: Yup.string().required('Ingresa tus apellidos'),
		email: Yup.string().email().required('Ingresa tu correo')
	})
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onOpenFn = () => {
    reset({ firstName: '', lastName: '', email: '' });
    onOpen();
  }

  const onSubmit = async(data: any) => {
    await dispatch(createReservation({ startDate: queries.startDate, endDate: queries.endDate, customer: data, room: roomSelected }))
    onClose();
  }

  return (
    <Modal
      onOpen={onOpenFn}
      onClose={onClose}
      isOpen={isOpen}
      title='Reservación'
      content={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' gap={4}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Nombres</FormLabel>
              <Input {...register('firstName')}/>
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Apellidos</FormLabel>
              <Input {...register('lastName')}/>
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={!!errors.email}>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Correo</FormLabel>
              <Input {...register('email')}/>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mx='auto'>
              <Button type='submit'>
                Confirmar reservación
              </Button>
            </FormControl>
          </Flex>
        </form>
      }
    />
  )
}
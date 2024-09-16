import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../../../components/shared/Button/Button";
import { updateReservation } from "../store/dataSlice";
import { Modal } from "../../../components/shared/Modal/Modal";
import { RootState } from "../../../store";
import { useEffect } from "react";

export const FormReservation = ({ onOpen, onClose, isOpen }: any) => {
  
	const dispatch = useDispatch();

	const { reservationSelected } = useSelector((state: RootState) => state.reservation.state)
  
  const schema = Yup.object().shape({
		firstName: Yup.string().required('Ingresa tu nombre'),
		lastName: Yup.string().required('Ingresa tus apellidos'),
		email: Yup.string().email().required('Ingresa tu correo'),
		startDate: Yup.date().required('Modifica la fecha de ingreso'),
		endDate: Yup.date().required('Modifica la fecha de salida'),
	})
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const { customer, startDate, endDate } = reservationSelected;
    reset({ firstName: customer.firstName, lastName: customer.lastName, email: customer.email, startDate, endDate })
  }, [reservationSelected])

  const onSubmit = async(data: any) => {
    await dispatch(updateReservation({ id: reservationSelected.id, data: { ...data, customer: { firstName: data.firstName, lastName: data.lastName, email: data.email } } }))
    onClose();
  }

  return (
    <Modal
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      title='Reservación'
      content={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' gap={4}>

            <FormControl isInvalid={!!errors.startDate}>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Entrada</FormLabel>
              <Input type='date' {...register('startDate')}/>
              <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={!!errors.endDate}>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Salida</FormLabel>
              <Input type='date' {...register('endDate')}/>
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>

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
                Actualizar reservación
              </Button>
            </FormControl>
          </Flex>
        </form>
      }
    />
  )
}
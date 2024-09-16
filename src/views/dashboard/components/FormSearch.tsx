import { useState } from "react";
import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../../../components/shared/Button/Button";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { City } from "../../../interfaces/city.interface";
import { getRooms } from "../store/dataSlice";

export const FormSearch = () => {
  
	const dispatch = useDispatch();
   
	const { cities, loading } = useSelector((state: RootState) => state.dashboard.data)

  const [selectedCityName, setSelectedCityName] = useState('');
  
  const schema = Yup.object().shape({
		cityId: Yup.string().required('Selecciona la ciudad'),
		startDate: Yup.date().required('Ingresa la fecha de inicio'),
		endDate: Yup.date().required('Ingresa la fecha de termino'),
		capacity: Yup.number().required('Ingresa las personas')
	})
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleChangeCity = (value: string) => {
    const citySplit = value?.split('::');
    setSelectedCityName(citySplit[0]);
    setValue('cityId', citySplit[1]);
  }

  const onSubmit = async(data: any) => {
    dispatch(getRooms({ ...data, startDate: data.startDate.toISOString(), endDate: data.endDate.toISOString() }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justifyContent='center' gap={4}>
        <FormControl isInvalid={!!errors.cityId}>
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Ciudad</FormLabel>
          <AutoComplete 
            openOnFocus 
            onChange={(value) => handleChangeCity(value)} 
            value={selectedCityName}
          >
            <AutoCompleteInput variant="filled"/>
            <AutoCompleteList>
              {
                cities?.map((city: City, index: number) => (
                  <AutoCompleteItem
                    key={`option-city-${index}`}
                    value={`${city.name} - ${city?.state?.name}::${city.id}`}
                    textTransform="capitalize"
                  >
                    {city.name} - {city?.state?.name}
                  </AutoCompleteItem>
                ))
              }
            </AutoCompleteList>
          </AutoComplete>
          <FormErrorMessage>{errors.cityId?.message}</FormErrorMessage>
        </FormControl>
        
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
        
        <FormControl w={20} isInvalid={!!errors.capacity}>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Personas</FormLabel>
          <Input w={20} type="number" textAlign='center' {...register('capacity')}/>
          <FormErrorMessage>{errors.capacity?.message}</FormErrorMessage>
        </FormControl>

        <FormControl display='flex' alignItems='flex-end'>
          <Button isLoading={loading} type='submit'>
            Buscar
          </Button>
        </FormControl>
      </Flex>
    </form>
  )
}
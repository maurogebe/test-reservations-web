import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect } from "react"

export const FormAllergy = ({ reset, register, errors }: any) => {

	const { allergySelected } = useSelector((state: RootState) => state.allergy.state)

  useEffect(() => {
    if (allergySelected?.id > 0 && allergySelected?.id !== null) {
      reset(allergySelected);
    }
  }, [allergySelected, reset]);

  return (
    <form>
      <Flex direction="column" gap='1rem'>
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input {...register('name')}/>
          <FormErrorMessage>{errors?.name && errors?.name.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Descripción</FormLabel>
          <Textarea {...register('description')}/>
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>
      </Flex>
    </form>
  )
}
import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect } from "react"

export const FormMedicament = ({ reset, register, errors }: any) => {

	const { medicamentSelected } = useSelector((state: RootState) => state.medicament.state)

  useEffect(() => {
    if (medicamentSelected?.id > 0 && medicamentSelected?.id !== null) {
      reset(medicamentSelected);
    }
  }, [medicamentSelected, reset]);

  return (
    <form>
      <Flex justifyContent="space-between" wrap='wrap' gap='1rem'>
        <Flex w='50%' flex='1 1' direction="column">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input {...register('name')}/>
            <FormErrorMessage>{errors?.name && errors?.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Forma</FormLabel>
            <Select {...register('form')}>
              <option hidden></option>
              <option value='Gotas'>Gotas</option>
              <option value='Pastillas'>Pastillas</option>
            </Select>
            <FormErrorMessage>{errors.form && errors.form.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex w='50%' flex='1 1' direction="column">
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <Input type="number" {...register('stock')}/>
            <FormErrorMessage>{errors.stock && errors.stock.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Cost</FormLabel>
            <Input type="number" {...register('cost')}/>
            <FormErrorMessage>{errors.cost && errors.cost.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex flex='1 1 100%'>
          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Textarea {...register('description')}/>
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
}
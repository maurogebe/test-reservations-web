import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect } from "react"
import { getAllergies } from "../../allergy/store/dataSlice"
import { Allergy } from "../../../interfaces/allergy.interface"
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";

export const FormPatient = ({ reset, register, errors, selectedAllergies, setSelectedAllergies }: any) => {

	const dispatch = useDispatch()
	const { patientSelected } = useSelector((state: RootState) => state.patient.state)
	const { allergies } = useSelector((state: RootState) => state.allergy.data)

  useEffect(() => {
		dispatch(getAllergies())
  }, [])

  useEffect(() => {
    if (patientSelected?.id > 0 && patientSelected?.id !== null) {
      reset(patientSelected);
    }
  }, [patientSelected, reset]);

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
            <FormLabel>Correo</FormLabel>
            <Input type="email" {...register('email')}/>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex w='50%' flex='1 1' direction="column">
          <FormControl>
            <FormLabel>Numero de seguro</FormLabel>
            <Input {...register('healthInsuranceNumber')}/>
            <FormErrorMessage>{errors.healthInsuranceNumber && errors.healthInsuranceNumber.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input type="date" {...register('birthDate')}/>
            <FormErrorMessage>{errors.birthDate && errors.birthDate.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex flex='1 1 100%'>
          <FormControl mt={4}>
            <FormLabel>Alergias</FormLabel>
            <AutoComplete openOnFocus multiple onChange={vals => setSelectedAllergies(vals)}>
              <AutoCompleteInput variant="filled">
                {({ tags }) =>
                  tags.map((tag, tid) => (
                    <AutoCompleteTag
                      key={tid}
                      label={tag.label.split('::')[0]}
                      onRemove={tag.onRemove}
                    />
                  ))
                }
              </AutoCompleteInput>
              <AutoCompleteList>
                {
                  allergies?.filter((allergy: Allergy) => !selectedAllergies.includes(`${allergy.name}::${allergy.id}`))
                  ?.map((allergy: Allergy, index: number) => (
                    <AutoCompleteItem
                      key={`option-${index}-${allergy.id}`}
                      value={`${allergy.name}::${allergy.id}`}
                      textTransform="capitalize"
                      _selected={{ bg: "whiteAlpha.50", display: "none" }}
                      _focus={{ bg: "whiteAlpha.100" }}
                    >
                      {allergy.name}
                    </AutoCompleteItem>
                  ))
                }
              </AutoCompleteList>
            </AutoComplete>
            {/* <MultiSelect
              onChange={() => {}}
              selectedListProps={{
                maxH: 150,
                overflow: "auto"
              }}
              label="Choose or create items"
              options={allergies.map((e: Allergy) => ({ label: e?.name ?? '', value: e.id }))}
              // {...register('allergies')}
            /> */}
            {/* <Select {...register('allergies')}>
              <option hidden></option>
              { allergies.map((e: Allergy) => <option value={e.id}>{ e.name }</option>) }
            </Select> */}
            <FormErrorMessage>{errors.allergies && errors.allergies.message}</FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
}
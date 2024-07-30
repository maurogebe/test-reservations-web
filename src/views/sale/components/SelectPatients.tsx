import { Box, Card, CardBody, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect, useState } from "react"
import { initialState, setSelectedPatient } from "../store/stateSlice"
import { Patient } from "../../../interfaces/patient.interface"

export const SelectPatients = () => {

	const dispatch = useDispatch()

	const { patients } = useSelector((state: RootState) => state.patient.data)
	const { selectedPatient } = useSelector((state: RootState) => state.sale.state)

  const [search, setSearch] = useState<string>('');

  useEffect(() => {

    return () => {
      dispatch(setSelectedPatient(initialState.selectedPatient))
    }
  }, [])

  const handleSearchChange = async (value: string) => {
    setSearch(value);
  };

  const handleSelect = (value: string) => {
    const [_, id] = value.split('::');
    const patientById = patients.find((pat: Patient) => pat?.id == parseInt(id))
    if(patientById) dispatch(setSelectedPatient(patientById));
    setSearch('');
  };

  return (
    <Box>
      <Text fontSize="20px" fontWeight="bold" mb={2}>Selecciona el paciente:</Text>
      <Flex w="100%" direction="column" zIndex={999} gap={4}>
        <AutoComplete onChange={handleSelect}>
          <AutoCompleteInput
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Escribe para buscar..."
          />
            <AutoCompleteList>
              {
                patients
                  ?.filter((patient: Patient) => !(selectedPatient?.id == patient.id))
                  ?.map((patient: Patient, index: number) => (
                    <AutoCompleteItem
                      key={`patient-${index}-${patient.id}`}
                      value={`${patient.name}::${patient.id}`}
                      textTransform="capitalize"
                      _selected={{ bg: "whiteAlpha.50" }}
                      _focus={{ bg: "whiteAlpha.100" }}
                      _hover={{ bg: "teal.300" }}
                    >
                      {patient.name}
                    </AutoCompleteItem>
                  ))
              }
            </AutoCompleteList>
        </AutoComplete>
        {
          selectedPatient?.id && (
            <Card border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden" bg="white">
              <CardBody>
                <Stack spacing={3}>
                  <Heading size="md">{selectedPatient.name}</Heading>
                  <Text fontSize="lg" color="gray.600"><strong>Correo:</strong> {selectedPatient.email}</Text>
                  <Text fontSize="lg" color="gray.600"><strong>Número de Seguridad Médica:</strong> {selectedPatient.healthInsuranceNumber}</Text>
                  <Text fontSize="lg" color="gray.600"><strong>Año de Nacimiento:</strong> {selectedPatient?.birthDate}</Text>
                </Stack>
              </CardBody>
            </Card>
          )
        }
      </Flex>
    </Box>
  )
}
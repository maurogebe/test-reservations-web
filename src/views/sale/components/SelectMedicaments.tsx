import { Box, Flex, Text } from "@chakra-ui/react"
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { Medicament } from "../../../interfaces/medicament.interface"
import { useEffect, useState } from "react"
import { setSelectedMedicaments } from "../store/stateSlice"
import { emptyMedicaments, getMedicaments } from "../../medicament/store/dataSlice"
import { MedicamentSold } from "../../../interfaces/medicament-sold.interface"

export const SelectMedicaments = () => {

	const dispatch = useDispatch()

	const { medicaments } = useSelector((state: RootState) => state.medicament.data)
	const { selectedMedicaments } = useSelector((state: RootState) => state.sale.state)

  const [search, setSearch] = useState<string>('');

  useEffect(() => {

    return () => {
      dispatch(setSelectedMedicaments([]))
    }
  }, [])

  const handleSearchChange = async (value: string) => {
    setSearch(value);
  };

  const handleSelect = (value: string) => {
    const [_, id] = value.split('::');
    const medicamentById = medicaments.find((pat: Medicament) => pat?.id == parseInt(id))
    dispatch(setSelectedMedicaments([...selectedMedicaments, { quantity: 1, medicament: medicamentById }]));
    setSearch('');
  };

  return (
    <Box zIndex={999}>
      <Text fontSize="20px" fontWeight="bold" mb={2}>Selecciona los medicamentos:</Text>
      <Flex>
        <AutoComplete onChange={handleSelect}>
          <AutoCompleteInput
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Escribe para buscar..."
          />
            <AutoCompleteList>
              {
                medicaments
                  ?.filter((medicament: Medicament) => !selectedMedicaments.some((e: MedicamentSold) => e.medicament.id == medicament.id))
                  ?.map((medicament: Medicament, index: number) => (
                    <AutoCompleteItem
                      key={`medicament-${index}-${medicament.id}`}
                      value={`${medicament.name}::${medicament.id}`}
                      textTransform="capitalize"
                      _selected={{ bg: "whiteAlpha.50" }}
                      _focus={{ bg: "whiteAlpha.100" }}
                      _hover={{ bg: "teal.300" }}
                    >
                      {medicament.name}
                    </AutoCompleteItem>
                  ))
              }
            </AutoCompleteList>
        </AutoComplete>
      </Flex>
    </Box>
  )
}
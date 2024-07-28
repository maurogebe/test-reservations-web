import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { setMedicamentSelected } from "../store/stateSlice"
import { useDispatch } from "react-redux"
import { FormMedicament } from "./FormMedicament";
import { Modal } from "../../../components/shared/Modal/Modal";

export const TableRow = ({ reset, register, errors, handleSubmit = () => {}, textColor, medicament }: any) => {

  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setMedicamentSelected(medicament))
  }

  const onSubmit = () => {
    // await dispatch(createMedicament(data));
  }

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          {medicament?.name}
        </Text>
      </Td>
      
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          {medicament?.description}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {medicament?.stock}
        </Text>
      </Td>
      <Td>
        <Modal
          title="Editar Medicamento"
          content={<FormMedicament reset={reset} register={register} errors={errors} />}
          textBtn="Editar"
          onClick={handleSubmit(onSubmit)}
          button={
            <Button p="0px" bg="transparent" variant="no-hover">
              <Text
                fontSize="md"
                color="gray.400"
                fontWeight="bold"
                cursor="pointer"
                onClick={onEdit}
              >
                Editar
              </Text>
            </Button>
          }
        />
      </Td>
    </Tr>
  )
}
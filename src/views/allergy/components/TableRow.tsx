import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { setAllergySelected } from "../store/stateSlice"
import { useDispatch } from "react-redux"
import { FormAllergy } from "./FormAllergy";
import { Modal } from "../../../components/shared/Modal/Modal";
import { updateAllergy } from "../store/dataSlice";

export const TableRow = ({ reset, register, errors, handleSubmit = () => {}, textColor, row }: any) => {

  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setAllergySelected(row))
  }

  const onSubmit = async(data: any) => {
    await dispatch(updateAllergy(data));
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
          {row?.name}
        </Text>
      </Td>
      
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          {row?.description}
        </Text>
      </Td>

      <Td>
        <Modal
          title="Editar Alergia"
          content={<FormAllergy reset={reset} register={register} errors={errors} />}
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
import { Table, Tbody, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TableRow } from "./TableRow";

export const TableMedicament = ({ reset, register, errors, handleSubmit }: any) => {
  
  const columns = ["Nombre", "Descripción", "Stock", ""]
  
  const textColor = useColorModeValue("gray.700", "white");

	const { medicaments } = useSelector((state: RootState) => state.medicament.data)

  return (
    <Table w="100%" variant='simple' color={textColor}>
      <Thead>
        <Tr my='.8rem' pl='0px' color='gray.400'>
          {columns.map((column: any, idx: any) => {
            return (
              <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : "initial"}>
                {column}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {medicaments?.map((row: any) => {
          return (
            <TableRow
              key={`${row.id}-${row.name}`}
              reset={reset}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              medicament={row}
            />
          );
        })}
      </Tbody>
    </Table>
  )
}
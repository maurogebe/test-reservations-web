import { Table, Tbody, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { TableRow } from "./TableRow";
import { Link } from "react-router-dom";

export const TableBidding = ({ reset, register, errors, handleSubmit, tableData }: any) => {
  
  const columns = ["Estado", "Nombre", "Fecha de inicio", "Fecha de cierre", "Presupuesto gastado", ""]
  
  const textColor = useColorModeValue("gray.700", "white");

	const { biddings } = useSelector((state: RootState) => state.biddingList.data)

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
        {biddings?.map((row: any) => {
          return (
            <Link to={`/bidding/${row.id}`}>
              <TableRow
                key={`${row.id}-${row.name}`}
                reset={reset}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                row={row}
              />
            </Link>
          );
        })}
      </Tbody>
    </Table>
  )
}
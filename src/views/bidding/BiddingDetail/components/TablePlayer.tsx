import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import DataTable from "../../../../components/shared/DataTable/DataTable";
import { cloneDeep } from "lodash";
import { setTableData } from "../store/dataSlice";
import { NumericFormat } from "react-number-format";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import Badge from "../../../../components/shared/Badge/Badge";

export const TablePlayers = ({ onRowClick }: any) => {
  
  const dispatch = useDispatch();

	const { players, loading, tableData } = useSelector((state: RootState) => state.biddingDetail.data)

  const columns = useMemo(() => [
		{
			Header: 'Estado puja',
			accessor: 'bid.active',
			Cell: (props: any) => {
				const row = props.row.original
				return (
					<Text
            fontSize="sm"
            color={row?.bid?.active ? 'green.500' : row?.bid?.active === false ? 'red.500' : 'gray.500'}
            minWidth="100%"
            fontWeight='bold'
            display='flex'
            alignItems='center'
            gap={2}
          >
            <Badge
              color={row?.bid?.active ? 'green.500' : row?.bid?.active === false ? 'red.500' : 'gray.500'}
            />
            { row?.bid?.active ? 'Ganando' : row?.bid?.active === false ? 'Superado' : 'Sin puja' }
          </Text>
				)
			},
		},
		{
			Header: 'Posicion',
			accessor: 'position',
      sortable: true,
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Text
            fontSize="sm"
          >
            { row?.position?.label } ({ row?.position?.shortLabel })
          </Text>
        )
			},
		},
		{
			Header: 'Nombre',
			accessor: 'names',
      sortable: true,
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Flex alignItems='center' gap={2}>
            <Avatar src={row?.avatarUrl}/>
            <Text
              fontSize="sm"
            >
              {row.firstName} {row.lastName}
            </Text>
          </Flex>
        )
			},
		},
		{
			Header: 'Nacionalidad',
			accessor: 'nationality',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Flex alignItems='center' gap={2}>
            <Avatar src={row?.nationality?.imageUrl}/>
            <Text
              fontSize="sm"
            >
              {row?.nationality?.label}
            </Text>
          </Flex>
        )
			},
		},
		{
			Header: 'Club',
			accessor: 'club',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Flex alignItems='center' gap={2}>
            <Avatar src={row?.club?.imageUrl}/>
            <Text
              fontSize="sm"
            >
              {row?.club?.label}
            </Text>
          </Flex>
        )
			},
		},
		{
			Header: 'Puntaje',
			accessor: 'overallRating',
			Cell: (props: any) => {
				const row = props.row.original
				return (
					<Text fontSize="sm" fontWeight="bold">
            {row?.overallRating}
          </Text>
				)
			},
		},
		{
			Header: 'Max Puja',
			accessor: 'maxAmount',
			Cell: (props: any) => {
				const row = props.row.original
				const nameSplit = row?.bidActive?.user?.name.split(' ');
				return (
          <Flex alignItems='center' gap={2}>
            <Avatar src={row?.bidActive?.user?.avatar}/>
            <Flex direction='column'>
              <Text fontSize="sm" fontWeight='bold'>
                {nameSplit?.length > 0 && nameSplit[0][0].toLocaleUpperCase()}{nameSplit?.length > 1 && nameSplit[1][0].toLocaleUpperCase()}
              </Text>
              <Text fontSize="sm">
                <NumericFormat
                  displayType="text"
                  value={row?.bidActive?.amount || 0}
                  prefix="$"
                  thousandSeparator
                />
              </Text>
            </Flex>
          </Flex>
				)
			},
		}
	], [])
  
	const onPaginationChange = (page: any) => {
		dispatch(setTableData({ ...tableData, pageIndex: page }))
	}

	const onSelectChange = (value: any) => {
		const newTableData = cloneDeep(tableData)
		newTableData.pageSize = Number(value)
		newTableData.pageIndex = 1
		dispatch(setTableData(newTableData))
	}

	const onSort = (sort: any, sortingColumn: any) => {
		const newTableData = cloneDeep(tableData)
		newTableData.sort = sort
		dispatch(setTableData(newTableData))
		// dispatch(setSortedColumn(sortingColumn))
	}

  return (
    <DataTable
			columns={columns}
			data={players}
			onRowClick={onRowClick}
			skeletonAvatarColumns={[0]}
			skeletonAvatarProps={{ className: 'rounded-md' }}
			loading={loading}
			pagingData={tableData}
			pageSizes={[10, 20, 50, 100]}
			onPaginationChange={onPaginationChange}
			onSelectChange={onSelectChange}
			onSort={onSort}
			pagination={true}
		/>
  )
}
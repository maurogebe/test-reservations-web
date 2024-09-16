import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button as ButtonChakra, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { RootState } from "../../../store";
import DataTable from "../../../components/shared/DataTable/DataTable";
import Card from "../../../components/shared/Card/Card";
import CardBody from "../../../components/shared/Card/CardBody";
import { NumericFormat } from "react-number-format";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { deleteReservation } from "../store/dataSlice";
import { Modal } from "../../../components/shared/Modal/Modal";
import { Button } from "../../../components/shared/Button/Button";
import { setReservationSelected } from "../store/stateSlice";
import { Reservation } from "../../../interfaces/reservation.interface";

export const ReservationTable = ({ onOpenEdit }: any) => {

	const dispatch = useDispatch();

	const { reservations, loading } = useSelector((state: RootState) => state.reservation.data)
	const { reservationSelected } = useSelector((state: RootState) => state.reservation.state)
  const { themeColor } = useSelector((state: RootState) => state.theme.state);
	
  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = useMemo(() => [
		{
			Header: 'Hotel',
			accessor: 'hotel',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Text
            fontSize="sm"
          >
            { row.room.hotel.name }
          </Text>
        )
			},
		},
		{
			Header: 'Numero de habitación',
			accessor: 'number',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Text
            fontSize="sm"
          >
            { row.room.number }
          </Text>
        )
			},
		},
		{
			Header: 'Ubicación',
			accessor: 'city',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Text
            fontSize="sm"
          >
            {  row.room.hotel.city.name }, { row.room.hotel.city.state.country.name }
          </Text>
        )
			},
		},
		{
			Header: 'Precio',
			accessor: 'price',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <NumericFormat
            displayType="text"
            value={row.room.price}
            prefix=" $"
            thousandSeparator
          />
        )
			},
		},
		{
			Header: 'Cliente',
			accessor: 'customer',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Text
            fontSize="sm"
          >
            { row.customer.firstName } { row.customer.lastName }
          </Text>
        )
			},
		},
		{
			accessor: 'actions',
			Cell: (props: any) => {
				const row = props.row.original
				return (
          <Flex gap={4}>
            <EditIcon color='green' cursor='pointer' onClick={() => onEdit(row)}/>
            <DeleteIcon color='red' cursor='pointer' onClick={() => showDeleteConfirmation(row)}/>
          </Flex>
        )
			},
		}
	], [])

	const onEdit = (reservation: Reservation) => {
		dispatch(setReservationSelected(reservation));
		onOpenEdit();
	}

	const showDeleteConfirmation = (reservation: Reservation) => {
		dispatch(setReservationSelected(reservation));
		onOpen();
	}

	const onDelete = async() => {
		await dispatch(deleteReservation(reservationSelected.id))
		onClose();
	}

	const onCloseFn = () => {
		dispatch(setReservationSelected(null))
		onClose();
	}

  return (
    <>
			<DataTable
				columns={columns}
				data={reservations}
				skeletonAvatarColumns={[0]}
				skeletonAvatarProps={{ className: 'rounded-md' }}
				loading={loading}
			/>
			<Modal
				onOpen={onOpen}
				onClose={onClose}
				isOpen={isOpen}
				title='Confirmación'
				content={'Esta seguro que quiere eliminar?'}
				actions={
					<Flex gap={4}>
						<ButtonChakra onClick={onCloseFn}>Cancelar</ButtonChakra>
						<Button onClick={onDelete}>Confirmar</Button>
					</Flex>
				}
			/>
		</>
  )
}
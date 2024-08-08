import PropTypes from 'prop-types'
import Table from '../../ui/Table/Table'
import Skeleton from '../../ui/Skeleton/Skeleton'

const { Tr, Td, TBody } = Table

const TableRowSkeleton = (props: any) => {

	const { columns = 1, rows = 10, avatarInColumns = [], avatarProps } = props

	return (
		<TBody>
			{
				Array.from(new Array(rows), (_,i) => i+0).map(row => (
					<Tr key={`row-${row}`}>
						{Array.from(new Array(columns), (_,i) => i+0).map(col => (
							<Td key={`col-${col}`}>
								<div className="flex flex-auto items-center gap-2">
									{avatarInColumns.includes(col) && (
										<div>
											<Skeleton
												variant="circle" 
												{...avatarProps} 
											/>
										</div>
									)}
									<Skeleton />
								</div>
							</Td>
						))}
					</Tr>
				))
			}
		</TBody>
	)
}

TableRowSkeleton.propTypes = {
	columns: PropTypes.number,
	rows: PropTypes.number, 
	avatarInColumns: PropTypes.arrayOf(PropTypes.number),
	avatarProps: PropTypes.any
}


export default TableRowSkeleton
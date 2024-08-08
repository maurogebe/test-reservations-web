import PropTypes from 'prop-types'
import Skeleton from '../../ui/Skeleton/Skeleton'

const TextBlockSkeleton = (props: any) => {

	const { 
		height, 
		lastChildWidth = '60%', 
		rowCount = 3, 
		title = true, 
		titleWidth = '40%'
	} = props

	return (
		<div className="flex flex-col gap-4">
			{
				title && <Skeleton height={height} width={titleWidth} />
			}
			{Array.from(new Array(rowCount), (_,i) => i+1).map((row, index) => (
				<Skeleton key={row} height={height} width={(index === (rowCount - 1) && lastChildWidth)} />
			))}
		</div>
	)
}

TextBlockSkeleton.propTypes = {
	rowCount: PropTypes.number,
	lastChildWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	titleWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	title: PropTypes.bool,
}

export default TextBlockSkeleton
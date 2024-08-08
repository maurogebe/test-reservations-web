import { useState, useEffect, useMemo, useCallback } from 'react'
import { Box, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import Prev from './Prev'
import Pagers from './Pagers'
import Next from './Next'

const Pagination = (props: any) => {
    const { className, currentPage = 1, displayTotal = false, onChange, pageSize = 1, total = 5 } = props

    const getInternalPageCount = useMemo(() => {
        if (typeof total === 'number') {
            return Math.ceil(total / pageSize)
        }
        return null
    }, [total, pageSize])

    const onPaginationChange = (val: any) => {
        onChange(val)
    }

    const onPrev = () => {
        const newPage = currentPage - 1
        onChange(newPage)
    }

    const onNext = () => {
        const newPage = currentPage + 1
        onChange(newPage)
    }

    return (
        <Box className={className} display="flex" alignItems="center">
            {displayTotal && <Text>Total: {total}</Text>}
            <Prev
                currentPage={currentPage}
                onPrev={onPrev}
            />
            <Pagers
                onChange={onPaginationChange}
                pageCount={getInternalPageCount}
                currentPage={currentPage}
            />
            <Next
                currentPage={currentPage}
                pageCount={getInternalPageCount}
                onNext={onNext}
            />
        </Box>
    )
}

Pagination.propTypes = {
    total: PropTypes.number,
    displayTotal: PropTypes.bool,
    pageSize: PropTypes.number,
    className: PropTypes.string,
    currentPage: PropTypes.number,
    onChange: PropTypes.func,
}

export default Pagination

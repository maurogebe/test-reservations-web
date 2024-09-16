import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table';
import Table from '../../ui/Table/Table';
import Select from '../../ui/Select';
import Pagination from '../../ui/Pagination';
import { Box, Thead, Th, Tr, Tbody, Td, Icon, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import Loading from '../Loading/Loading';

const DataTable = (props: any) => {
  const {
    columns = [],
    data = [],
    onRowClick,
    loading = false,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes = [],
    pagingData = {
      total: 0,
      pageIndex: 1,
      pageSize: 10
    },
    pagination = false
  } = props;

  const { pageSize, pageIndex, total, sort } = pagingData;
  
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("gray.100", "gray.500");
  const bgColorHeader = useColorModeValue("gray.200", "gray.500");
  const bgColorHoverHeader = useColorModeValue("gray.300", "gray.600");

  const pageSizeOptions = useMemo(
    () => pageSizes.map((size: any) => ({ value: size, label: `${size} / page` })),
    [pageSizes]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page
  }: any = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex,
        pageSize,
        sortBy: [{ id: sort?.key, desc: sort?.order === 'desc' }]
      },
			manualPagination: true,
			manualSortBy: true,
			autoResetSelectedRows: false,
			autoResetSelectedCell: false,
			autoResetSelectedColumn: false,
    },
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handlePaginationChange = (page: any) => {
    if (!loading) {
      onPaginationChange?.(page);
    }
  };

  const handleSelectChange = (event: any) => {
    if (!loading) {
      onSelectChange?.(event.target.value);
    }
  };

  const handleSort = (column: any) => {
    if (!loading) {
      const { id, isSortedDesc } = column;
      const sortOrder = isSortedDesc ? 'desc' : 'asc';
      onSort?.({ order: sortOrder, key: id }, { id });
    }
  };

  return (
    <Loading type='cover' loading={loading}>
      <Box>
        {loading && data.length === 0 ? (
          <Skeleton
            variant="circle" 
          />
        ) : (
          <Table {...getTableProps()} variant="custom">
            <Thead>
              {headerGroups.map((headerGroup: any) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column: any) => {
                    const { getHeaderProps, render, isSortedDesc } = column;
                    const headerProps = getHeaderProps();

                    return (
                      <Th
                        {...headerProps}
                        key={`table-thead-th-${column.id}`}
                        cursor="pointer"
                        bg={bgColorHeader}
                        _hover={{ bg: bgColorHoverHeader }}
                        color={textColor}
                      >
                        {render('Header') && (
                          column.sortable ? (
                            <Box as="div" cursor="pointer">
                              {render('Header')}
                              <Box as="span" ml={2} onClick={() => handleSort(column)}>
                                {
                                  column.id === sort.key ? (
                                    <Icon as={FaSort} />
                                  ) : isSortedDesc ? <Icon as={FaSortDown} /> : <Icon as={FaSortUp} />
                                }
                              </Box>
                            </Box>
                          ) : (
                            <Box>{render('Header')}</Box>
                          )
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} onClick={() => onRowClick(row) ?? (() => {})} key={row.id} cursor={onRowClick ? 'pointer' : 'default'} _hover={{ bg: bgColor }}>
                    {row.cells.map((cell: any) => (
                      <Td {...cell.getCellProps()} key={cell.column.id} color={textColor}>
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
        {pagination && (
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
            <Pagination
              pageSize={pageSize}
              currentPage={pageIndex}
              total={total}
              onChange={handlePaginationChange}
            />
            <Box minWidth={130}>
              <Select
                size="sm"
                isSearchable={false}
                defaultValue={pageSizeOptions.find((option: any) => option.value === pageSize)}
                options={pageSizeOptions}
                onChange={(option: any) => handleSelectChange(option)}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Loading>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  loading: PropTypes.bool,
  onPaginationChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onSort: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  skeletonAvatarColumns: PropTypes.arrayOf(PropTypes.number),
  skeletonAvatarProps: PropTypes.object,
  pagingData: PropTypes.shape({
    total: PropTypes.number,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number
  }),
  pagination: PropTypes.bool
};

export default DataTable;

import { Box, Table as ChakraTable, TableProps as ChakraTableProps } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

interface TableProps extends ChakraTableProps {
  borderlessRow?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  asElement?: React.ElementType;
}

const Table: any = React.forwardRef<HTMLTableElement, TableProps>((props: any, ref) => {
  const { 
    borderlessRow = false,
    hoverable = true, 
    compact = false,
    overflow = true,
    asElement: Component = ChakraTable, 
    className,
    ...rest 
  } = props;

  const tableStyles = {
    // ...(hoverable && { _hover: { bg: 'gray.100' } }),
    ...(compact && { size: 'sm' }),
    ...(borderlessRow && { borderCollapse: 'collapse', border: 'none' }),
  };

  return (
    <Box overflowX={overflow ? 'auto' : 'visible'}>
      <Component 
        ref={ref}
        className={className}
        {...tableStyles}
        {...rest}
      >
        {props.children}
      </Component>
    </Box>
  );
});

Table.displayName = 'Table';

Table.propTypes = {
  borderlessRow: PropTypes.bool,
  hoverable: PropTypes.bool,
  compact: PropTypes.bool
};

export default Table;

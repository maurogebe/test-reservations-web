import { defineStyleConfig } from '@chakra-ui/react';

export const TableStyles = defineStyleConfig({
  variants: {
    custom: {
      table: {
        borderCollapse: 'collapse',
        borderSpacing: '0',
        width: '100%',
      },
      thead: {
        th: {
          borderBottom: '2px solid',
          borderColor: 'gray.300',
        },
      },
      tbody: {
        tr: {
          borderBottom: '1px solid',
          borderColor: 'gray.300',
          _last: {
            borderBottom: 'none',
          }
        },
      },
      tfoot: {
        // Opcional: agregar estilos para el pie de página si es necesario
      },
    },
  },
});

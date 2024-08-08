import { defineStyleConfig } from "@chakra-ui/react";

export const PaginationStyles = defineStyleConfig({
  baseStyle: (props: any) => ({
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "md",
    zIndex: 0,
  }),
  variants: {
    pager: (props: any) => ({
      cursor: "pointer",
      mx: 1,
      borderRadius: "md",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      h: 8,
      w: 8,
      fontSize: "sm",
      fontWeight: "semibold",
      userSelect: "none",
      textColor: props.isDisabled ? "gray.300" : "gray.500",
      bg: props.isDisabled ? undefined : "transparent",
      _hover: {
        bg: props.isDisabled ? undefined : "gray.50",
      },
      _dark: {
        textColor: props.isDisabled ? "gray.600" : "gray.400",
        _hover: {
          textColor: props.isDisabled ? undefined : "gray.100",
          bg: props.isDisabled ? undefined : "gray.600",
        },
      },
    }),
    total: {
      fontWeight: "semibold",
      mr: 3,
      color: "gray.500",
      _dark: {
        color: "gray.400",
      },
    },
    next: {
      mr: 1,
      _rtl: {
        transform: "rotate(180deg)",
      },
    },
    prev: {
      ml: 1,
      _rtl: {
        transform: "rotate(180deg)",
      },
    },
  },
  defaultProps: {
    variant: "pager",
  },
});

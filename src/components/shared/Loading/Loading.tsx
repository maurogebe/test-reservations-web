import { Box, Flex, Spinner as ChakraSpinner } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LoadingProps {
  loading?: boolean;
  children?: ReactNode;
  spinnerClass?: string; // Puedes eliminarlo si no es necesario
  className?: string; // Puedes eliminarlo si no es necesario
  asElement?: React.ElementType;
  customLoader?: ReactNode;
  type?: "default" | "cover";
}

const DefaultLoading = (props: LoadingProps) => {
  const { 
    loading = false,
    children, 
    spinnerClass,
    asElement: Component = Box,
    customLoader,
  } = props;

  return (
    <Component
      display={loading ? 'flex' : 'block'}
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      {loading ? (
        customLoader ? (
          customLoader
        ) : (
          <ChakraSpinner size="lg" className={spinnerClass} />
        )
      ) : (
        children
      )}
    </Component>
  );
};

const CoveredLoading = (props: LoadingProps) => {
  const {
    loading = false,
    children, 
    spinnerClass,
    asElement: Component = Box,
    customLoader,
  } = props;

  return (
    <Component position="relative">
      {children}
      {loading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="white"
          _dark={{ bg: "gray.800", bgOpacity: '0.6' }}
          opacity={0.5}
        />
      )}
      {loading && (
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={10}
          alignItems="center"
          justifyContent="center"
        >
          {customLoader ? (
            customLoader
          ) : (
            <ChakraSpinner size="lg" className={spinnerClass} />
          )}
        </Flex>
      )}
    </Component>
  );
};

const Loading = (props: LoadingProps) => {
  switch (props.type ?? 'default') {
    case 'default':
      return <DefaultLoading {...props} />;
    case 'cover':
      return <CoveredLoading {...props} />;
    default:
      return <DefaultLoading {...props} />;
  }
};

export default Loading;

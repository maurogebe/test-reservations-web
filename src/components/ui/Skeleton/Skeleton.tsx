import { Skeleton as ChakraSkeleton, SkeletonProps } from '@chakra-ui/react';
import PropTypes from 'prop-types';

interface SkeletonComponentProps extends SkeletonProps {
  asElement?: React.ElementType;
  variant?: 'circle' | 'block' | string;
}

const Skeleton = (props: SkeletonComponentProps) => {
  const {
    asElement: Component = 'span',
    variant = 'block',
    animation = true,
    height,
    width,
    ...rest
  } = props;

  return (
    <ChakraSkeleton
      as={Component}
      height={height}
      width={width}
      isLoaded={!animation}
      startColor={variant === 'circle' ? 'gray.200' : 'transparent'}
      endColor={variant === 'circle' ? 'gray.300' : 'transparent'}
      speed={animation ? 0.5 : 0}
      {...rest}
    />
  );
};

Skeleton.propTypes = {
  asElement: PropTypes.elementType,
  variant: PropTypes.oneOf(['circle', 'block']),
  animation: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Skeleton;

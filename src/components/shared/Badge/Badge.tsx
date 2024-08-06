import { Box } from '@chakra-ui/react';
import { useStyleConfig } from '@chakra-ui/system';
import { useConfig } from '../../../utils/hooks/useConfig';

const Badge = (props: any) => {
  const { variant = 'default', color, text, ...rest } = props;

  const styles = useStyleConfig("Badge", { variant });

  const { themeColor, primaryColorLevel } = useConfig()
  
	const splitedColor = color.split('.')

	const tmColor = splitedColor[0] || themeColor
	const tmColorLevel = splitedColor[1] || primaryColorLevel

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: `${tmColor}.${tmColorLevel}`,
    position: 'relative',
    fontSize: 'sm',
    // ...styles,
  };

  return (
    <Box
      __css={badgeStyles}
      {...rest}
    >
      <Box
        as="span"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="sm"
        color="white"
      >
        {text ?? ''}
      </Box>
    </Box>
  );
};

export default Badge;

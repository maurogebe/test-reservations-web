import { Spinner as ChakraSpinner, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface SpinnerProps {
    className?: string;
    color?: string;
    enableTheme?: boolean;
    size?: string | number;
    style?: React.CSSProperties;
    isSpinning?: boolean;
    [key: string]: any;
}

const Spinner = ({
    className,
    color,
    enableTheme = true,
    isSpinning = true,
    size = '20px',
    style,
    ...rest
}: SpinnerProps) => {

    const { themeColor, primaryColorLevel } = useSelector((state: RootState) => state.theme.state);

    const spinnerColor = color || `${themeColor}.${primaryColorLevel}`;

    return (
        isSpinning ? (
            <Box
                display="inline-block"
                className={className}
                style={{ ...style, height: size, width: size }}
                {...rest}
            >
                <ChakraSpinner color={spinnerColor} size='sm' />
            </Box>
        ) : null
    );
};

export default Spinner;

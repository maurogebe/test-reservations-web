import { Select as ChakraSelect } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const Select = (props: any) => {
  const { options = [], size = 'md', style, className, form, field, componentAs: Component = ChakraSelect, disabled, defaultValue = null, ...rest } = props;
  const { themeColor, primaryColorLevel } = useSelector((state: RootState) => state.theme.state);

  let isInvalid = false;

  if (!isEmpty(form)) {
    const { touched, errors } = form;
    const touchedField = get(touched, field.name);
    const errorField = get(errors, field.name);
    isInvalid = touchedField && errorField;
  }

  const getBoxShadow = (state: any) => {
    const shadowBase = '0 0 0 1px ';
    if (isInvalid) {
      return shadowBase + 'red.500';
    }
    if (state.isFocused) {
      return shadowBase + `${themeColor}.${primaryColorLevel}`;
    }
    return 'none';
  };

  return (
    <ChakraSelect
      borderRadius="md"
      boxShadow={getBoxShadow({ isFocused: false })}
      _hover={{ boxShadow: getBoxShadow({ isFocused: true }) }}
      borderColor={isInvalid ? 'red.500' : 'gray.300'}
      disabled={disabled}
      {...field}
      {...rest}
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value} disabled={option.isDisabled}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
};

export default Select;

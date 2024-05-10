import { Ionicons } from '@expo/vector-icons';
import { FormControl, Icon, Input } from 'native-base';
import React from 'react';


const InputsCustomizados = ({ placeholder, iconName, ...props }) => {
  return (
    <FormControl>
      <Input
        placeholder={placeholder}
        size='lg'
        w="100%"
        borderRadius='75px'
        borderColor='red.300'
        bgColor='black'
        color='white'
        borderWidth={3}
        focusOutlineColor='red.300'
        py={3}
        {...props}
        InputLeftElement={
          <Icon
            as={<Ionicons name={iconName} />} // quando puxado para a tela principal, será necessário adicionar o ícone
            size= "7"
            m={1}
            color="white"
            marginLeft={6}
          />
        }
      />
    </FormControl>
  );
};

export default InputsCustomizados;

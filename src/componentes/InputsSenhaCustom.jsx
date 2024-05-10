import React, { useState } from 'react'; // biblioteca para comportamento do estado do componente 
import { FormControl, Input, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons'; // biblioteca para utilizar icones 

//componente placeholder: para mensagem dentro do input; Eyeopen e closed e referente a cada icone; props é para que quando add o componente na pricipal, acrescente oq inserido
const InputsSenhaCustom = ({ placeholder, iconName, eyeIconOpen, eyeIconClosed, ...props }) => {  
  const [showPassword, setShowPassword] = useState(false); //hook para visualizar e ocultar senha

  const handleTogglePassword = () => { // função para inverter o valor quando chamada a função do open/closed
    setShowPassword(!showPassword);
  };

  return (
    //form control é a entrada da senha
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
        secureTextEntry={!showPassword}
        {...props}
        InputLeftElement={ // inclui o ícone a esquerda do elemento
          <Icon
            as={<Ionicons name={iconName} />}
            size="xl"
            m={1}
            color="white"
            marginLeft={6}
          />
        }
        InputRightElement={ // inclui o componente a direita do elemento
          <Icon
            as={<Ionicons
              name={showPassword ? eyeIconClosed : eyeIconOpen}
            />}
            size="xl"
            m={1}
            color="white"
            marginRight={6}
            onPress={handleTogglePassword}
          />
        }
      />
    </FormControl>
  );
};

export default InputsSenhaCustom;

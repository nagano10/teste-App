
import React, { useRef } from "react";
import { Input, FormControl } from "native-base";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
}

export function EntradaTexto({ label, placeholder, secureTextEntry = false }: InputProps): JSX.Element {
  const labelColor = 'white'; // altera a cor do título do input (label)
  const inputRef = useRef(null);

  const focusNextField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <FormControl marginBottom={3}>
      {label && (
        <FormControl.Label _text={{ color: labelColor, fontSize: 'md'}}>{label}</FormControl.Label>
      )}  
      <Input
        ref={inputRef}
        placeholder={placeholder}
        size='lg'
        w="100%"
        borderRadius='75px'
        borderColor='red.300'
        bgColor='black'
        color='white'
        borderWidth={2}
        focusOutlineColor='red.300'
        py={2}
        mt={1}
        returnKeyType="next"
        onSubmitEditing={focusNextField}
      />
    </FormControl>
  );
};


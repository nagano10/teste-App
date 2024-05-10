import { Button, IButtonProps } from 'native-base';
import { ReactNode } from "react";

interface ButtonProps extends IButtonProps {
  children: ReactNode;
  autoSize?: boolean;
  color?: string;
}

export function Botao({ children, autoSize = false, color, ...rest }: ButtonProps){

  return (
    <Button
          // Botão avançar segunda etapa
          w="50%"
          mt={30}
          bgColor='black'
          borderWidth={3}
          borderColor='red.300'
          borderRadius='75px'
          px={2} // Ajusta o espaçamento horizontal
          py={1} // Ajusta o espaçamento Vertical
          _text={{ fontSize: 'lg', fontWeight: '500', color: 'white' }} // ajusta font, cor e tamanho do btn
      {...rest}
    >
      {children}
    </Button>
  );
};
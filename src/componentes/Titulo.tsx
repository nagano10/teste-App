import { Text, ITextProps } from "native-base"
import { ReactNode } from "react"

interface TituloProps extends ITextProps {
  children: ReactNode
}

export function Titulo({ children, ...rest }: TituloProps){
  return (
    <Text
        fontSize="20px"
        fontWeight="light"
        color="white"
        textAlign="center"
        {...rest}
      >
        {children}
      </Text>
  )
}
import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            w="60%"
            h="12"
            mt={4}
            mb={10}
            bgColor='black'
            borderWidth={3}
            borderColor='red.300'
            borderRadius='75px'
            _pressed={{
                borderColor: '#FF0136'
            }}
            px={3} // Ajusta o espaçamento horizontal
            py={1} // Ajusta o espaçamento Vertical

            {...rest}
        >
            <Text color="white" fontSize="2xl" fontWeight={"semibold"}>
                {title}
            </Text>
        </ButtonNativeBase>
    )

}
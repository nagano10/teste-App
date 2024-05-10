import { Feather } from '@expo/vector-icons';
import { Icon, IInputProps, Input as DefaultInput, FormControl } from "native-base";

type Props = {
    icon: string;
    errorMessage?: string | null;
} & IInputProps;

function Input({ icon, errorMessage = null, isInvalid, ...rest }: Props) {
    const invalid = !!errorMessage || isInvalid

    return (
        <FormControl mb={4} isInvalid={invalid}>
        <DefaultInput
            InputLeftElement={<Icon as={Feather} name={icon} size="lg" marginLeft={4} color="white"/>}
            backgroundColor="primary.400"
            borderWidth="3"
            borderRadius='75px'
            borderColor='red.300'
            bgColor='black'
            color='white'
            focusOutlineColor='red.300'
            height="12"
            fontSize="20"
            placeholderTextColor="gray.500"
            fontWeight="light"
            isInvalid={invalid}
            _focus={{
                bgColor:'#202020'
            }}
            _invalid={{
                borderWidth: 2,
                borderColor: 'red.500'
            }}
            py={2}
            mt={1}
            {... rest}
        
        />

        <FormControl.ErrorMessage>
            {errorMessage}
        </FormControl.ErrorMessage>
        </FormControl>
    )
}

export default Input;
import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

export function InputNative({ ...rest }: IInputProps) {
    return (
        <FormControl mb={4} isInvalid>
            <NativeBaseInput
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
                {...rest}
            />
            <FormControl.ErrorMessage>

            </FormControl.ErrorMessage>
            
        </FormControl>
    )
}
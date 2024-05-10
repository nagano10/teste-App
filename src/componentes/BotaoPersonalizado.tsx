import React from 'react';
import { Button as ButtonNativeBase, Text, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


type Props = {
  title: string;
  iconName?: string;
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  fontFamily?: string;
  onPress?: () => void;
  textMarginTop?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  iconTextSpace?: number;
  iconSize?: number;
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
  textColor?: string;
};

export function Button({
  title,
  iconName,
  width = '60%',
  height = 12,
  fontSize = '2xl',
  fontFamily = 'semibold',
  onPress,
  textMarginTop = 0,
  paddingHorizontal = 3,
  paddingVertical = 1,
  iconTextSpace = 2,
  iconSize = 21,
  backgroundColor,
  textColor, 
  ...rest
}: Props) {
  return (
    <ButtonNativeBase
      flex={1}
      flexDirection="column"
      width={width}
      height={height}
      mt={2}
      mb={1}
      bgColor={backgroundColor || 'black'}
      borderWidth={2.4}
      borderColor="red.300"
      borderRadius="75px"
      _pressed={{
        borderColor: '#FF0136',
      }}
      px={paddingHorizontal}
      py={paddingVertical}
      onPress={onPress}
      {...rest}
    >
      <HStack
        space={iconTextSpace}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          color={textColor || 'white'}
          fontSize={fontSize}
          fontWeight={fontFamily}
          marginTop={textMarginTop}
          marginBottom={textMarginTop} // Adiciona margem inferior para aumentar o espaçamento entre o texto e a borda do botão
        >
          {title}
        </Text>
        {iconName && (
          <Icon as={Ionicons} name={iconName} color={textColor || 'white'} size={iconSize} />
        )}

      </HStack>
    </ButtonNativeBase>
  );
}

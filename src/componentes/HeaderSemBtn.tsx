import { Box, HStack } from 'native-base';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';

interface HeaderProps {
  title: string;
  greeting?: string;
}

export default function HeaderEmpty({ title, greeting }: HeaderProps) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const calculateFontSize = (baseSize: number) => {
    const scaleFactor = Math.min(windowWidth / 375, windowHeight / 667);
    return Math.round(baseSize * scaleFactor);
  };

  const styles = StyleSheet.create({
    title: {
      color: "white",
      fontSize: calculateFontSize(24),
      fontWeight: "bold",
    },
    userNameText: {
      color: "white",
      fontSize: calculateFontSize(18),
    },
  });

  return (
    <>
      <Box safeAreaTop bg={"black"} />
      <HStack
        bg={"black"}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
  
        borderBottomRightRadius={25}
        width="100%"
      >
        <HStack alignItems="center">
          <HStack>
            <Text style={styles.title}>
              {title}
            </Text>
          </HStack>
        </HStack>
      </HStack>
      {greeting && (
        <Box px="4" py="2" bg="black" borderBottomRightRadius={25}>
          <Text style={styles.userNameText}>{greeting}</Text>
        </Box>
      )}
    </>
  );
}

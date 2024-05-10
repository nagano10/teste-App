import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function HeaderDefault({ title }) {
  const navigation = useNavigation();

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              as={<MaterialIcons name={"arrow-back"} />}
              size="30"
              m={1}
              color="white"
              marginLeft={1}
            />
          </TouchableOpacity>
          <HStack>
            <Text style={styles.title}>
              {title}
            </Text>
          </HStack>
        </HStack>
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
});
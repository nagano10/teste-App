import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FooterImage from '../assets/Cubo.png';
import { HStack } from 'native-base';

export default function FooterSair({ logout }) {
    return (
        <HStack justifyContent="center">
            <TouchableOpacity
            onPress={logout}
            >
                <View style={styles.container}>
                    <Image
                        source={FooterImage}
                        style={{
                            width: 30,
                            height: 35,
                            marginBottom: 10,
                            resizeMode: 'cover'
                        }}
                    />
                    <Text style={styles.action}>
                        Sair
                    </Text>
                </View>
            </TouchableOpacity>
        </HStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    action: {
        fontSize: 20,
        paddingBottom: 15,
        marginLeft: 15,
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '400'
    },
});

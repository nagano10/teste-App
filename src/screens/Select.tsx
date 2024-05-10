import React from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SelectTexto from "../assets/images/LogoQuinzeSelect.png";
import SelectLogo from "../assets/images/select.png";


export function Select() {

    const topImage = Platform.OS === 'ios' ? '550%' : '500%';

    return (

        
        <SafeAreaView>
        <View style={styles.content}>

            <Text style={styles.title}>UM NOVO CONCEITO.</Text>
            <Text style={styles.title}>UMA NOVA MARCA.</Text>
            <Image
                source={SelectLogo}
                style={{
                    width: 270,
                    height: 288,
                    position: 'absolute',
                    top: '200%'
                }}>

            </Image>

            <Image
                source={SelectTexto}
                style={{
                    width: 400,
                    height: 120,
                    position: 'absolute',
                    top: topImage
                }}>

            </Image>

        </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24, 24, 24, 0.6)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        backgroundColor: "white",
        paddingTop: 24,
        paddingBottom: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginBottom: 24,
    },
    input: {
        height: 40,
        width: "90%",
        borderColor: "black",
        fontSize: 18,
        borderWidth: 2,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "white",
    },
    underTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "black",
    },
    dropdown: {
        marginTop: 10,
        marginBottom: 10,
        height: 45,
        width: "90%",
        borderBottomColor: "black",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 30,
    },
    placeholderStyle: {
        fontSize: 20,
        color: "#6A6A72",
        marginLeft: 45,
    },
    selectedTextStyle: {
        fontSize: 18,
        color: "black",
        marginLeft: 40,
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 20,
    },
    icon: {
        marginLeft: 30,
        marginRight: 10,
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 14,
        padding: 8,
    },
    buttonSave: {
        backgroundColor: "#BF183C",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 20,
    },
    buttonSaveText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
});

import React from "react";
import { Text, TextInput, View, StyleSheet, TextInputProps } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { maskCep, maskPhone } from "../utils/masks";

interface InputProps extends TextInputProps {
    mask: "cep" | "phone" | "currency" | "password" | "date";
    inputMaskChange: any;
    label?: string;
}

const Input: React.FC<InputProps> = ({ mask, inputMaskChange, label, ...rest }) => {

    function handleChange(text: string) {
        let value = text;

        if (mask === 'cep') {
            value = maskCep(text);
        } else if (mask === 'phone') {
            value = maskPhone(text);
        }

        inputMaskChange(value);
    }

    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputContent}>
                <Icon name={mask === 'cep' ? "map-marker" : "phone"} size={25} color="white" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#9E9E9E" // Cor do texto de espaço reservado
                    onChangeText={(text) => handleChange(text)}
                    {...rest}
                />
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </View>
    );

};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 355,
        borderRadius: 75,
        borderColor: '#FF214F',
        backgroundColor: 'black',
        color: 'white',
        borderWidth: 3,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 8,
        fontSize: 18,
        paddingLeft: 70, // Adicionando espaço para o ícone
        paddingRight: 20
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 8,
    },
    icon: {
        position: 'absolute',
        marginLeft: 35,
        paddingTop: 10,


        zIndex: 1, // Ajusta a sobreposição do ícone sobre o campo de entrada
    },
    placeholderText: {
        color: '#9E9E9E',
        fontSize: 18,
        fontFamily: 'Roboto'
    },
});

export default Input;

import { HStack } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import TimePickerAlt from './TimePickerAlt';

export function ModalAprova({ handleClose, userData, handleAprovar }) {
    const [planoClube, setPlanoClube] = useState(null);
    const [dataInicioPlano, setDataInicioPlano] = useState('');
    const [proximoAtendimento, setProximoAtendimento] = useState('');
    const [dataAtendimento, setDataAtendimento] = useState(null);
    const [frequencia, setFrequencia] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const data = [
        { label: 'Standart', value: 'Standart' },
        { label: 'Premium', value: 'Premium' },
        { label: 'Select', value: 'Select' }
    ];

    const data2 = [
        { label: 'Segunda-feira', value: 'Segunda-feira' },
        { label: 'Terça-feira', value: 'Terça-feira' },
        { label: 'Quarta-feira', value: 'Quarta-feira' },
        { label: 'Quinta-feira', value: 'Quinta-feira' },
        { label: 'Sexta-feira', value: 'Sexta-feira' },
        { label: 'Sábado', value: 'Sábado' },
    ];

    const data3 = [
        { label: '7 dias', value: '7 dias' },
        { label: '14 dias', value: '14 dias' },
    ];

    const handleAprovarClick = async () => {
        if (
            planoClube &&
            dataInicioPlano &&
            proximoAtendimento &&
            dataAtendimento &&
            selectedTime &&
            frequencia
        ) {
            const id = userData.id;
            handleAprovar({
                id,
                planoClube,
                dataInicioPlano,
                proximoAtendimento,
                dataAtendimento,
                selectedTime,
                frequencia,
            });
            handleClose();
        } else {
            Alert.alert('Campos em', 'Por favor, preencha todos os campos.');
        }
    };

    const handleTimeSelect = (time) => {
        const selectedHour = new Date(time).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });
        setSelectedTime(selectedHour);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Aprovação de usuário</Text>

                <Text style={styles.underTitle}>Insira o plano</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Plano"
                    value={planoClube}
                    onChange={(item) => {
                        setPlanoClube(item.value);
                    }}
                    renderLeftIcon={() => (
                        <TextInput.Icon
                            icon="content-cut"
                            size={25}
                            color="black"
                            style={styles.icon}
                        />
                    )}
                />

                <Text style={styles.underTitle}>Insira a data início do plano</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#6A6A72"
                    mode="flat"
                    outlineColor="transparent"
                    textColor="black"
                    selectionColor="black"
                    cursorColor="black"
                    activeUnderlineColor="transparent"
                    underlineColor="transparent"
                    value={dataInicioPlano}
                    onChangeText={(dataInicioPlano) => setDataInicioPlano(dataInicioPlano)}
                    left={
                        <TextInput.Icon icon="calendar-month" size={25} color="black" />
                    }
                />

                <Text style={styles.underTitle}>Insira o próximo atendimento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#6A6A72"
                    mode="flat"
                    outlineColor="transparent"
                    textColor="black"
                    selectionColor="black"
                    cursorColor="black"
                    activeUnderlineColor="transparent"
                    underlineColor="transparent"
                    value={proximoAtendimento}
                    onChangeText={(proximoAtendimento) => setProximoAtendimento(proximoAtendimento)}
                    left={
                        <TextInput.Icon icon="calendar-arrow-right" size={25} color="black" />
                    }
                />

                <Text style={styles.underTitle}>Qual dia o cliente será atendido?</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data2}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Dia da semana"
                    value={dataAtendimento}
                    onChange={(item) => {
                        setDataAtendimento(item.value);
                    }}
                    renderLeftIcon={() => (
                        <TextInput.Icon
                            icon="calendar-account"
                            size={25}
                            color="black"
                            style={styles.icon}
                        />
                    )}
                />

                <Text style={styles.underTitle}>Qual horário?</Text>
                <HStack p={2}>
                    <TimePickerAlt onTimeSelect={handleTimeSelect} />
                </HStack>

                <Text style={styles.underTitle}>Qual a frequência?</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data3}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Frequência"
                    value={frequencia}
                    onChange={(item) => {
                        setFrequencia(item.value);
                    }}
                    renderLeftIcon={() => (
                        <TextInput.Icon
                            icon="calendar-week-begin"
                            size={25}
                            color="black"
                            style={styles.icon}
                        />
                    )}
                />

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonSave]}
                        onPress={() => handleAprovarClick()}
                    >
                        <Text style={styles.buttonSaveText}>Aprovar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        width: "85%",
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

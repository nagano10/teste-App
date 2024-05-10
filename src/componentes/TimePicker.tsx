import { AntDesign } from '@expo/vector-icons';
import { HStack, Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimePicker = ({ onTimeSelect }) => {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        setSelectedTime(time);
        onTimeSelect(time);
        hideTimePicker();
    };

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={showTimePicker}>
                <HStack style={styles.hstack}>
                    <Icon
                        as={<AntDesign name={'clockcircleo'} />}
                        size="30"
                        m={1}
                        color="black"
                        
                    />
                    <Text style={styles.buttonText}>
                        Selecione: {' '}
                        {selectedTime && selectedTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </HStack>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                pickerContainerStyleIOS={styles.pickerContainerIOS}
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
                isDarkModeEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 3,
        borderColor: 'black',
        paddingVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hstack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },
    pickerContainerIOS: {
        backgroundColor: 'black',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#CCCCCC',
    },
});

export default TimePicker;
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Button,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';


const DataAssinatura = ({ placeholder = 'Data de Nascimento', value, onDateChange }) => {
    const [dateOfBirth, setDateOfBirth] = useState(value || null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');

        if (selectedDate !== undefined) {
            setDateOfBirth(selectedDate);
            onDateChange && onDateChange(selectedDate); // Chama a função onDateChange, se fornecida
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const confirmDate = () => {
        setShowDatePicker(false);
        // Adicione qualquer lógica adicional que você queira executar ao confirmar a data
    };

    const renderContent = () => {
        if (dateOfBirth) {
            return <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>;
        } else {
            return <Text style={styles.placeholderText}>{placeholder}</Text>;
        }
    };

    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}
        >
          <TouchableOpacity onPress={showDatepicker} style={styles.input}>
            <View style={styles.inputContent}>
              <View style={styles.iconContainer}>
                <Icon name="calendar" size={22} color="white" style={styles.icon} />
              </View>
              <View style={styles.textContainer}>
                {renderContent()}
              </View>
            </View>
          </TouchableOpacity>
      
          {showDatePicker && (
            <View style={[styles.datePickerContainer, Platform.OS === 'android' && styles.androidDatePicker]}>
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                style={{ backgroundColor: 'transparent' }}
              />
              {Platform.OS === 'ios' && <Button title="Confirmar" onPress={confirmDate} />}
            </View>
          )}
        </KeyboardAvoidingView>
      );
};


const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Mês começa do zero
    const year = date.getFullYear();

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        borderRadius: 75,
        borderColor: '#FF214F',
        backgroundColor: 'black',
        color: 'white',
        borderWidth: 3,
        marginTop: Dimensions.get('window').height * 0.020,
        marginBottom: Dimensions.get('window').height * 0.010,
        padding: Dimensions.get('window').height * 0.011,
        width: Dimensions.get('window').width * 0.9,
        height: 50,
        fontSize: 20,
        textAlign: 'left',
    },
    dateText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 60
    },
    placeholderText: {
        color: '#6A6A72',
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 58,
    },
    datePickerContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.8,
    },
    androidDatePicker: {
        backgroundColor: 'transparent',
    },
    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconContainer: {
        marginRight: Dimensions.get('window').width * -0.10,
      },
      textContainer: {
        flex: 1,
        justifyContent: 'center',
      },
    icon: {
        marginLeft: 9
    }
});

export default DataAssinatura;

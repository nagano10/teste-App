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

const DateOfBirthInput = ({ placeholder = 'Selecione a Data de Nascimento', value, onDateChange }) => {
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
        {renderContent()}
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
    marginTop: Dimensions.get('window').height * 0.01,
    padding: Dimensions.get('window').height * 0.015,
    width: Dimensions.get('window').width * 0.9,
    fontSize: 18,
    textAlign: 'center',
  },
  dateText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  placeholderText: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    padding: Dimensions.get('window').height * 0.02,
    borderRadius: 10,
    marginTop: Dimensions.get('window').height * 0.02,
    width: Dimensions.get('window').width * 0.8,
  },
  androidDatePicker: {
    backgroundColor: 'transparent',
  },
});

export default DateOfBirthInput;

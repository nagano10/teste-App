import React, { useState } from 'react';
import { DatePicker, Text, FormControl } from 'native-base';

const DatePickerComponent = ({ onDateChange, label }) => {
  const [chosenDate, setChosenDate] = useState(new Date());

  const handleDateChange = date => {
    setChosenDate(date);
    onDateChange(date);
  };

  return (
    <FormControl marginBottom={3}>
      {label && (
        <FormControl.Label _text={{ color: 'white', fontSize: 'md' }}>{label}</FormControl.Label>
      )}
      <Text>Data Selecionada: {chosenDate.toDateString()}</Text>
      <DatePicker
        defaultDate={chosenDate}
        locale={"pt"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"}
        placeHolderText="Selecione a data"
        textStyle={{ color: "green" }}
        placeHolderTextStyle={{ color: "#d3d3d3" }}
        onDateChange={handleDateChange}
        disabled={false}
      />
    </FormControl>
  );
};

export default DatePickerComponent;

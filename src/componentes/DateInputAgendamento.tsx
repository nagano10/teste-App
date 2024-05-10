import dayjs from 'dayjs';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

export default function DateInputAgendamento({ onDateSelect }) {
    const [date, setDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (params) => {
        setDate(dayjs(params.date));
        onDateSelect(dayjs(params.date)); // Chamando a função onDateSelect com a data selecionada
    };

    return (
        <View style={styles.container}>
            <DateTimePicker
                mode="single"
                date={date.toDate()}
                onChange={handleDateChange}
                selectedItemColor='#BF183C'
                headerTextStyle={styles.title}
                headerButtonColor='#BF183C'
                headerButtonSize={25}
                calendarTextStyle={styles.calendar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    calendar: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

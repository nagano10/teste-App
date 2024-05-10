import { MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { Box, HStack, Icon, Radio, ScrollView, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HeaderDefault from '../assets/HeaderDefault';
import DateInputAgendamento from '../componentes/DateInputAgendamento';
import TimePicker from '../componentes/TimePicker';
import { auth, db } from '../config/firebase';
import { obterIdUsuarioLogado, solicitarAlteracaoAtendimento } from '../servicos/requisicoesFirebase';
const Agenda = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [dataProxAgenda, setDataProxAgenda] = useState("");
    const [horarioProxAgenda, setHorarioProxAgenda] = useState("");
    const [planoLogado, setPlanoLogado] = useState('');
    const [apelidoUsuario, setApelidoUsuario] = useState('');
    const [loading, setLoading] = useState(true);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };
    

    const verificarPlano = async () => {
        const user = auth.currentUser;

        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const planoClube = userData.planoClube;
            setPlanoLogado(planoClube);
        } else {
            console.log("Documento não encontrado");
        }
    };

    const dataProximoAtendimento = async () => {
        const user = auth.currentUser;

        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const dataProxAgenda = userData.proximoAtendimento;
            setDataProxAgenda(dataProxAgenda);
        } else {
            console.log("Documento não encontrado");
        }
    };

    const horarioProxAtendimento = async () => {
        const user = auth.currentUser;

        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const horarioProxAgenda = userData.horarioAtendimento;
            setHorarioProxAgenda(horarioProxAgenda);
        } else {
            console.log("Documento não encontrado");
        }
    };

    const buscarApelidoUsuario = async () => {
        const user = auth.currentUser;

        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const apelidoUsuario = userData.apelido;
            setApelidoUsuario(apelidoUsuario);
        } else {
            console.log("Documento não encontrado");
        }
    };

    

    const mandarSolicitacao = async (ocorrencia, data, horario, planoLogado, apelidoUsuario) => {

        const usuarioId = obterIdUsuarioLogado();
        const resultado = await solicitarAlteracaoAtendimento(usuarioId, ocorrencia, data, horario, planoLogado, apelidoUsuario)
        if (resultado === "Sucesso!") {
            setSelectedOption(null);
            setSelectedDate(null);
            setSelectedTime(null);
            Alert.alert(resultado, "Solicitação enviada com sucesso!")
        } else {
            Alert.alert(resultado);
            console.log("erro")
        }
    }




    const handleConfirm = () => {
        if (!selectedOption || !selectedDate || !selectedTime) {
            Alert.alert('Erro', 'Por favor, selecione uma opção, data e horário.');
            return;
        }

        const formattedTime = selectedTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        Alert.alert(
            'Confirmar Reagendamento',
            `Você está prestes a reagendar para: ${selectedOption === 'somenteDia' ? 'Somente um dia' : 'Toda ocorrência'
            } em ${selectedDate.format('DD/MM/YYYY')} às ${formattedTime}.`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        mandarSolicitacao( selectedOption, selectedDate.format('DD/MM/YYYY'), formattedTime, planoLogado, apelidoUsuario)
                    },
                },
            ]
        );
    };

    useEffect(() => {
        dataProximoAtendimento();
        horarioProxAtendimento();
        verificarPlano();
        buscarApelidoUsuario();

    });

    return (
        
        <ScrollView backgroundColor={'white'}>
            <View bgColor={'black'}>
                <HeaderDefault title={'Agendamento'} />
            </View>

            <View>
                <VStack flex={1} p={5} bgColor={'black'} borderBottomRightRadius={25}>
                    <Box style={styles.TopBox}>
                        <Text style={styles.TopBoxContent}>Próxima sessão</Text>
                    </Box>

                    <Box style={styles.Box}>
                        <Text style={styles.tableContent}>Data agendada: </Text>
                        <Text style={styles.tableContent}>{dataProxAgenda}</Text>
                    </Box>

                    <Box style={styles.Box}>
                        <Text style={styles.tableContent}>Horário: </Text>
                        <Text style={styles.tableContent}>{horarioProxAgenda}h</Text>
                    </Box>

                    <Box style={styles.Box}>
                        <Text style={styles.tableContent}>Tipo: </Text>
                        <Text style={styles.tableContent}>Corte</Text>
                    </Box>

                    <Box style={styles.Box}>
                        <Text style={styles.tableContent}>Plano: </Text>
                        <Text style={styles.tableContent}>{planoLogado}</Text>
                    </Box>
                </VStack>
            </View>

            <View bgColor={'black'}>
                <VStack flex={1} p={5} bgColor={'white'} borderTopLeftRadius={25}>
                    <Text style={styles.title}>Deseja alterar?</Text>
                    <Text style={styles.subtitle}>Envie sua solicitação para alteração</Text>

                    <Text style={styles.title2}>Escolha a ocorrência, data e horário da mudança!</Text>

                    <VStack flex={1} p={2} bgColor={'white'} borderTopLeftRadius={25}>
                        <HStack space={4}>
                            <Radio.Group
                                name="Ocorrencias"
                                accessibilityLabel="Ocorrencias"
                                value={selectedOption}
                                onChange={(nextValue) => {
                                    setSelectedOption(nextValue);
                                }}
                            >
                                <Box style={styles.radioBox}>
                                    <Icon
                                        as={<MaterialCommunityIcons name={'calendar-today'} />}
                                        size="30"
                                        m={1}
                                        color="black"
                                    />
                                    <Text style={styles.radioBoxContent}>Somente um dia</Text>
                                    <Radio value="somente um dia" colorScheme="red" aria-label="doce" marginRight={1} />
                                </Box>

                                <Box style={styles.radioBox}>
                                    <Icon
                                        as={<MaterialCommunityIcons name={'calendar-week-begin'} />}
                                        size="30"
                                        m={1}
                                        color="black"
                                    />
                                    <Text style={styles.radioBoxContent}>Toda ocorrência</Text>
                                    <Radio value="toda a série" colorScheme="red" aria-label="salgado" marginRight={1} />
                                </Box>
                            </Radio.Group>
                        </HStack>

                        <Box style={styles.BoxBlack}>
                            <DateInputAgendamento onDateSelect={handleDateSelect} />
                        </Box>


                        <TimePicker onTimeSelect={handleTimeSelect} />

                        <TouchableOpacity style={styles.button} onPress={handleConfirm}>

                            <Text style={styles.buttonText}>Confirmar</Text>

                        </TouchableOpacity>

                    </VStack>
                </VStack>
            </View>
        </ScrollView>
        
    );
    
};

const styles = StyleSheet.create({
    title: {
        color: 'black',
        marginLeft: 10,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
    title2: {
        color: 'black',
        marginLeft: 10,
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
    subtitle: {
        color: 'black',
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 10,
    },
    content: {
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        fontSize: 15,
        fontWeight: '200',
    },
    TopBoxContent: {
        color: 'white',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    Box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#BF183C',
        paddingVertical: 10,
    },
    TopBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#BF183C',
        backgroundColor: '#BF183C',
        paddingVertical: 10,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    BoxBlack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: 'black',
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 20,
    },
    tableContent: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        marginLeft: 20,
        marginRight: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 300,
        height: 300,
    },
    button: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 5,
        borderColor: '#BF183C',
        paddingVertical: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 25,
        fontWeight: "bold"
    },
    selectedTime: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
    },
    radioBoxContent: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    loadingImage: {
        width: 100,
        height: 100,
    },
});

export default Agenda;
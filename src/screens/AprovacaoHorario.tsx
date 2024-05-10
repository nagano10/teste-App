import { collection, getDocs, query } from "firebase/firestore";
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import HeaderDefault from "../assets/HeaderDefault";
import { db } from '../config/firebase'; // Importe a instância do Firestore
import { alterarAtendimento, recusarAlteracaoHorario } from "../servicos/requisicoesFirebase";

export default function AprovacaoHorario() {
    const [pesquisa, setPesquisa] = useState('');
    const [statusError, setStatusError] = useState('');
    const [usuariosNaoAutorizados, setUsuariosNaoAutorizados] = useState([]);


    // Função para buscar usuários não autorizados no Firestore
    const buscarAlteracoes = async () => {
        try {
            const usuariosRef = collection(db, 'agendamentos');
            const q = query(usuariosRef);
            const querySnapshot = await getDocs(q);

            const usuarios = [];
            querySnapshot.forEach((doc) => {
                usuarios.push({ id: doc.id, ...doc.data() });
            });

            setUsuariosNaoAutorizados(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuários não autorizados:', error);
        }
    };

    async function recusar(id) {
        const resultado = await recusarAlteracaoHorario(id);
        if (resultado === "Sucesso!") {
            Alert.alert(resultado, "Agendamento recusado com sucesso!");
            buscarAlteracoes();
        } else {
            Alert.alert(resultado);
            console.log("erro");
        }
    }

    useEffect(() => {
        buscarAlteracoes();
    }, []);

    const handleRecusar = async (id) => {
        Alert.alert(
            'Autorização de usuário',
            'Deseja recusar esse usuário?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Recusar',
                    onPress: () => {
                        recusar(id);
                    },
                },
            ],
        );
    };




    const handleAprovar = async (idUsuario, dataAtendimento, horarioAtendimento, ocorrencia) => {

        if (ocorrencia === 'toda a série') {

            Alert.alert(
                'Alteração de atendimento único.',
                'Quinze, não se esqueça de confirmar com o cliente no Whatsapp!',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Concluído',
                        onPress: async () => {

                            const resultado = await alterarAtendimento(idUsuario, dataAtendimento, horarioAtendimento);
                            if (resultado == "Sucesso!") {
                                Alert.alert(resultado, "Data alterada com sucesso!");
                            } else {
                                Alert.alert(resultado);
                                console.log("erro");
                            }
                            recusar(idUsuario);
                        },
                    },
                ],
            );


        } else {

            Alert.alert(
                'Alteração de atendimento único.',
                'Quinze, não se esqueça de confirmar com o cliente no Whatsapp!',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Concluído',
                        onPress: () => {
                            recusar(idUsuario);
                        },
                    },
                ],
            );

        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <HeaderDefault title={" Agendamentos"} />
                <Text style={styles.Title}>Fala, Quinze!</Text>

                <Text style={styles.text}>
                    Essa é a tela onde são mostrados os usuários que querem uma troca de atendimento. {'\n'} {'\n'}
                    As trocas podem ser para um dia só ou toda a série. {'\n'} {'\n'}
                    Antes de qualquer ação, lembre-se de verificar sua agenda. {'\n'} {'\n'}
                    Após isso, é só correr pro abraço e aprovar, ou recusar, o pedido!
                </Text>

                <VStack flex={1} p={5} bgColor={'black'} justifyContent={"center"} alignItems={"center"}>



                    <TouchableOpacity style={styles.input} onPress={() => buscarAlteracoes()}>

                        <Text style={styles.buttonText}>Atualizar</Text>

                    </TouchableOpacity>



                    {usuariosNaoAutorizados.map(agendamentos => (
                        <Box key={agendamentos.id} style={styles.redBox}>
                            <VStack>
                                <HStack>
                                    <Icon
                                        source="account-circle"
                                        color="white"
                                        size={70}
                                    />
                                    <VStack>
                                        <Text style={styles.nickname}>{agendamentos.apelido}</Text>
                                        <Text style={styles.plano}>{agendamentos.planoUsuario}</Text>
                                        <Text style={styles.content}>Quer alterar {agendamentos.ocorrencia}</Text>
                                        <Text style={styles.content}>Dia: {agendamentos.dataAtendimento}</Text>
                                        <Text style={styles.content}>Horário: {agendamentos.horarioAtendimento}h</Text>
                                    </VStack>
                                </HStack>
                                <Text style={styles.title}>Escolha sua ação:</Text>
                                <HStack>
                                    <TouchableOpacity onPress={() => handleRecusar(agendamentos.id)}>
                                        <Box style={styles.whiteBox}>
                                            <HStack alignContent="row">
                                                <View style={styles.icon}>
                                                    <Icon
                                                        source="cancel"
                                                        color="red"
                                                        size={30}
                                                    />
                                                </View>
                                                <Text style={styles.butttonTextAproval}>
                                                    RECUSAR
                                                </Text>
                                            </HStack>
                                        </Box>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>
                                        handleAprovar(agendamentos.id, agendamentos.dataAtendimento, agendamentos.horarioAtendimento, agendamentos.ocorrencia)
                                    }>
                                        <Box style={styles.whiteBox}>
                                            <HStack>
                                                <View style={styles.icon}>
                                                    <Icon
                                                        source="check"
                                                        color="green"
                                                        size={30}
                                                    />
                                                </View>
                                                <Text style={styles.butttonTextAproval}>
                                                    APROVAR
                                                </Text>
                                            </HStack>
                                        </Box>
                                    </TouchableOpacity>
                                </HStack>
                            </VStack>
                        </Box>
                    ))}
                </VStack>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
    },
    redBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#BF183C',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 20,
    },
    whiteBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        paddingVertical: 10,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 10,
    },
    input: {
        height: 70,
        width: '100%',
        borderColor: '#BF183C',
        fontSize: 18,
        borderWidth: 2,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        marginTop: 20,
        marginBottom: 40,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    nickname: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
    },
    plano: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginLeft: 20,
    },
    content: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        marginBottom: 5,
        marginLeft: 20,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 10
    },
    icon: {
        marginLeft: 10
    },

    butttonTextAproval: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 15
    },
    Title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginLeft: 20,
        paddingTop: 20
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        color: "white",
        marginTop: 20,
        textAlign: "justify",
        marginLeft: 20,
        marginRight: 20
    }
});

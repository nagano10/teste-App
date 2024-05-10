import { collection, getDocs, query, where } from "firebase/firestore";
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import HeaderEmpty from '../componentes/HeaderSemBtn';
import { ModalAprova } from "../componentes/ModalAprova";
import { db } from '../config/firebase'; // Importe a instância do Firestore
import { aprovarUsuario, deletarUsuario } from "../servicos/requisicoesFirebase";
import HeaderDefault from "../assets/HeaderDefault";

export default function Autorizacoes() {
    const [pesquisa, setPesquisa] = useState('');
    const [statusError, setStatusError] = useState('');
    const [usuariosNaoAutorizados, setUsuariosNaoAutorizados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);


    // Função para buscar usuários não autorizados no Firestore
    const buscarUsuariosNaoAutorizados = async () => {
        try {
            const usuariosRef = collection(db, 'usuarios');
            const q = query(usuariosRef, where('autorizado', '==', false));
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
        const resultado = await deletarUsuario(id);
        if (resultado === "Sucesso!") {
            Alert.alert(resultado, "Usuário recusado com sucesso!");
            buscarUsuariosNaoAutorizados();
        } else {
            Alert.alert(resultado);
            console.log("erro");
        }
    }

    useEffect(() => {
        buscarUsuariosNaoAutorizados();
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

    function abrirModal(usuario) {
        setModalData(usuario);
        setModalVisible(true);
    }
    

    const handleAprovar = async (userData) => {
        const { id, planoClube, dataInicioPlano, proximoAtendimento, dataAtendimento, selectedTime, frequencia } = userData;
        const resultado = await aprovarUsuario(id, planoClube, dataInicioPlano, proximoAtendimento, dataAtendimento, selectedTime, frequencia);
        if (resultado === "Sucesso!") {
            // Limpar os dados após a aprovação
            setModalData(null);
            Alert.alert(resultado, "Usuário aprovado com sucesso!");
        } else {
            Alert.alert(resultado);
            console.log("erro");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <HeaderDefault title={" Autorizações"} />
                <Text style={styles.Title}>Fala, Quinze!</Text>

                <Text style={styles.text}>
                    Essa é a tela onde são mostrados os usuários que foram cadastrados,
                    mas ainda não tem acesso ao App.  {'\n'} 
                    {'\n'} 
                    Para liberá-los, clique em "Aprovar" e preencha os dados! 
                    Ou, se você não os reconhece, clique em "Recusar"!</Text>

                <VStack flex={1} p={5} bgColor={'black'} justifyContent={"center"} alignItems={"center"}>



                    <TouchableOpacity style={styles.input} onPress={() => buscarUsuariosNaoAutorizados()}>
                        
                        <Text style={styles.buttonText}>Atualizar</Text>
                        
                    </TouchableOpacity>

                    

                    {usuariosNaoAutorizados.map(usuario => (
                        <Box key={usuario.id} style={styles.redBox}>
                            <VStack>
                                <HStack>
                                    <Icon
                                        source="account-circle"
                                        color="white"
                                        size={70}
                                    />
                                    <VStack>
                                        <Text style={styles.nickname}>{usuario.apelido}</Text>
                                        <Text style={styles.content}>{usuario.nomeCompleto}</Text>
                                        <Text style={styles.content}>{usuario.email}</Text>
                                    </VStack>
                                </HStack>
                                <Text style={styles.title}>Deseja entrar para o app:</Text>
                                <HStack>
                                    <TouchableOpacity onPress={() => handleRecusar(usuario.id)}>
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
                                    <TouchableOpacity onPress={() => abrirModal(usuario)}>
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
            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                {modalData && (
                    <ModalAprova
                        handleClose={() => setModalVisible(false)}
                        userData={modalData}
                        handleAprovar={handleAprovar}
                    />
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 0,
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
        alignItems:"center",
        justifyContent:'center',
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
        marginTop: 20,
        marginLeft: 20,
        paddingTop: 10
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        color: "white",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        textAlign: "justify",

    }
});

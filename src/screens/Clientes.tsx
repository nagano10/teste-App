import { collection, getDocs, query, where } from "firebase/firestore";
import { Box, Button, HStack, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, TextInput } from 'react-native-paper';
import HeaderEmpty from '../componentes/HeaderSemBtn';
import CustomModal from "../componentes/ModalClientes";
import { auth, db } from '../config/firebase'; // Importe a instância do Firestore
import { atualizarPlanoCliente, buscarDataAssinaturaUsuario, buscarDataExpUsuario, buscarPlanoUsuario } from "../servicos/requisicoesFirebase";
import HeaderDefault from "../assets/HeaderDefault";

export default function Clientes() {
    const [modalVisible, setModalVisible] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const [statusError, setStatusError] = useState('');
    const [usuariosNaoAutorizados, setUsuariosNaoAutorizados] = useState([]);
    const [diaAtendimento, setDiaAtendimento] = useState('');
    const [modalVisibilities, setModalVisibilities] = useState({});
    const [planoClube, setPlanoClube] = useState('');
    const [dataInicioPlano, setDataInicioPlano] = useState('');
    const [dataFinalPlano, setDataFinalPlano] = useState('');
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [atualizarDados, setAtualizarDados] = useState(false);



    const data = [
        { label: 'Premium', value: 'Premium' },
        { label: 'Standart', value: 'Standart' },
        { label: 'Select', value: 'Select' }
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            const planoUser = await buscarPlanoUsuario();
            const dataAssUser = await buscarDataAssinaturaUsuario();
            const dataExpUser = await buscarDataExpUsuario();

            setPlanoClube(planoUser)
            setDataInicioPlano(dataAssUser)
            setDataFinalPlano(dataExpUser)



        };
        fetchUserData();
    }, [atualizarDados]);

    async function realizarCadastro(id) {
        const resultado = await atualizarPlanoCliente(id, planoClube, dataInicioPlano)

        try {
            if (resultado === "Sucesso!") {
                setPlanoClube('')
                setDataInicioPlano('')
                Alert.alert(resultado, "Alteração concluída com sucesso!")
            } else {
                Alert.alert(resultado);
                console.log("erro")
            }

        } catch (error) {
            console.log(error)
        }


    }

    const enviarAlteracoes = (id) => {
        if (
            planoClube ||
            dataInicioPlano
        ) {
            Alert.alert(
                'Confirmar Alterações',
                'Deseja confirmar as alterações?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            await realizarCadastro(id);
                            setAtualizarDados(true);
                            // Após a realização do cadastro, chame fetchUserData para atualizar os dados exibidos

                        },
                    },
                ],
            );
        } else {
            Alert.alert('Campos em branco', 'Por favor, preencha todos os campos antes de confirmar.');
        }
    }


    const toggleModal = (userId) => {
        setModalVisibilities(prevState => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };


    // Função para buscar usuários não autorizados no Firestore
    const buscarUsuariosAutorizados = async () => {
        try {
            const usuariosRef = collection(db, 'usuarios');
            const q = query(usuariosRef, where('autorizado', '==', true));
            const querySnapshot = await getDocs(q);

            const usuarios = [];
            querySnapshot.forEach((doc) => {
                usuarios.push({ id: doc.id, ...doc.data() });
            });

            // Inicializa os estados de visibilidade do modal para cada usuário
            const initialModalVisibilities = {};
            usuarios.forEach(usuario => {
                initialModalVisibilities[usuario.id] = false;
            });

            setUsuariosNaoAutorizados(usuarios);
            setModalVisibilities(initialModalVisibilities);
        } catch (error) {
            console.error('Erro ao buscar usuários não autorizados:', error);
        }
    };


    useEffect(() => {
        buscarUsuariosAutorizados();
    }, []);



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
            <HeaderDefault title={" Clientes"} />

                

                <Text style={styles.Title}>Fala, Quinze!</Text>

                <Text style={styles.text}>
                    Essa é a tela onde são mostrados seus lindos! 
                    {'\n'} {'\n'}
                    Você pode consultar e alterar dados clicando
                    nos ícones de perfil de cada cliente!</Text>

                <VStack flex={1} p={5} bgColor={'black'} justifyContent={"center"} alignItems={"center"}>

                    <TouchableOpacity style={styles.input}
                        onPress={() => buscarUsuariosAutorizados()}>
                        <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>

                    {usuariosNaoAutorizados.map(usuario => (
                        <Box key={usuario.id} style={styles.redBox}>
                            <VStack>
                                <HStack>
                                    <VStack>

                                        <TouchableOpacity style={styles.accountButton} onPress={() => toggleModal(usuario.id)}>
                                            <Icon
                                                source="account-search-outline"
                                                color="white"
                                                size={50}
                                            />
                                        </TouchableOpacity>


                                        <CustomModal
                                            isVisible={modalVisibilities[usuario.id]}
                                            onClose={() => toggleModal(usuario.id)}
                                        >

                                            <Text style={styles.titleModal}>Dados do Cliente</Text>
                                            <Text style={styles.textModal}> 
                                                <Text fontWeight={"medium"}>Nome: </Text> {usuario.apelido}
                                                </Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Nome completo: </Text> {usuario.nomeCompleto}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Email: </Text> {usuario.email}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Data de Nascimento: </Text> {usuario.dataNascimento}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Gênero: </Text> {usuario.genero}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Endereço: </Text> {usuario.endereco}</Text>
                                            <View style={styles.divider} />
                                            <Text style={styles.titleModal}>Preferências</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Bebida: </Text> {usuario.bebida}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Comida: </Text> {usuario.comida}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Gênero Musical: </Text>{usuario.generoMusical}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Artista Favorito: </Text> {usuario.artistaFavorito}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Esporte Favorito: </Text> {usuario.esporteFavorito}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Time do Coração: </Text> {usuario.timeDoCoracao}</Text>
                                            <View style={styles.divider} />
                                            <Text style={styles.titleModal}>Plano</Text>
                                                                            
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Plano Clube: </Text> {usuario.planoClube}</Text> 
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Data Inicio do Plano: </Text> {usuario.dataInicioPlano}</Text>
                                            <Text style={styles.textModal}>
                                                <Text fontWeight={"medium"}>Data final do plano: </Text> {usuario.dataFinalPlano}</Text>

                                            <View style={styles.divider} />
 
                                            <Text style={styles.titleModal}>Alterações</Text>

                                            <Dropdown
                                                style={styles.dropdown}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                data={data}

                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select item"
                                                searchPlaceholder="Search..."
                                                value={planoClube}
                                                onChange={item => {
                                                    setPlanoClube(item.value);
                                                }}

                                            />

                                            <Text style={styles.subtitleModal}>Data de Assinatura:</Text>

                                            <TextInput
                                                style={styles.inputBlock}
                                                placeholder='Data de Assinatura'
                                                placeholderTextColor='#6A6A72'
                                                mode='flat'
                                                outlineColor='transparent'
                                                textColor='black'
                                                selectionColor="black"
                                                cursorColor='black'
                                                activeUnderlineColor='transparent'
                                                underlineColor='transparent'
                                                value={dataInicioPlano}
                                                onChangeText={dataInicioPlano => setDataInicioPlano(dataInicioPlano)}
                                            />



                                            <Button
                                                w="100%"
                                                mt={15}
                                                mb={30}
                                                bgColor='#FF214F'
                                                borderRadius='15px'
                                                px={2} // Ajusta o espaçamento horizontal
                                                py={1} // Ajusta o espaçamento Vertical
                                                _text={{ fontSize: 24, fontWeight: '700', color: 'white' }} // ajusta font, cor e tamanho do btn

                                                onPress={() => enviarAlteracoes(usuario.id)}

                                            >
                                                Salvar Alterações
                                            </Button>

                                        </CustomModal>


                                    </VStack>
                                    <VStack>
                                        <Text style={styles.nickname}>{usuario.apelido}</Text>
                                        <Text style={styles.content}>{usuario.nomeCompleto}</Text>
                                        <Text style={styles.content}>{usuario.planoClube}</Text>
                                        <Text style={styles.content}>Toda {usuario.diaAtendimento}</Text>
                                        <Text style={styles.content}>Às {usuario.horarioAtendimento}</Text>
                                        <Text style={styles.content}>A cada {usuario.frequenciaAtendimento}</Text>
                                    </VStack>

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
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    inputBlock: {
        height: 40,
        width: "100%",
        borderColor: "black",
        fontSize: 16,
        borderWidth: 0.9,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "white",

    },
    titleModal: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        textAlign: "center"

    },
    textModal: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'normal',
    },
    subtitleModal: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: -10,
    },
    modalContent: {
        padding: 20,
    },
    inputModal: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'normal',
        height: 40,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 5,
        backgroundColor: "#FFF",
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
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
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
    inputTest: {
        height: 40,
        width: "100%",
        borderColor: "#FF214F",
        fontSize: 16,
        borderWidth: 2,
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#FFF",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
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
        fontSize: 18,
        fontWeight: "300",
        color: "white",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        textAlign: "justify"
    },
    accountButton: {
        marginLeft: 15,
        marginTop: 50,

    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    dropdown: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Image, ScrollView, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import HeaderDefault from "../assets/HeaderDefault";
import loadingAnimation from '../assets/images/loadingAnimation.gif';
import FooterSair from "../componentes/FooterSair";
import { auth, db } from "../config/firebase";
import { atualizarPerfil, buscarApelidoUsuario, buscarArtistaFavorito, buscarBebidaUsuario, buscarComidaUsuario, buscarDataAssinaturaUsuario, buscarDataExpUsuario, buscarDataUsuario, buscarEmailUsuario, buscarEnderecoUsuario, buscarEsporteUsuario, buscarGeneroUsuario, buscarNomeUsuario, buscarPlanoUsuario, buscarSomUsuario, buscarTelefoneUsuario, buscarTimeUsuario } from "../servicos/requisicoesFirebase";




const data = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' }
];




export default function Perfil({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [dataProxAgenda, setDataProxAgenda] = useState("");
    const [email, setEmail] = useState('');
    const [apelido, setApelido] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [telefone, setTelefone] = React.useState('');
    const [genero, setGenero] = useState(null);
    const [endereco, setEndereco] = useState('');
    const [bebida, setBebida] = useState('');
    const [comida, setComida] = useState('');
    const [generoMusical, setGeneroMusical] = useState('');
    const [artistaFavorito, setArtistaFavorito] = useState('');
    const [esporteFavorito, setEsporteFavorito] = useState('');
    const [timeDoCoracao, setTimeDoCoracao] = useState('');
    const [dataInicioPlano, setDataInicioPlano] = useState('');
    const [dataFinalPlano, setDataFinalPlano] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [planoClube, setPlanoClube] = useState('');
    const [atualizarDados, setAtualizarDados] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);


            const user = auth.currentUser;
            const name = await buscarApelidoUsuario();
            const nameCompleto = await buscarNomeUsuario();
            const emailTxt = await buscarEmailUsuario();
            const dataNasc = await buscarDataUsuario();
            const generoUser = await buscarGeneroUsuario();
            const enderecoUser = await buscarEnderecoUsuario();
            const telefoneUser = await buscarTelefoneUsuario();
            const bebidaUser = await buscarBebidaUsuario();
            const comidaUser = await buscarComidaUsuario();
            const artistaUser = await buscarArtistaFavorito();
            const somUser = await buscarSomUsuario();
            const esporteUser = await buscarEsporteUsuario();
            const timeUser = await buscarTimeUsuario();
            const planoUser = await buscarPlanoUsuario();
            const dataAssUser = await buscarDataAssinaturaUsuario();
            const dataExpUser = await buscarDataExpUsuario();
            atualizarDataExpiracao();

            setApelido(name);
            setNomeCompleto(nameCompleto)
            setEmail(emailTxt)
            setDataNascimento(dataNasc)
            setGenero(generoUser)
            setEndereco(enderecoUser)
            setTelefone(telefoneUser)
            setBebida(bebidaUser)
            setComida(comidaUser)
            setArtistaFavorito(artistaUser)
            setGeneroMusical(somUser)
            setEsporteFavorito(esporteUser)
            setTimeDoCoracao(timeUser)
            setPlanoClube(planoUser)
            setDataInicioPlano(dataAssUser)
            setDataFinalPlano(dataExpUser)


            setLoading(false);
        };
        fetchUserData();
        dataProximoAtendimento();
    }, [atualizarDados]);

    const atualizarDataExpiracao = async () => {
        try {
            const user = auth.currentUser;
            const docRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const userData = docSnap.data();
                let { dataInicioPlano, dataFinalPlano } = userData;
    
                // Convertendo dataInicioPlano para o formato Date
                const [dia, mes, ano] = dataInicioPlano.split('/').map(Number);
                const dataInicioPlanoDate = new Date(ano, mes - 1, dia);
    
                // Adicionando 365 dias
                const dataFinalDate = new Date(dataInicioPlanoDate);
                dataFinalDate.setDate(dataFinalDate.getDate() + 365);
    
                // Convertendo dataFinalDate para o formato DD/MM/YYYY
                const novoDia = String(dataFinalDate.getDate()).padStart(2, '0');
                const novoMes = String(dataFinalDate.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
                const novoAno = dataFinalDate.getFullYear();
                const novaDataFinal = `${novoDia}/${novoMes}/${novoAno}`;
    
                // Atualizando a variável dataFinalPlano
                setDataFinalPlano(novaDataFinal);
    
                // Atualizando no Firestore
                await updateDoc(docRef, { dataFinalPlano: novaDataFinal });
    
                console.log('Data de expiração atualizada com sucesso:', novaDataFinal);
            } else {
                console.log("Documento não encontrado");
            }
        } catch (error) {
            console.error('Erro ao atualizar data de expiração:', error);
        }
    };


    
    function deslogar() {
        auth.signOut();
        navigation.replace('Login')
    }

    async function realizarCadastro() {
        const resultado = await atualizarPerfil(apelido, dataNascimento, endereco, nomeCompleto, telefone, genero)

        if (resultado === "Sucesso!") {
            setApelido('');
            setDataNascimento('');[]
            setEndereco('');
            setNomeCompleto('');
            setTelefone('');
            setGenero('');
            Alert.alert(resultado, "Alteração concluída com sucesso!")
        } else {
            Alert.alert(resultado);
            console.log("erro")
        }
    }

    const enviarAlteracoes = () => {
        if (
            apelido ||
            email ||
            dataNascimento ||
            endereco ||
            nomeCompleto ||
            telefone ||
            genero
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
                            await realizarCadastro();
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


    return (

        <View style={styles.container}>
        {loading ? (
            <View style={styles.loadingContainer}>
                <Image source={loadingAnimation} style={styles.loadingImage} />
            </View>
        ) : (

        <ScrollView backgroundColor={'white'}>
            


            <HeaderDefault title={" Perfil"} />

            <View bgColor={'black'}>

                <VStack flex={1}
                    p={5}
                    bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}
                    alignItems="center">

                    <View style={styles.imageContainer}>

                        <Text style={styles.nomeUser}>{apelido} </Text>
                        <Text style={styles.dataAgendamento}>Próxima Agenda: {dataProxAgenda}</Text>
                    </View>
                </VStack>


            </View>

            <VStack flex={1} p={5} bgColor={"black"} borderTopLeftRadius={25} borderBottomRightRadius={0}>

                <Text style={styles.titulo}>Dados Pessoais</Text>


                <TextInput
                    style={styles.input}
                    placeholder='Nome Completo'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    selectionColor="white"
                    textColor='white'
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={nomeCompleto}
                    onChangeText={nomeCompleto => setNomeCompleto(nomeCompleto)}
                    left={
                        <TextInput.Icon
                            icon="account"
                            size={30}
                            color="white"
                        />
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder='Como posso te chamar?'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={apelido}
                    onChangeText={apelido => setApelido(apelido)}
                    left={
                        <TextInput.Icon
                            icon="emoticon-excited"
                            size={30}
                            color="white"
                        />
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder='Digite o seu e-mail'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    cursorColor='white'
                    selectionColor="white"
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    left={
                        <TextInput.Icon
                            icon="email"
                            size={30}
                            color="white"
                        />
                    }
                />

                {/* 
                <DateOfBirthInputComImagem
                    placeholder="Data de Nascimento"
                    value={dataNascimento}
                    onDateChange={dataNascimentoPick}
                />
                */}

                <TextInput
                    style={styles.input}
                    placeholder='DD/MM/AAAA'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    keyboardType="numeric"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={dataNascimento}
                    onChangeText={dataNascimento => setDataNascimento(dataNascimento)}
                    left={
                        <TextInput.Icon
                            icon="calendar"
                            size={30}
                            color="white"
                        />
                    }
                />


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
                    placeholder="Selecione seu gênero"
                    searchPlaceholder="Search..."
                    value={genero}
                    onChange={item => {
                        setGenero(item.value);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="white" name="flag" size={30} />
                    )}
                />


                <TextInput
                    style={styles.input}
                    placeholder='Endereço'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={endereco}
                    onChangeText={endereco => setEndereco(endereco)}
                    left={
                        <TextInput.Icon
                            icon="map-outline"
                            size={30}
                            color="white"
                        />
                    }
                />




                <TextInput
                    style={styles.input}
                    placeholder='(99) 99999-9999'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    keyboardType="numeric"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={telefone}
                    onChangeText={telefone => setTelefone(telefone)}
                    left={
                        <TextInput.Icon
                            icon="phone-outline"
                            size={30}
                            color="white"
                        />
                    }
                />





                <View style={styles.divider} />

                <Text style={styles.titulo}>Preferências</Text>

                <TextInput
                    style={styles.inputBlock}
                    placeholder='Bebida'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={bebida}
                    editable={false}
                    onChangeText={bebida => setBebida(bebida)}
                    left={
                        <TextInput.Icon
                            icon="coffee-outline"
                            size={30}
                            color="white"
                        />
                    }
                />


                <TextInput
                    style={styles.inputBlock}
                    placeholder='Comida'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={comida}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="food-outline"
                            size={30}
                            color="white"
                        />
                    }
                />

                <TextInput
                    style={styles.inputBlock}
                    placeholder='Que som você curte?'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={generoMusical}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="music-box-multiple"
                            size={30}
                            color="white"
                        />
                    }
                />

                <TextInput
                    style={styles.inputBlock}
                    placeholder='Artista Favorito'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={artistaFavorito}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="microphone"
                            size={30}
                            color="white"
                        />
                    }
                />


                <TextInput
                    style={styles.inputBlock}
                    placeholder='Esporte'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={esporteFavorito}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="soccer"
                            size={30}
                            color="white"
                        />
                    }
                />



                <TextInput
                    style={styles.inputBlock}
                    placeholder='Time'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={timeDoCoracao}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="whistle"
                            size={30}
                            color="white"
                        />
                    }
                />

                <View style={styles.divider} />

                <Text style={styles.titulo}>Planos</Text>


                <TextInput
                    style={styles.inputBlock}
                    placeholder='Plano'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={planoClube}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="book-edit-outline"
                            size={30}
                            color="white"
                        />
                    }
                />





                <TextInput
                    style={styles.inputBlock}
                    placeholder='Data de Assinatura'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={dataInicioPlano}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="book-clock-outline"
                            size={30}
                            color="white"
                        />
                    }
                />



                <TextInput
                    style={styles.inputBlock}
                    placeholder='Data de Expiração'
                    placeholderTextColor='#6A6A72'
                    mode='flat'
                    outlineColor='transparent'
                    textColor='white'
                    selectionColor="white"
                    cursorColor='white'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    value={dataFinalPlano}
                    editable={false}
                    left={
                        <TextInput.Icon
                            icon="book-cancel-outline"
                            size={30}
                            color="white"
                        />
                    }
                />

                <View style={styles.divider} />


                <Button
                    // Botão para logar
                    w="100%"

                    mt={15}
                    mb={30}
                    bgColor='black'
                    borderWidth={3}
                    borderColor='red.300'
                    borderRadius='75px'
                    px={2} // Ajusta o espaçamento horizontal
                    py={1} // Ajusta o espaçamento Vertical
                    _text={{ fontSize: 24, fontWeight: '500', color: 'white' }} // ajusta font, cor e tamanho do btn

                    onPress={enviarAlteracoes}

                >
                    Salvar Alterações
                </Button>

                <FooterSair logout={deslogar} />
            </VStack>




        </ScrollView>

            )}
        </View>

    );
}

const styles = StyleSheet.create({

    titulo: {
        fontSize: 24,
        paddingTop: 10,
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 10

    },
    container: {
        flex: 1,
    },
    textEstilo: {
        textAlign: 'left',
        marginLeft: 50,
        fontSize: 20,
        color: 'white',
        marginTop: -23
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

    action: {
        fontSize: 20,
        paddingTop: 10,
        color: '#BF183C',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 10

    },
    inputNumber: {
        color: 'white',
        height: 50,
        width: "100%",
        borderColor: "#FF214F",
        fontSize: 20,
        borderWidth: 3,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#000",
        borderRadius: 75,

    },
    nomeUser: {
        fontSize: 24,
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 5,
        paddingTop: 10,
    },
    dataAgendamento: {
        fontSize: 18,
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '99%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        color: 'white',
        marginLeft: 10,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 20
    },
    subtitle: {
        color: 'white',
        marginLeft: 10,
        fontSize: 25,
        fontWeight: "200"
    },
    pickerComponente: {
        height: 50,
        width: '100%'
    },

    content: {
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        fontSize: 15,
        fontWeight: "200",
    },

    Box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#BF183C',
        paddingVertical: 15,
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
    },

    tableContent: {
        color: 'white',
        fontSize: 15,
        fontWeight: "300",
        marginLeft: 10
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Adicione margem inferior se necessário
    },
    containerAnimacao: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
      },
    image: {
        width: 300,
        height: 300,
    },
    input: {
        height: 50,
        width: "100%",
        borderColor: "#FF214F",
        fontSize: 20,
        borderWidth: 3,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#000",

    },
    inputBlock: {
        height: 50,
        width: "100%",
        borderColor: "#FF214F",
        fontSize: 20,
        borderWidth: 3,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#212121",

    },
    inputText: {
        height: 50,
        width: '100%',
        borderColor: "#FF214F",
        fontSize: 20,
        borderWidth: 3,
        borderRadius: 75,
        marginTop: 20,
        marginBottom: 10,

    },
    dropdown: {
        marginTop: 20,
        marginBottom: 10,
        height: 50,
        width: '100%',
        borderWidth: 3,
        borderColor: '#FF214F',
        borderRadius: 30,

    },
    icon: {
        marginLeft: 15,
        marginRight: 10,
    },
    iconText: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 10,
    },
    placeholderStyle: {
        fontSize: 20,
        color: '#6A6A72'
    },
    selectedTextStyle: {
        fontSize: 20,
        color: 'white',

    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 20,

    },
    imagem: {
        width: 200,
        height: 200
      },

})

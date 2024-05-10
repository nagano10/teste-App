import { yupResolver } from '@hookform/resolvers/yup';
import { Center, ScrollView, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as yup from 'yup';
import HeaderDefault from '../assets/HeaderDefault';
import { Button } from '../componentes/ButtonNativeBase';
import Footer from '../componentes/Footer';
import TecladoCustom from '../componentes/TecladoCustom';
import { Titulo } from '../componentes/Titulo';
import { cadastrar } from '../servicos/requisicoesFirebase';
import { alteraDados } from '../utils/comum';




export default function Cadastro(navigation) {

    const [dados, setDados] = useState ({
        email: '',
        senha: '',
        confirmaSenha: '',
        apelido: '',
        nomeCompleto: ''
      })
    

    const [error, setError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    // controle de senha
    const [showPassword, setShowPassword] = useState(true)



    // validação
    useEffect(() => {
        if (dados.senha !== '' && dados.confirmaSenha !== '') {
            if (dados.senha !== dados.confirmaSenha) {
                setError('As senhas não coincidem');
            } else {
                setError('');
            }
        }
    }, [dados.senha, dados.confirmaSenha]);

    

    async function realizarCadastro() {
        if (dados.email === '' || dados.senha === '' || dados.confirmaSenha === '' || dados.nomeCompleto === '' || dados.apelido === '') {
            setMensagemError('Verifique os campos.');
            setMensagemError((mensagemAntiga) => {
                if (Platform.OS === 'ios') {
                    Alert.alert('Erro', mensagemAntiga, [{ text: 'OK', style: 'cancel' }], { cancelable: true });
                } else {
                    Alert.alert('Erro', mensagemAntiga);
                }
                return mensagemAntiga;
            });
        } else if (dados.senha !== dados.confirmaSenha) {
            setMensagemError('As senhas não coincidem.');
            setMensagemError((mensagemAntiga) => {
                if (Platform.OS === 'ios') {
                    Alert.alert('Erro', mensagemAntiga, [{ text: 'OK', style: 'cancel' }], { cancelable: true });
                } else {
                    Alert.alert('Erro', mensagemAntiga);
                }
                return mensagemAntiga;
            });
        } else {
            const resultado = await cadastrar(dados.nomeCompleto, dados.apelido, dados.email, dados.senha);
            if (resultado === 'Sucesso!') {
                setMensagemError('As senhas não coincidem.');
                Alert.alert(resultado, "Cadastro concluído com sucesso!")
            } else {
                Alert.alert(resultado);
                console.log("erro")
            }
        }
    }


    return (
        <TecladoCustom>
            <ScrollView bgColor={'black'}>
                <VStack bgColor="black" flex={1} fontSize="lg" px={5}>

                    <HeaderDefault

                        title=" Cadastre-se" />
                    <Center>
                        <Titulo mb={10} mt={5} alignItems="flex-start" textAlign="justify" >
                            {"Bem-Vindo(a) ao clube Quinze! Faça o seu cadastro e tenha acesso a nossa plataforma exclusiva!"}
                        </Titulo>


                        <TextInput
                            style={styles.input}
                            placeholder='Nome Completo'
                            placeholderTextColor='#6A6A72'
                            mode='flat'
                            outlineColor='transparent'
                            textColor='white'
                            cursorColor='white'
                            selectionColor="white"
                            activeUnderlineColor='transparent'
                            underlineColor='transparent'
                            value={dados.nomeCompleto}
                            onChangeText={valor => alteraDados ('nomeCompleto', valor, dados, setDados)}
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
                            cursorColor='white'
                            selectionColor="white"
                            activeUnderlineColor='transparent'
                            underlineColor='transparent'
                            value={dados.apelido}
                            onChangeText={valor => alteraDados ('apelido', valor, dados, setDados)}
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
                            value={dados.email}
                            onChangeText={valor => alteraDados ('email', valor,  dados, setDados)}
                            left={
                                <TextInput.Icon
                                    icon="email"
                                    size={30}
                                    color="white"
                                />
                            }
                        />



                        <TextInput
                            style={styles.input}
                            placeholder='Digite a sua senha'
                            placeholderTextColor='#6A6A72'
                            mode='flat'
                            outlineColor='transparent'
                            textColor='white'
                            cursorColor='white'
                            selectionColor="white"
                            activeUnderlineColor='transparent'
                            underlineColor='transparent'
                            value={dados.senha}
                            onChangeText={valor => alteraDados ('senha', valor, dados, setDados)}
                            left={
                                <TextInput.Icon
                                    icon="lock"
                                    size={30}
                                    color="white"
                                />
                            }
                            secureTextEntry={showPassword}
                            right={
                                showPassword ? (
                                    <TextInput.Icon
                                        icon="eye"
                                        size={30}
                                        color="white"
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <TextInput.Icon
                                        icon="eye-off"
                                        size={30}
                                        color="white"
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                )
                            }
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Confirme a sua senha'
                            placeholderTextColor='#6A6A72'
                            mode='flat'
                            outlineColor='transparent'
                            textColor='white'
                            cursorColor='white'
                            selectionColor="white"
                            activeUnderlineColor='transparent'
                            underlineColor='transparent'
                            value={dados.confirmaSenha}
                            onChangeText={valor => alteraDados ('confirmaSenha', valor,  dados, setDados)}
                            left={
                                <TextInput.Icon
                                    icon="lock"
                                    size={30}
                                    color="white"
                                />
                            }
                            secureTextEntry={showPassword}
                            right={

                                showPassword ? (
                                    <TextInput.Icon
                                        icon="eye"
                                        size={30}
                                        color="white"
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <TextInput.Icon
                                        icon="eye-off"
                                        size={30}
                                        color="white"
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                )
                            }
                        />



                        <Button
                            title='Cadastrar'
                            marginTop={10}
                            onPress={() => realizarCadastro()} />
                    </Center>
                </VStack>
                <Footer />
            </ScrollView>
        </TecladoCustom>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: "100%",
        borderColor: "#FF214F",
        fontSize: 20,
        borderWidth: 2,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        marginTop: 20,
        backgroundColor: "#000",
    }
})

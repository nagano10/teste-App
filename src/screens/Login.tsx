
import React, { useEffect, useState } from 'react';
// Importa o VStack e image do native base
import { Box, Button, Image, ScrollView, Text } from 'native-base';
//importar função de botão sem opacidade
import { TouchableOpacity, View } from 'react-native';
// importado logo quinze
import LogoQuinze from '../assets/images/LogoQuinzeClube.png';
// importa a biblioteca nativa do expo, podendo buscar icones e facilitando a aplicação.

import { TextInput } from 'react-native-paper';
//Importa componente para ajuste dos teclados
import TecladoCustom from '../componentes/TecladoCustom';

//Hook form
import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Alert, Platform, StyleSheet } from 'react-native';
import loadingAnimation from '../assets/images/loadingAnimation.gif';
import { Alerta } from '../componentes/Alerta';
import { auth, db } from "../config/firebase";
import { logar } from '../servicos/requisicoesFirebase';
import { alteraDados } from '../utils/comum';





const Login = ({ navigation }) => {

  const [dados, setDados] = useState({
    email: '',
    senha: '',
    autorizado: null,
  })


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(true)
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [autorizado, setAutorizado] = useState(null);


  function handleSignUp(data: FormData) {
    console.log(data);
  }

  function deslogar() {
    auth.signOut();
  }

  async function verificarAutorizado() {
    const user = auth.currentUser;
  
    const docRef = doc(db, 'usuarios', user.uid);
    const docSnap = await getDoc(docRef);
    console.log('teste')
  
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const usuarioAutorizado = userData.autorizado;
      console.log(usuarioAutorizado);
      setAutorizado(usuarioAutorizado);
  
      realizarLogin(); // Chamando realizarLogin após definir o estado autorizado
    } else {
      console.log("Documento não encontrado");
    }
  };

  function handleForgotPassword() {
    if (email == '') {
      Alert.alert(
        'Campo vazio',
        'Por favor, preencha o campo de e-mail para enviarmos o reset de senha.'
      )
    } else {
      Alert.alert(
        'Confirmar reset de senha?',
        'Clique em Confirmar para enviarmos um e-mail para você!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              sendPasswordResetEmail(auth, email)
                .catch(error => console.log(error))
            },
          },
        ]
      );
    }
  }



  const onSubmit = (data: FormData) => console.log(data);

  useEffect(() => {
    setCarregando(false);
    


  }, []);

  async function realizarLogin() {
    if (dados.email === '' || dados.senha === '') {
      setMensagemError('Verifique os campos.');
      setMensagemError((mensagemAntiga) => {
        if (Platform.OS === 'ios') {
          Alert.alert('Erro', mensagemAntiga, [{ text: 'OK', style: 'cancel' }], { cancelable: true });
        } else {
          Alert.alert('Erro', mensagemAntiga);
        }
        return mensagemAntiga;
      });
    } else {
      const resultado = await logar(dados.email, dados.senha);
      if (resultado === 'Sucesso!') {
        setEmail('');
        setSenha('');
        // Verificar se o usuário é o administrador
        if (dados.email === 'emersonpacheco88@icloud.com') {
          navigation.replace('HomeAdm');
        } else {
          const user = auth.currentUser;
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const usuarioAutorizado = userData.autorizado;
  
            if (usuarioAutorizado) {
              navigation.replace('Home');
            } else {
              Alert.alert('Não autorizado', 'Você não tem acesso ao Clube Quinze');
              auth.signOut();
            }
          } else {
            console.log("Documento não encontrado");
          }
        }
      } else {
        Alert.alert(resultado);
      }
    }
  }
  
  

  if (carregando) {
    return (
      <View style={styles.containerAnimacao} >
        <Image source={loadingAnimation}
          style={styles.imagem}
        />
      </View>
    )
  }

  return (
    <TecladoCustom>
      <ScrollView

        paddingX={6}
        backgroundColor={'black'}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>


        <Image
          source={LogoQuinze}
          alt="Logo 15"
          style={{ width: 275, height: 275, marginTop: 1, marginBottom: 20 }}
        />

        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='#6A6A72'
          mode='flat'
          outlineColor='transparent'
          textColor='white'
          selectionColor='white'
          activeUnderlineColor='transparent'
          underlineColor='transparent'
          value={dados.email}
          onChangeText={valor => alteraDados('email', valor, dados, setDados)}
          error={statusError == 'email'}
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
          placeholder='Senha'
          placeholderTextColor='#6A6A72'
          mode='flat'
          outlineColor='transparent'
          textColor='white'
          cursorColor='white'
          activeUnderlineColor='transparent'
          underlineColor='transparent'
          selectionColor='white'
          value={dados.senha}
          onChangeText={valor => alteraDados('senha', valor, dados, setDados)}
          error={statusError == 'senha'}
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



        <Box mt={2} w="100%" flexDirection="row" justifyContent="center">

          <Text color="white" fontStyle="normal">
            Esqueceu a sua senha?
          </Text>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text color="red.300" fontWeight='500' fontStyle="italic">
              Clique aqui!
            </Text>
          </TouchableOpacity>
        </Box>

        <Alerta
          mensagem={mensagemError}
          error={statusError == 'firebase'}
          setError={setStatusError}
        />

        <Button
          // Botão para logar
          w="50%"

          mt={25}
          bgColor='black'
          borderWidth={3}
          borderColor='red.300'
          borderRadius='75px'
          px={2} // Ajusta o espaçamento horizontal
          py={1} // Ajusta o espaçamento Vertical
          _text={{ fontSize: 24, fontWeight: '500', color: 'white' }} // ajusta font, cor e tamanho do btn

          onPress={() => realizarLogin()}

        >
          Entrar
        </Button>

        <Box mt={1} w="100%" flexDirection="row" justifyContent="center" fontWeight="medium" >
          <Text color="white" > Ainda não tem cadastro? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text color="red.300" fontStyle="italic" fontWeight="medium">
              Faça seu cadastro!
            </Text>

          </TouchableOpacity>
        </Box>


      </ScrollView >
    </TecladoCustom >

  );
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: "100%",
    borderColor: "#FF214F",
    fontSize: 20,
    borderWidth: 3,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    marginTop: 20,
    backgroundColor: "#000",
  },
  containerAnimacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  imagem: {
    width: 200,
    height: 200
  }
})

export default Login;
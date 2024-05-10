import { useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore";
import { Image, ScrollView, VStack, View } from "native-base";
import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import Fundo from "../assets/images/Fundo.png";
import LogoQuinze from "../assets/images/LogoQuinzeComBorda.png";
import SelectFundo from "../assets/images/selectFundoBranco.png";
import SelectTexto from "../assets/images/selectQuinze.png";
import { Button } from "../componentes/BotaoPersonalizado";
import HeaderEmpty from "../componentes/HeaderSemBtn";
import { auth, db } from "../config/firebase";
import { buscarApelidoUsuario } from "../servicos/requisicoesFirebase";

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [dataProxAgenda, setDataProxAgenda] = useState("");
  const [horarioProxAgenda, setHorarioProxAgenda] = useState("");
  const [mostrarSelect, setMostrarSelect] = useState(false);
  const [planoLogado, setPlanoLogado] = useState('')

  const fetchUserData = async () => {
    const user = auth.currentUser;
    const name = await buscarApelidoUsuario();
    setUsername(name);

    const docRef = doc(db, 'usuarios', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const planoClube = userData.planoClube;
      setMostrarSelect(planoClube === 'Select');
    } else {
      console.log("Documento não encontrado");
    }
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

  useEffect(() => {
    fetchUserData();
    verificarPlano();
    dataProximoAtendimento();
    horarioProxAtendimento(); // Chama a função fetchUserData quando o componente for montado

  });

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData(); // Chama a função fetchUserData sempre que a tela entra em foco
    }, [])
  );

  // controle tamanho das imagens
  const imageWidth = Platform.OS === 'ios' ? 135 : 135;
  const imageHeight = Platform.OS === 'ios' ? 135 : 135;

  // controle tamanho do fundo
  const imageWidthFundo = Platform.OS === 'ios' ? '100%' : '100%';
  const imageHeightFundo = Platform.OS === 'ios' ? 90 : 90;

  const whatsappQuinze = 'https://wa.me//5511961995531?text=Fala%20Quinze!';
  const instagramQuinze = 'https://www.instagram.com/15_barbeiro/';

  const LogoQuinzeApp = () => (
    <Image
      source={LogoQuinze}
      alt="Logo 15"
      style={{
        width: imageWidth,
        height: imageHeight,
        position: 'absolute',
        left: '-12.5%',
        top: '90%'
      }}
    />
  );

  const LogoSelect = () => (
    <Image
      source={SelectFundo}
      alt="Logo 15"
      style={{
        width: imageWidth,
        height: imageHeight,
        position: 'absolute',
        left: '-12.5%',
        top: '90%'
      }}
    />
  );

  const LogoSelectTexto = () => (
    <Image
      source={SelectTexto}
      alt="Logo 15"
      style={{
        width: "50%",
        height: 130,
        position: 'absolute',
        left: '25%',
        top: '45%'
      }}
    />
  );

  const FundoLivre = () => (
    <Image
      source={Fundo}
      alt="Logo 15"
      style={{
        resizeMode: "contain",
        width: imageWidthFundo,
        height: imageHeightFundo,
        position: 'absolute',
        top: '91%'
      }}
    />
  );

  const conversarQuinze = async () => {
    const canOpen = await Linking.canOpenURL(whatsappQuinze);
    if (canOpen) {
      await Linking.openURL(whatsappQuinze);
    } else {
      console.log(`Não é possível abrir o link: ${whatsappQuinze}`);
    }
  };

  const acessarInstaQuinze = async () => {
    const canOpen = await Linking.canOpenURL(instagramQuinze);
    if (canOpen) {
      await Linking.openURL(instagramQuinze);
    } else {
      console.log(`Não é possível abrir o link: ${instagramQuinze}`);
    }
  };

  return (
    <ScrollView backgroundColor={'white'}>
      <HeaderEmpty title={`   Fala, ${username}, meu lindoo!`} />
      <View bgColor={'black'}>
        <VStack
          flex={1}
          p={5}
          bgColor={"white"}
          borderBottomRightRadius={25}
          borderTopLeftRadius={25}
          height={'100%'}
        >
          <Text style={styles.titleBlack}>SEU PRÓXIMO HORÁRIO É:</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitleBlack}>Dia: {dataProxAgenda} </Text>
          <Text style={styles.subtitleBlack}>Horário: {horarioProxAgenda}h</Text>
        </VStack>
      </View>

      
      <VStack
        flex={1}
        p={5}
        bgColor={"black"}
        borderTopLeftRadius={25}
        style={{
          paddingHorizontal: width * 0.05,
          paddingTop: height * 0.02,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={styles.retangulo}>
            <Text style={styles.letterInterna}> GOSTO DE</Text>
            <Text style={styles.letterInternaMaior}>
              Rock {'\n'}
              Café {'\n'}
              Futebol {'\n'}
              Games {'\n'}
            </Text>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 10, top: 10 }}>
            <Text style={styles.textPreferences}>
              E você {'\n'}
              meu lindo? {'\n'}
              O que {'\n'}
              prefere? {'\n'}
            </Text>
            <View bottom={8}>
              <Button
                title="Preferências"
                iconName="cafe-outline"
                width="100%"
                height={8}
                fontSize="14"
                fontFamily="semibold"
                textMarginTop={-1}
                paddingHorizontal={1}
                paddingVertical={3}
                iconTextSpace={5}
                onPress={() => navigation.navigate('Preferencias')}
              />
            </View>
            <View bottom={8}>
              <Button
                title="O Quinze"
                iconName="rocket-outline"
                width="100%"
                height={8}
                fontSize="14"
                fontFamily="semibold"
                textMarginTop={-1}
                paddingHorizontal={1}
                paddingVertical={3}
                iconTextSpace={5}
                onPress={() => navigation.navigate('MeConheca')}
              />
            </View>
          </View>
        </View>


        <View marginLeft={1}>
          <View bottom={5}>
            <Button
              title="Agendamentos"
              iconName="calendar-number-outline"
              width="50%"
              height={8}
              fontSize="14"
              fontFamily="semibold"
              textMarginTop={-1}
              paddingHorizontal={5}
              paddingVertical={3}
              iconTextSpace={4}
              onPress={() => navigation.navigate('Agenda')}
            />
          </View>
          <View bottom={5}>
            <Button
              title="        Planos   "
              iconName="cut-outline"
              width="50%"
              height={8}
              fontSize="14"
              fontFamily="semibold"
              textMarginTop={-1}
              paddingHorizontal={4}
              paddingVertical={3}
              iconTextSpace={7}
              onPress={() => navigation.navigate('Planos')}
            />
          </View>
          <View bottom={5}>
            <Button
              title="         Perfil   "
              iconName="person-circle-outline"
              width="50%"
              height={8}
              fontSize="14"
              fontFamily="semibold"
              textMarginTop={-1}
              paddingHorizontal={5}
              paddingVertical={3}
              iconTextSpace={8}
              onPress={() => navigation.navigate('Perfil')}
            />
          </View>
        </View>
      </VStack>

      <VStack bgColor={'black'}>
        <View style={styles.CaixaBranca}>

          <View style={styles.caixaPreta}>

            <TouchableOpacity onPress={() => conversarQuinze()}
            style={styles.whatsButton}

            >

              <Icon
                source="whatsapp"
                color="#BF183C"
                size={50}
                
              />

            </TouchableOpacity>

            {planoLogado === 'Standart' && <Text style={styles.textoPlano}>Standart</Text>}
            {planoLogado === 'Premium' && <Text style={styles.textoPlano}>Premium</Text>}
            {planoLogado === 'Select' && <Text style={styles.textoPlano}>Select</Text>}



            <TouchableOpacity onPress={() => acessarInstaQuinze()}
            style={styles.instaButton}

            >

              <Icon
                source="instagram"
                color="#BF183C"
                size={50}
              />

            </TouchableOpacity>

          </View>

        </View>

      </VStack>

      {mostrarSelect
        ?

        <TouchableOpacity
        onPress={() => navigation.navigate('Select')}
          style={{
            position: 'absolute',
            left: '39%',
            top: '60%',
            width: imageWidth,
            height: imageHeight,
            zIndex: 10,
          }}
        >
          <LogoSelect />

        </TouchableOpacity>

        :
        <View style={{
          position: 'absolute',
          left: '39%',
          top: '60%',
          width: imageWidth,
          height: imageHeight,
          zIndex: 10,
        }}>
          <LogoQuinzeApp />
        </View>
      }



    </ScrollView>
  );
};

const styles = StyleSheet.create({

  componenteBranco: {
    height: 100,
    width: '100%',
    backgroundColor: '#ffffff'
  },

  componenteWhite: {
    width: '100%',
    height: 2
  },

  title: {
    color: 'white',
    marginLeft: 10,
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20
  },
  titleBlack: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    marginTop: 1
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
    marginLeft: 10,
    width: '60%',
  },
  titleRed: {
    color: '#BF183C',
    marginLeft: 10,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20
  },
  customButton: {
    backgroundColor: '#ffffff', // cor de fundo do botão
    borderRadius: 10, // borda arredondada
    padding: 10, // preenchimento interno
    marginTop: 20, // margem superior
    alignItems: 'center', // centralizar conteúdo horizontalmente
    flexDirection: 'row'
  },

  customButtonText: {
    color: '#00053D', // cor do texto
    fontSize: 18, // tamanho da fonte
    fontWeight: 'bold', // peso da fonte
  },
  subtitle: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "300"
  },
  letterInterna: { // letra interna do retangulo
    color: 'white',
    fontSize: 13,
    fontWeight: "400",
    paddingRight: 60,
    paddingBottom: 5,
    paddingTop: 37
  },
  letterInternaMaior: { // letra interna do retangulo
    color: 'white',
    fontSize: 32,
    fontWeight: "bold",
    paddingRight: 5,
    paddingBottom: 1,
    lineHeight: 32
  },
  subtitleBlack: {
    color: 'black',
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold"
  },

  content: {
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "200",
  },

  contentBlack: {
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
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
    marginBottom: 10,
    marginTop: 15
  },
  image: {
    width: 300,
    height: 300,
  },
  retangulo: {
    width: 175,
    height: 175,
    backgroundColor: 'transparent',
    borderColor: '#FF214F',
    borderWidth: 2,
    borderRadius: 47,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  CaixaBranca: {
    width: '100%',
    height: 210,
    backgroundColor: 'white',
    borderColor: '#ffffff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: Platform.OS === 'ios' ? 300 : 125,
    borderTopRightRadius: Platform.OS === 'ios' ? 300 : 125,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  positionBtn: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  textPreferences: {
    marginTop: height * 0.03,
    color: 'white',
    marginLeft: width * 0.03,
    fontSize: width * 0.08,
    fontWeight: 'bold',
    lineHeight: width * 0.08,
  },
  caixaPreta: {
    width: '90%',
    height: 70,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 500,
    flexDirection: 'row',
    marginTop: 120
  },
  textoPlano: {
    color: 'black',
    fontSize: 32,
    fontWeight: "500",
  },
  instaButton:{
    marginRight: 20
  },
  whatsButton:{
    marginLeft: 20
  }

});

export default Home;

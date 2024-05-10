import { Image, ScrollView, VStack, View } from "native-base";
import React from 'react';
import { Alert, Dimensions, Platform, StyleSheet, Text } from 'react-native';
import LogoQuinze from "../assets/images/LOGO_quinzeBranco.png";
import { Button } from "../componentes/BotaoPersonalizado";
import FooterSairAdm from "../componentes/FooterSairAdm";
import HeaderEmpty from "../componentes/HeaderSemBtn";
import { auth } from "../config/firebase";
const { width, height } = Dimensions.get('window');

const usernameAdm = "Quinze";
const username = "--";
const dataProxAgenda = "--"
const horarioProxAgenda = "--"


//controle tamanho das imgs 

const imageWidth = Platform.OS === 'ios' ? 175 : 175;
const imageHeight = Platform.OS === 'ios' ? 175 : 175;

const ImagemLivre = () => (
  <Image
    source={LogoQuinze}
    alt="Logo 15"
    style={{
      width: imageWidth,
      height: imageHeight,
      position: 'absolute',
      alignSelf:"center",
      top: '71%'
    }}
  />
);

export default function HomeAdm({ navigation }) {

  
  function deslogar() {
    auth.signOut();
    navigation.replace('Login')
}


  return (
    <ScrollView backgroundColor={'white'}>
      <HeaderEmpty title={`   Fala, ${usernameAdm}, meu lindoo!`} />

      <View bgColor={'black'}>
        <VStack
          flex={1}
          p={5}
          bgColor={"white"}
          borderBottomRightRadius={25}
          borderTopLeftRadius={25}
        >
          <Text style={styles.titleBlack}>SEU PRÓXIMO HORÁRIO É:</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitleBlack}>Cliente: {username} </Text>
          <Text style={styles.subtitleBlack}>Dia: {dataProxAgenda} </Text>
          <Text style={styles.subtitleBlack}>Horário: {horarioProxAgenda} </Text>
          <Button
              title="Consultar informações"
              width="70%"
              height={7}
              fontSize="14"
              fontFamily="bold"
              textMarginTop={-1}
              paddingHorizontal={5}
              paddingVertical={0}
              iconTextSpace={8}
              iconSize={33} 
              marginTop={2}
              marginBottom={0}
              backgroundColor="transparent"
              textColor="black"
              onPress={() => Alert.alert('Função em desenvolvimento.')}
            />
        </VStack>
      </View>

      <VStack
        flex={1}
        p={5}
        bgColor={"black"}
        borderTopLeftRadius={25}
        style={{
          paddingHorizontal: width * 0.05,
          paddingTop: height * 0.15,
          paddingBottom: 20
        }}
      >
        

        <View marginLeft={1}>

            
          
            <Button
              title="              Clientes     "
              iconName="people-outline"
              width="100%"
              height={60}
              fontSize="24"
              fontFamily="bold"
              textMarginTop={-1}
              paddingHorizontal={5}
              paddingVertical={3}
              iconTextSpace={8}
              iconSize={33} 
              marginTop={-20}
              marginBottom={4}
              onPress={() => navigation.navigate('Clientes')}
            />
          
            <Button
              title="        Agendamentos"
              iconName="cut-outline"
              width="100%"
              height={60}
              fontSize="24"
              fontFamily="bold"
              textMarginTop={-1}
              paddingHorizontal={4}
              paddingVertical={3}
              iconTextSpace={7}
              iconSize={33} 
              marginBottom={4}
              onPress={() => navigation.navigate('AprovacaoHorario')}
            />

            <Button
              title="           Autorizações"
              iconName="person-circle-outline"
              width="100%"
              height={60}
              fontSize="24"
              fontFamily="bold"
              textMarginTop={-1}
              paddingHorizontal={5}
              paddingVertical={3}
              iconTextSpace={8}
              iconSize={33} 
              marginBottom={20}
              onPress={() => navigation.navigate('Autorizacoes')}
            />
       
        </View>

      </VStack>
 
      <VStack bgColor={'black'} height={150} >
        <View style={styles.CaixaBranca}>
        
        
        
        </View>
      </VStack>

      <View bgColor={"white"}>

        <VStack flex={1} p={0.5} bgColor={"white"}
          borderBottomRightRadius={25}
          borderTopLeftRadius={25}>

            <FooterSairAdm logout={deslogar} />
        </VStack>

      </View>


      <View bgColor={"white"}>
        <VStack flex={1} p={0.3} bgColor={"white"} 
          borderBottomRightRadius={25}
          borderTopLeftRadius={25}>
        </VStack>
      </View>

      <ImagemLivre/>

    </ScrollView>



  );
}

const styles = StyleSheet.create({

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
  },

  customButtonText: {
    color: 'black', // cor do texto
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
    height: '100%',
    backgroundColor: 'white',
    borderColor: '#ffffff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: Platform.OS === 'ios' ? 175 : 150,
    borderTopRightRadius: Platform.OS === 'ios' ? 175 : 150,
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

})

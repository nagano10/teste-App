import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, Input, Radio, ScrollView, VStack, View } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HeaderDefault from '../assets/HeaderDefault';
import TecladoCustom from '../componentes/TecladoCustom';
import { atualizarPreferencias } from '../servicos/requisicoesFirebase';

export default function Preferencias() {

  const [loading, setLoading] = useState(true);
  const [bebida, setbebida] = useState(null);
  const [comida, setcomida] = useState(null);
  const [esporteFavorito, setEsporteFavorito] = useState('');
  const [timeFavorito, setTimeFavorito] = useState('');
  const [generoFavorito, setGeneroFavorito] = useState('');
  const [artistaFavorito, setArtistaFavorito] = useState('');
  const [hobby, setHobby] = useState('');

  async function realizarCadastro() {
    
    const resultado = await atualizarPreferencias(bebida, comida, esporteFavorito, timeFavorito, generoFavorito, artistaFavorito, hobby)
        if (resultado === "Sucesso!") {
            setbebida(null);
            setcomida(null);
            setEsporteFavorito('');
            setTimeFavorito('');
            setGeneroFavorito('');
            setArtistaFavorito('');
            setHobby('');
            Alert.alert(resultado, "Alteração concluída com sucesso!")
        } else {
            Alert.alert(resultado);
            console.log("erro")
        }
    }




  const handleConfirm = () => {
    if (
      bebida &&
      comida &&
      esporteFavorito &&
      timeFavorito &&
      generoFavorito &&
      artistaFavorito &&
      hobby
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
            onPress: () => { realizarCadastro()
              
            },
          },
        ],
      );
    } else {
      // Mostrar erro se algum campo estiver vazio
      Alert.alert('Campos em branco', 'Por favor, preencha todos os campos antes de confirmar.');
    }
  };

  return (
    <View bgColor={'black'}>
      <ScrollView contentContainerStyle={styles.container}>
        <TecladoCustom>
          <HeaderDefault title="Preferências" />
          <VStack flex={1} p={5} bgColor={'black'}>
            <Text style={styles.title}>Fale sobre você</Text>
            <Text style={styles.content}>Selecione suas preferências</Text>
            <Text style={styles.title}>Bebidas</Text>
            <HStack space={4}>
              <Radio.Group name="bebidas" accessibilityLabel="bebida favorita"
                value={bebida} onChange={nextValue => { setbebida(nextValue) }}>
                <Box style={styles.radioBox}>
                  <Icon
                    as={<Feather name={"coffee"} />}
                    size="50"
                    m={1}
                    color="white"
                    marginLeft={1}
                    marginRight={2}
                  />
                  <Text style={styles.radioBoxContent}>Café</Text>
                  <Radio value="Cafe" colorScheme="red" aria-label="Café" marginRight={1} />
                </Box>
                <Box style={styles.radioBox}>
                  <Icon
                    as={<MaterialCommunityIcons name={"tea-outline"} />}
                    size="50"
                    m={1}
                    color="white"
                    marginLeft={1}
                  />
                  <Text style={styles.radioBoxContent}>Chá</Text>
                  <Radio value="Cha" colorScheme="red" aria-label="cha" marginRight={1} />
                </Box>
                <Box style={styles.radioBox}>
                  <Icon
                    as={<Ionicons name={"water-outline"} />}
                    size="50"
                    m={1}
                    color="white"
                    marginLeft={1}
                  />
                  <Text style={styles.radioBoxContent}>Água</Text>
                  <Radio value="Agua" colorScheme="red" aria-label="agua" marginRight={1} />
                </Box>
              </Radio.Group>
            </HStack>
            <Text style={styles.title}>Comidas</Text>
            <HStack space={4}>
              <Radio.Group name="Comidas" accessibilityLabel="Comida favorita"
                value={comida} onChange={nextValue => { setcomida(nextValue) }}>
                <Box style={styles.radioBox}>
                  <Icon
                    as={<MaterialCommunityIcons name={"candy-outline"} />}
                    size="50"
                    m={1}
                    color="white"
                    marginLeft={1}
                  />
                  <Text style={styles.radioBoxContent}>Doces</Text>
                  <Radio value="Doces" colorScheme="red" aria-label="doce" marginRight={1} />
                </Box>
                <Box style={styles.radioBox}>
                  <Icon
                    as={<MaterialCommunityIcons name={"popcorn"} />}
                    size="50"
                    m={1}
                    color="white"
                    marginLeft={1}
                  />
                  <Text style={styles.radioBoxContent}>Salgados</Text>
                  <Radio value="Salgados" colorScheme="red" aria-label="salgado" marginRight={1} />
                </Box>
              </Radio.Group>
            </HStack>
            <Text style={styles.title}>Esportes</Text>
            <Box style={styles.radioBox}>
              <Icon
                as={<MaterialIcons name={"sports-soccer"} />}
                size="50"
                m={1}
                color="white"
                marginLeft={1}
                marginRight={3}
              />
              <TecladoCustom>
                <VStack space={1}>
                  <Text style={styles.content}>Qual seu <Text style={{ fontWeight: 'bold' }}>esporte</Text> favorito?</Text>
                  <Input
                    placeholder={"Escreva aqui"}
                    size='lg'
                    w="90%"
                    borderRadius='15px'
                    borderColor='red.300'
                    bgColor='black'
                    color='white'
                    borderWidth={2}
                    focusOutlineColor='red.300'
                    py={2}
                    value={esporteFavorito}
                    onChangeText={esporteFavorito => setEsporteFavorito(esporteFavorito)}
                  />
                </VStack>
              </TecladoCustom>
            </Box>
            <Box style={styles.radioBox}>
              <Icon
                as={<Feather name={"heart"} />}
                size="50"
                m={1}
                color="white"
                marginLeft={1}
                marginRight={3}
              />
              <TecladoCustom>
                <VStack space={1}>
                  <Text style={styles.content}>Qual seu <Text style={{ fontWeight: 'bold' }}>time</Text> do coração?</Text>
                  <Input
                    placeholder={"Escreva aqui"}
                    size='lg'
                    w="90%"
                    borderRadius='15px'
                    borderColor='red.300'
                    bgColor='black'
                    color='white'
                    borderWidth={2}
                    focusOutlineColor='red.300'
                    py={2}
                    value={timeFavorito}
                    onChangeText={timeFavorito => setTimeFavorito(timeFavorito)} />
                </VStack>
              </TecladoCustom>
            </Box>
            <Text style={styles.title}>Estilo musical</Text>
            <Box style={styles.radioBox}>
              <Icon
                as={<Feather name={"music"} />}
                size="50"
                m={1}
                color="white"
                marginLeft={1}
                marginRight={3}
              />
              <TecladoCustom>
                <VStack space={1}>
                  <Text style={styles.content}>Que <Text style={{ fontWeight: 'bold' }}>som</Text> voce curte?</Text>
                  <Input
                    placeholder={"Escreva aqui"}
                    size='lg'
                    w="90%"
                    borderRadius='15px'
                    borderColor='red.300'
                    bgColor='black'
                    color='white'
                    borderWidth={2}
                    focusOutlineColor='red.300'
                    py={2}
                    value={generoFavorito}
                    onChangeText={generoFavorito => setGeneroFavorito(generoFavorito)} />
                </VStack>
              </TecladoCustom>
            </Box>
            <Box style={styles.radioBox}>
              <Icon
                as={<MaterialCommunityIcons name={"microphone-outline"} />}
                size="50"
                m={1}
                color="white"
                marginLeft={1}
                marginRight={3}
              />
              <TecladoCustom>
                <VStack space={1}>
                  <Text style={styles.content}>Qual seu <Text style={{ fontWeight: 'bold' }}>artista</Text> favorito?</Text>
                  <Input
                    placeholder={"Escreva aqui"}
                    size='lg'
                    w="90%"
                    borderRadius='15px'
                    borderColor='red.300'
                    bgColor='black'
                    color='white'
                    borderWidth={2}
                    focusOutlineColor='red.300'
                    py={2}
                    value={artistaFavorito}
                    onChangeText={artistaFavorito => setArtistaFavorito(artistaFavorito)} />
                </VStack>
              </TecladoCustom>
            </Box>
            <Text style={styles.title}>Hobby</Text>
            <Box style={styles.radioBox}>
              <Icon
                as={<Ionicons name={"game-controller-outline"} />}
                size="50"
                m={1}
                color="white"
                marginLeft={1}
                marginRight={3}
              />
              <TecladoCustom>
                <VStack space={1}>
                  <Text style={styles.content}>Qual o seu <Text style={{ fontWeight: 'bold' }}>Hobby</Text>?</Text>
                  <Input
                    placeholder={"Escreva aqui"}
                    size='lg'
                    w="90%"
                    borderRadius='15px'
                    borderColor='red.300'
                    bgColor='black'
                    color='white'
                    borderWidth={2}
                    focusOutlineColor='red.300'
                    py={2}
                    value={hobby}
                    onChangeText={hobby => setHobby(hobby)} />
                </VStack>
              </TecladoCustom>
            </Box>


            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

          </VStack>
        </TecladoCustom>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
    marginBottom: 25,
  },
  radioBox: {
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
  radioBoxContent: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 30
  },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: 'black',
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
    color: 'white',
    fontSize: 25,
    fontWeight: "bold"
  },
});

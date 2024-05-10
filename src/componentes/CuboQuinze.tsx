// CuboLogo.js

import React from 'react';
import { Image, View } from 'react-native';
import CuboQuinze from '../assets/Cubo.png';

const CuboLogo = () => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end', // alinha no eixo principal no final da pagina 
        position: 'absolute',
        bottom: 0, // mantem a img na parte inferior
        flex: 1, // Usa o máximo de espaço disponível no eixo principal
        backgroundColor:'black',
        marginTop: 10
      }}
    >
      <Image
        source={CuboQuinze}
        alt="Cubo Quinze"
        style={{
          width: 30,
          height: 35,
          marginBottom: 8, // Adiciona margem inferior se necessário
        }}
      />
    </View>
  );
};

export default CuboLogo;

// extende a biblioteca do native base

import { extendTheme } from "native-base";

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
      fontFamily: 'urbanist',
      // Outros estilos...
    },
  });

export const TEMAS = extendTheme({
    colors: {
        blue: {
            800: '#00053D'
        },
        red: {
            300: '#FF214F'
        },
        black: '#000',
        white: '#fff'
    },
    //padronizando o tamanho da fonte
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24
    }
})

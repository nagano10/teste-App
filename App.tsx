//NativeBase Provider facilita a aplicação consistente de estilos e temas em todos os componentes NativeBase no aplicativo.
import { NativeBaseProvider, StatusBar } from 'native-base';
//importa os temas criado na pasta de estilos
import Rotas from './src/Rotas';
import { TEMAS } from './src/estilos/temas';





// importo a tela Login, criada no arquivo SRC
export default function App() {
  return (
    //função chama o Native Base que aplica auxilia na aplicação e manipulação do tema. No StatusBar, chama o background color, que puxa
    // a cor do tema, aplicando o preto na nav bar.
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.black} />
      <Rotas/>
    </NativeBaseProvider> 


  );
}

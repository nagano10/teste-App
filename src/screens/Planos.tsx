import { Box, Image, ScrollView, VStack, View } from "native-base";
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import HeaderDefault from "../assets/HeaderDefault";
import PlanoQuinzeGIF from "../assets/images/PlanoQuinzeGIF.gif";
import QuinzeClube from "../assets/images/QuinzeClube.gif";


export default function Planos() {

    return (



        <ScrollView backgroundColor={'white'}>


            <HeaderDefault title={"Planos"} />

            <View bgColor={'black'}>

                <VStack flex={1} p={5} bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}
                    alignItems="center">
                        
                    <View style={styles.imageContainer}>
                        <Image
                            source={QuinzeClube}
                            alt="Beneficios15"
                            style={styles.image}
                        />
                    </View>
                </VStack>

            </View>

            <VStack flex={1} p={5} bgColor={"black"} borderTopLeftRadius={25} borderBottomRightRadius={25}>

                <Text style={styles.title}>CLUBE 15</Text>
                <Text style={styles.subtitle}>Atendimento personalizado</Text>
                <Text style={styles.content}>
                    Simetria, harmonização e requinte, isso é Clube 15!
                    Desfrute do melhor da Quinze Barbearia.
                    Com benefícios exclusivos, como horários fixos,
                    cortes de cabelo e barboterapias garantidos,
                    itens personalizados e o melhor atendimento.
                    Sejam bem-vindos ao nosso seleto grupo. EXPLUDIU!</Text>
            </VStack>
            <View bgColor={"black"}>

                <VStack flex={1} p={5} bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}>

                    <Image
                        source={PlanoQuinzeGIF}
                        alt="Beneficios15"
                        style={{ width: 300, height: 300, marginLeft: 35.5 }}
                    />

                </VStack>
            </View>

            <VStack flex={1} p={5} bgColor={"black"} borderTopLeftRadius={25}>
                <Text style={styles.title}>Standart</Text>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 2 Cortes de cabelo (Ao mes)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 2 Barba e baboterapia (Ao mes)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 2 Toalhas com o nome bordado (Exclusivo)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 1 Almofada do 15 (Personalizada)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> Água mineral personalizada</Text>
                </Box>


                <Text style={styles.title}>Premium</Text>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 4 Cortes de cabelo (Ao mes)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 4 Barba e baboterapia (Ao mes)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 2 Toalhas com o nome bordado (Exclusivo)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> 1 Almofada do 15 (Personalizada)</Text>
                </Box>

                <Box style={styles.Box}>
                    <Text style={styles.tableContent}> Água mineral personalizada</Text>
                </Box>

            </VStack>


        </ScrollView>



    );
}

const styles = StyleSheet.create({
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
    image: {
        width: 300,
        height: 300,
    },

})

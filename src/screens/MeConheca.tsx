import { Image, ScrollView, VStack, View } from "native-base";
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import HeaderDefault from "../assets/HeaderDefault";
import LogoQuinze from "../assets/images/LogoQuinze.png";
import estudosQuinze from "../assets/images/estudosQuinze.gif";
import frutosQuinze from "../assets/images/frutosQuinze.gif";
import inicioQuinze from "../assets/images/inicioQuinze.gif";


export default function MeConheca() {

    return (



        <ScrollView backgroundColor={'white'}>


            <HeaderDefault title={"O Quinze"} />

            <View bgColor={'black'}>

                <VStack flex={1} p={5} bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}
                >

                    <Text style={styles.titleBlack}>Emerson Pacheco</Text>
                    <Text style={styles.subtitleBlack}>O sonhador</Text>
                    <Text style={styles.contentBlack}>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                        Morbi vulputate dapibus justo,
                        eu fringilla justo imperdiet eu.
                        Maecenas dictum sapien in cursus malesuada.
                        Sed congue vulputate sem ut porta.
                        Quisque bibendum quam a mattis dictum.</Text>
                </VStack>

            </View>

            <VStack flex={1} p={5} bgColor={"black"} borderTopLeftRadius={25}>
                <Text style={styles.title}>O inicio de tudo</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={inicioQuinze}
                        alt="inicioQuinze"
                        style={styles.image}
                    />
                </View>


            </VStack>

            <View bgColor={"white"}>

                <VStack flex={1} p={0.3} bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}>
                </VStack>

            </View>

            <VStack flex={1} p={5} bgColor={"black"}>
                <Text style={styles.title}>O garimpo</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={estudosQuinze}
                        alt="Beneficios15"
                        style={styles.image}
                    />
                </View>


            </VStack>

            <View bgColor={"white"}>
                <VStack flex={1} p={0.3} bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}>
                </VStack>
            </View>

            <VStack flex={1} p={5} bgColor={"black"} borderBottomRightRadius={25}>
                <Text style={styles.title}>Os frutos</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={frutosQuinze}
                        alt="frutosQuinze"
                        style={styles.image}
                    />
                </View>


            </VStack>

            <View bgColor={'black'}>

                <VStack flex={1} p={5} bgColor={"white"}
                    borderBottomRightRadius={25}
                    borderTopLeftRadius={25}
                >

                    <Text style={styles.titleRed}>Quinze barbeiro</Text>
                    <Text style={styles.subtitleBlack}>O vitorioso</Text>
                    <Text style={styles.contentBlack}>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                        Morbi vulputate dapibus justo,
                        eu fringilla justo imperdiet eu.
                        Maecenas dictum sapien in cursus malesuada.
                        Sed congue vulputate sem ut porta.
                        Quisque bibendum quam a mattis dictum.</Text>
                </VStack>

            </View>

            <VStack flex={1} alignItems="center" p={5} bgColor={'black'} 
            justifyContent="center" 
            borderTopLeftRadius={25}>
                <Image
                    source={LogoQuinze}
                    alt="Logo 15"
                    style={{ width: 200, height: 200, marginTop: 20, marginBottom: 15 }}
                />

                <Text style={styles.title}>TO BE CONTINUED...</Text>


            </VStack>

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
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 20
    },
    titleRed: {
        color: '#BF183C',
        marginLeft: 10,
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 20
    },
    subtitle: {
        color: 'white',
        marginLeft: 10,
        fontSize: 25,
        fontWeight: "300"
    },
    subtitleBlack: {
        color: 'black',
        marginLeft: 10,
        fontSize: 25,
        fontWeight: "300"
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
    divider: {
        height: 0.1,
        backgroundColor: 'white',
        marginVertical: 10, // Ajuste conforme necessário
    },
})

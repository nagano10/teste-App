import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";

const Tab = createNativeStackNavigator();



import Cadastro from "./screens/Cadastro";

// Acessando o APP
import Agenda from "./screens/Agenda";
import AprovacaoHorario from './screens/AprovacaoHorario';
import Autorizacoes from './screens/Autorizacoes';
import Clientes from './screens/Clientes';
import Home from "./screens/Home";
import HomeAdm from "./screens/HomeAdm";
import Login from "./screens/Login";
import MeConheca from "./screens/MeConheca";
import Perfil from './screens/Perfil';
import Planos from "./screens/Planos";
import Preferencias from "./screens/Preferencias";
import { Select } from './screens/Select';


export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Login" component={Login} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Cadastro" component={Cadastro} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Home" component={Home} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Agenda" component={Agenda} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Planos" component={Planos} options={{ headerShown: false }}
                />

                <Tab.Screen
                    name="Preferencias" component={Preferencias} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="HomeAdm" component={HomeAdm} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="MeConheca" component={MeConheca} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Perfil" component={Perfil} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Select" component={Select} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Autorizacoes" component={Autorizacoes} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Clientes" component={Clientes} options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="AprovacaoHorario" component={AprovacaoHorario} options={{ headerShown: false }}
                />
             
            </Tab.Navigator>


        </NavigationContainer>
    )
}
import React from 'react';
import Homescreen from './screens/homescreen';
import Connexion from './screens/connexion';
import Inscription from './screens/inscription';
import Loginsucces from './screens/loginsucces';
import Resetpass from './screens/resetpass';
import Profil from './screens/profil';
import ListeProduct from './screens/listeProduct';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
import Store from './store/configStore';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homescreen" component={Homescreen}/>
          <Stack.Screen name="Connexion" component={Connexion}/>
          <Stack.Screen name="Inscription" component={Inscription}/>
          <Stack.Screen name="Loginsucces" component={Loginsucces}/>
          <Stack.Screen name="Resetpass" component={Resetpass}/>
          <Stack.Screen name="Profil" component={Profil}/>
          <Stack.Screen name="ListeProduct" component={ListeProduct}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    );
}



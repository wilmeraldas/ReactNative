import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/HomeScreen';
import FriendsScreen from './component/FriendsScreen';
import inicio from './component/inicio';
import pantalla from './component/pantalla';
import Registro from './component/Registro';
import NSolicitud from './component/NSolicitud';
import VSolicitud from './component/VSolicitud';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Registro"
            component={Registro}
            
          />
        <Stack.Screen
            name="Sol"
            options={({ navigation }) => ({
              title: 'Solicitudes',
              //headerLeft: null
               
            })}
            component={VSolicitud}
          />

        <Stack.Screen
            name="Login"
            options={({ navigation }) => ({
              title: 'Login',
              headerLeft: null
               
            })}
            component={pantalla}
          />

<Stack.Screen
            name="NSolicitud"
            options={({ navigation }) => ({
              title: 'Nueva Solicitud',
              headerLeft: null
               
            })}
            component={NSolicitud}
          />
<Stack.Screen
            name="Inicio"
            options={({ navigation }) => ({
              title: 'Solicitudes',
              headerLeft: null
               
            })}
            component={inicio}
          />
        
  

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          
          <Stack.Screen
            name="Friends"
            component={FriendsScreen}
          />
         

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
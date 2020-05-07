/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';
import EditAlarmScreen from './Pages/EditAlarmScreen';
import EditAlarmCoordinatesMap from './Pages/EditAlarmCoordinatesMap';
import {Button, Root, Header} from 'native-base';
import Alarm from './Model/Alarm';
import Database from './Model/Database';


// const [initializing, setInitializing] = useState(true);
// const [user, setUser] = useState();

const Stack = createStackNavigator();
class App extends React.Component {
  constructor() {
    super();
    Database.initDB();
  }

  render() {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Edit" component={EditAlarmScreen} />
            <Stack.Screen
              name="EditCoordinates"
              component={EditAlarmCoordinatesMap}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}

export default App;

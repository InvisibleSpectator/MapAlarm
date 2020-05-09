/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import getTheme from './native-base-theme/components';
import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';
import EditAlarmScreen from './Pages/EditAlarmScreen';
import EditAlarmCoordinatesMap from './Pages/EditAlarmCoordinatesMap';
import {Root, StyleProvider} from 'native-base';
import Database from './Model/Database';
import I18n from 'react-native-i18n';
import en from './Pages/localization/en.json';
import ru from './Pages/localization/ru.json';
import material from './native-base-theme/variables/material';
// const [initializing, setInitializing] = useState(true);
// const [user, setUser] = useState();

const Stack = createStackNavigator();

I18n.fallbacks = true;

I18n.translations = {
  en,
  ru,
};

class App extends React.Component {
  constructor() {
    super();
    Database.initDB();
  }

  render() {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" headerMode="none">
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';
import {Button, Root} from 'native-base';

// const [initializing, setInitializing] = useState(true);
// const [user, setUser] = useState();

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Home"
              options={{
                headerLeft: () => (
                  <Button color="#12351" onPress={() => this.props.nav} />
                ),
              }}
              component={HomeScreen}
            />
            {/* <Stack.Screen name="Edit" component={EditAlarmScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}

export default App;

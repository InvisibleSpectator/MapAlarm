import React from 'react';

import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
function MapScreen() {
  return <View />;
}

function AlarmCards() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} />
  );
}
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Drawer.Navigator initialRouteName="Map">
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="AlarmCards" component={AlarmCards} />
        </Drawer.Navigator>
      </View>
    );
  }
}

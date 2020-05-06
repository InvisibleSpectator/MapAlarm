import React from 'react';

import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import DrawerContent from './Components/DrawerContent';

import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Body,
  Right,
  Content,
  Drawer,
  Card,
  CardItem,
  Text,
  Fab,
} from 'native-base';

import MapView from 'react-native-maps';
import Database from '../Model/Database';
import MapAlarmCard from './Components/MapAlarmCard';

export default class EditAlarmCoordinatesMap extends React.Component {
  render() {
    return (
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        onPress={e => {
          this.props.route.params.getCoords(e.nativeEvent.coordinate);
          this.props.navigation.goBack();
        }}
      />
    );
  }
}

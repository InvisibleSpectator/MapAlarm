import React from 'react';

import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import DrawerContent from './Components/DrawerContent'

import { Container, Header, Left, Icon, Button, Body, Right, Content, Drawer, Card, CardItem, Text, Fab } from 'native-base';

import MapView, { Marker, Callout } from 'react-native-maps';
import Alarm from '../Model/Alarm';
import Database from '../Model/Database';
import MapAlarmCard from './Components/MapAlarmCard';

// const Drawer = createDrawerNavigator();
// function MapScreen() {
//   return <View />;
// }


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { alarms: [] };
    this.getAlarms = this.getAlarms.bind(this);
    Database.selectAll(this.getAlarms);
  }

  getAlarms(a) {
    this.setState(state => { return { ...state, alarms: a } });
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => { this.drawer._root.open() };

  editorFunction = () => { Database.selectAll(this.getAlarms, () => { this.props.navigation.navigate('Home') }) }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<DrawerContent navigator={this.navigator} navigation={this.props.navigation} alarms={this.state.alarms} onDelete={() => { Database.selectAll(this.getAlarms) }} onEdit={this.editorFunction} onSelect={(coords) => {let region ={ ...coords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };console.log(region);this.closeDrawer(); this.map.animateToRegion(region,1); }} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon type='MaterialIcons' name='menu' />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
          <MapView
            ref={(ref) => { this.map = ref; }}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {this.state.alarms.filter((alarm) => alarm.isActive && alarm.isLocationBound).map(alarm => <MapAlarmCard navigation={this.props.navigation} alarm={alarm} onDelete={() => { Database.selectAll(this.getAlarms) }} onEdit={this.editorFunction} />)}
          </MapView>
          <Fab onPress={() => { this.props.navigation.navigate('Edit', { alarm: JSON.stringify(new Alarm()), ret: this.editorFunction }) }}>
            <Icon type='MaterialIcons' name='add' />
          </Fab>
        </Container>
      </Drawer>
    );
  }
}

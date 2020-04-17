import React from 'react';

import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Container, Header, Left, Icon, Button, Body, Right, Content, Drawer } from 'native-base';

// const Drawer = createDrawerNavigator();
// function MapScreen() {
//   return <View />;
// }

// function AlarmCards() {
//   return (
//     <Content></Content>
//   );
// }

export default class HomeScreen extends React.Component {

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => { this.drawer._root.open() };


  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<View navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
        </Container>
      </Drawer>
    );
  }
}

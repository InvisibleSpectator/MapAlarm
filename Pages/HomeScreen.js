import React from 'react';

import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Container, Header, Left, Icon, Button, Body, Right, Content, Drawer, Card, CardItem, Text } from 'native-base';

import MapView from 'react-native-maps';

// const Drawer = createDrawerNavigator();
// function MapScreen() {
//   return <View />;
// }

function AlarmCards() {
  return (
    <Content>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem>
          <Text>
            Мышь
    </Text>
        </CardItem>
      </Card>
    </Content>
  );
}

export default class HomeScreen extends React.Component {

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => { this.drawer._root.open() };


  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<AlarmCards navigator={this.navigator} />}
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
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </Container>
      </Drawer>
    );
  }
}

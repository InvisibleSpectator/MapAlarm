import React from 'react';

import DrawerContent from './Components/DrawerContent';
import GPSbackground from './Components/GPSbackground';

import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Body,
  Right,
  Drawer,
  Fab,
} from 'native-base';

import MapView, {Marker} from 'react-native-maps';
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
    this.state = {
      alarms: [],
      coordinates: {latitude: 0, longitude: 0},
      rotation: 0,
    };
    this.getAlarms = this.getAlarms.bind(this);
    // Geolocation.getCurrentPosition(
    //   info => {
    //     console.log(info);
    //   },
    //   info => {
    //     console.log(info);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     maximumAge: 10000,
    //   },
    // );
    // Geolocation.watchPosition((...params) => {
    //   console.log(...params);
    // });
    Database.selectAll(this.getAlarms);
  }

  getAlarms(a) {
    this.setState(state => {
      return {...state, alarms: a};
    });
  }

  // componentWillUnmount() {
  //   Geolocation.stopObserving();
  // }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  editorFunction = () => {
    Database.selectAll(this.getAlarms, () => {
      this.props.navigation.navigate('Home');
    });
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <DrawerContent
            navigator={this.navigator}
            navigation={this.props.navigation}
            alarms={this.state.alarms}
            onDelete={() => {
              Database.selectAll(this.getAlarms);
            }}
            onEdit={this.editorFunction}
            onSelect={coords => {
              let region = {
                ...coords,
                latitudeDelta: 0,
                longitudeDelta: 0,
              };
              this.closeDrawer();
              this.map.animateToRegion(region, 1);
            }}
          />
        }
        onClose={() => this.closeDrawer()}>
        <GPSbackground
          config={{distance: 50, sendInterval: 20}}
          getCoords={coords => {
            this.setState({
              coordinates: {
                latitude: coords.latitude,
                longitude: coords.longitude,
              },
              rotation: coords.rotation,
            });
            this.map.animateToRegion(
              {...coords, latitudeDelta: 0.01, longitudeDelta: 0.01},
              1,
            );
          }}
        />
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon type="MaterialIcons" name="menu" />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            style={{flex: 1}}
            initialRegion={{
              ...this.state.coordinates,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            {this.state.alarms
              .filter(alarm => alarm.isActive && alarm.isLocationBound)
              .map(alarm => (
                <MapAlarmCard
                  key={JSON.stringify(alarm)}
                  navigation={this.props.navigation}
                  alarm={alarm}
                  onDelete={() => {
                    Database.selectAll(this.getAlarms);
                  }}
                  onEdit={this.editorFunction}
                />
              ))}
            <Marker
              image={
                'https://yastatic.net/s3/home/covid/big/covid_rus_icon.svg'
              }
              coordinate={this.state.coordinates}
              rotation={this.state.rotation}>
              <Icon type="MaterialIcons" name="navigation" />
            </Marker>
          </MapView>
          <Fab
            onPress={() => {
              this.props.navigation.navigate('Edit', {
                alarm: JSON.stringify({
                  ...new Alarm(),
                  location: this.state.coordinates,
                }),
                ret: this.editorFunction,
              });
            }}>
            <Icon type="MaterialIcons" name="add" />
          </Fab>
        </Container>
      </Drawer>
    );
  }
}

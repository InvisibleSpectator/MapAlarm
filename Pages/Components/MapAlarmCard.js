import React, {Component} from 'react';
import {format} from 'date-fns';
import Database from '../../Model/Database';
import {Marker, Callout, Circle} from 'react-native-maps';
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Container,
} from 'native-base';
export default class MapAlarmCard extends React.Component {
  render() {
    return (
      <Container>
        {/* <Circle center={this.props.alarm.location} radius={50} /> */}
        <Marker coordinate={this.props.alarm.location}>
          <Callout>
            <Content>
              <Card>
                <CardItem header>
                  <Text>{this.props.alarm.name}</Text>
                </CardItem>
                <CardItem>
                  <Text>
                    {format(new Date(this.props.alarm.time), 'HH:mm')}
                  </Text>
                </CardItem>
                {/* <CardItem >
                <Button icon onPress={() => { Database.deleteAlarm(this.props.alarm.id, this.props.onDelete) }} >
                  <Icon type='MaterialIcons' name='delete' />
                </Button>
                <Button icon onPress={
                  () => {
                    this.props.navigation.navigate('Edit', { alarm: JSON.stringify(this.props.alarm), ret: this.props.onEdit })
                  }
                } >
                  <Icon type='MaterialIcons' name='edit' />
                </Button>
              </CardItem> */}
              </Card>
            </Content>
          </Callout>
        </Marker>
      </Container>
    );
  }
}

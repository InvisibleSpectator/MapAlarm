import React from 'react';
import {Card, CardItem, Text, Switch, Icon, Button} from 'native-base';
import {format} from 'date-fns';
import Database from '../../Model/Database';
import RNToastLibraryTest from 'react-native-alarm-location-amik';

export default class DrawerAlarmCArd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.alarm, time: new Date(props.alarm.time)};
  }

  render() {
    return (
      <Card onPress={this.props.onSelect}>
        <CardItem header onPress={this.props.onSelect}>
          <Text>{this.state.name}</Text>
        </CardItem>
        <CardItem>
          <Text>{format(this.state.time, 'HH:mm')}</Text>
          <Icon
            type="MaterialIcons"
            onPress={() => {
              if (this.state.isActive && this.state.isLocationBound)
                this.props.onSelect(this.state.location);
            }}
            style={{position: 'absolute', right: 12, color: '#32505C'}}
            name={this.state.isLocationBound ? 'location-on' : 'location-off'}
          />
        </CardItem>
        <CardItem>
          <Button
            icon
            transparent
            onPress={() => {
              Database.getById(this.props.alarm.id, alarmToRemove => {
                alarmToRemove.time = new Date(alarmToRemove.time).getHours() + ":" + new Date(alarmToRemove.time).getMinutes();
                RNToastLibraryTest.unschedule(JSON.stringify(alarmToRemove));
                Database.deleteAlarm(this.props.alarm.id, this.props.onDelete);
              });
            }}>
            <Icon type="MaterialIcons" name="delete" />
          </Button>
          <Button
            icon
            transparent
            onPress={() => {
              this.props.navigation.navigate('Edit', {
                alarm: JSON.stringify(this.props.alarm),
                ret: this.props.onEdit,
              });
            }}>
            <Icon type="MaterialIcons" name="edit" />
          </Button>
          <Switch
            value={Boolean(this.state.isActive)}
            style={{position: 'absolute', right: 0}}
            onChange={() => {
              Database.updateAlarm(
                {
                  ...this.state,
                  time: this.state.time.getTime(),
                  isActive: !this.state.isActive,
                },
                () => {
                  Database.getById(this.props.alarm.id, updatedAlarm => {
                    updatedAlarm.time = new Date(updatedAlarm.time).getHours() + ":" + new Date(updatedAlarm.time).getMinutes();
                    RNToastLibraryTest.schedule(JSON.stringify(updatedAlarm));
                    this.props.onDelete();
                  });
                }
              );
            }}
          />
        </CardItem>
      </Card>
    );
  }
}

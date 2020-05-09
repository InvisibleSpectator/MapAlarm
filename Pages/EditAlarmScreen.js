import React from 'react';
import {
  Container,
  Button,
  Icon,
  Textarea,
  Header,
  Left,
  Body,
  Right,
  Content,
  Text,
  Item,
  Label,
  Input,
  ListItem,
  CheckBox,
  Switch,
  StyleProvider,
} from 'native-base';
import TimePicker from 'react-native-simple-time-picker';
import {format} from 'date-fns';
import Database from '../Model/Database';
import I18n from 'react-native-i18n';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class EditAlarmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alarm: JSON.parse(this.props.route.params.alarm),
      showTimepicker: false,
    };
    //console.log(this.state.alarm.options);
    //this.weekdaysKeys = Object.keys(this.state.alarm.options);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body />
          <Right>
            <Button
              transparent
              onPress={() => {
                if (this.state.alarm.id === 0)
                  Database.addAlarm(
                    this.state.alarm,
                    this.props.route.params.ret,
                  );
                else
                  Database.updateAlarm(
                    this.state.alarm,
                    this.props.route.params.ret,
                  );
              }}>
              <Icon type="MaterialIcons" name="done" />
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem>
            <Item floatingLabel>
              <Label>{I18n.t('name')}</Label>
              <Input
                onChangeText={text => this.setState({name: text})}
                value={this.state.alarm.name}
              />
            </Item>
          </ListItem>
          <ListItem style={{justifyContent: 'space-between'}}>
            <Label>{I18n.t('time')}</Label>
            <Label onPress={() => this.setState({showTimepicker: true})}>
              {format(new Date(this.state.alarm.time), 'HH:mm')}
            </Label>
            {/* <TimePicker
              selectedHours={new Date(this.state.alarm.time).getHours()}
              selectedMinutes={new Date(this.state.alarm.time).getMinutes()}
              onChange={(hours, minutes) =>
                this.setState({
                  time: new Date().setHours(hours, minutes),
                })
              } */}
            {this.state.showTimepicker && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={new Date(this.state.alarm.time)}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                  if (event.type === 'set') {
                    this.setState(state => {
                      return {
                        alarm: {
                          ...state.alarm,
                          time: date.getTime(),
                        },
                        showTimepicker: false,
                      };
                    });
                  }
                }}
              />
            )}
          </ListItem>
          {this.state.alarm.options.map((weekday, index) => {
            return (
              <ListItem key={JSON.stringify(weekday)}>
                <CheckBox
                  style={{borderColor: '#32505C'}}
                  checked={weekday.value}
                  onPress={() => {
                    let tmp = this.state.alarm.options;
                    tmp[index].value = !tmp[index].value;
                    this.setState({
                      options: tmp,
                    });
                  }}
                />
                <Body>
                  <Text>{I18n.t(weekday.name)}</Text>
                </Body>
              </ListItem>
            );
          })}
          <ListItem style={{justifyContent: 'space-between'}}>
            <Label>{I18n.t('active')}</Label>
            <Switch
              value={Boolean(this.state.alarm.isActive)}
              onChange={() => {
                this.setState({isActive: !this.state.alarm.isActive});
              }}
            />
          </ListItem>
          <ListItem style={{justifyContent: 'space-between'}}>
            <Label>{I18n.t('located')}</Label>
            <Switch
              value={Boolean(this.state.alarm.isLocationBound)}
              onChange={() => {
                this.setState({
                  isLocationBound: !this.state.alarm.isLocationBound,
                });
              }}
            />
          </ListItem>
          <ListItem
            onPress={() => {
              if (this.state.alarm.isLocationBound) {
                this.props.navigation.navigate('EditCoordinates', {
                  getCoords: coords => {
                    this.setState({location: coords});
                  },
                  initCoords: this.state.alarm.location,
                });
              }
            }}>
            <Input
              disabled
              placeholder={`${I18n.t('latitude')}: ${
                this.state.alarm.location.latitude
              }`}
            />
            <Input
              disabled
              placeholder={`${I18n.t('longitude')}: ${
                this.state.alarm.location.longitude
              }`}
            />
          </ListItem>
          <ListItem>
            <Textarea
              style={{width: '100%'}}
              rowSpan={5}
              bordered
              placeholder={I18n.t('description')}
              value={this.state.alarm.description}
              onChangeText={text => this.setState({description: text})}
            />
          </ListItem>
        </Content>
      </Container>
    );
  }
}

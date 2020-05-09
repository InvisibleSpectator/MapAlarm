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
} from 'native-base';
import TimePicker from 'react-native-simple-time-picker';
import Database from '../Model/Database';
import I18n from 'react-native-i18n';

export default class EditAlarmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(this.props.route.params.alarm);
    //console.log(this.state.options);
    //this.weekdaysKeys = Object.keys(this.state.options);
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
                if (this.state.id === 0)
                  Database.addAlarm(this.state, this.props.route.params.ret);
                else
                  Database.updateAlarm(this.state, this.props.route.params.ret);
              }}>
              <Icon type="MaterialIcons" name="done" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Item floatingLabel>
            <Label>{I18n.t('name')}</Label>
            <Input
              onChangeText={text => this.setState({name: text})}
              value={this.state.name}
            />
          </Item>
          <Item>
            <Label>{I18n.t('time')}</Label>
            <TimePicker
              selectedHours={new Date(this.state.time).getHours()}
              selectedMinutes={new Date(this.state.time).getMinutes()}
              onChange={(hours, minutes) =>
                this.setState({
                  time: new Date().setHours(hours, minutes),
                })
              }
            />
          </Item>
          {this.state.options.map((weekday, index) => {
            return (
              <ListItem key={JSON.stringify(weekday)}>
                <CheckBox
                  checked={weekday.value}
                  onPress={() => {
                    let tmp = this.state.options;
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
          <Item style={{justifyContent: 'space-between'}}>
            <Label>{I18n.t('active')}</Label>
            <Switch
              value={Boolean(this.state.isActive)}
              onChange={() => {
                this.setState({isActive: !this.state.isActive});
              }}
            />
          </Item>
          <Item style={{justifyContent: 'space-between'}}>
            <Label>{I18n.t('located')}</Label>
            <Switch
              value={Boolean(this.state.isLocationBound)}
              onChange={() => {
                this.setState({isLocationBound: !this.state.isLocationBound});
              }}
            />
          </Item>
          <Item
            onPress={() => {
              if (this.state.isLocationBound) {
                this.props.navigation.navigate('EditCoordinates', {
                  getCoords: coords => {
                    this.setState({location: coords});
                  },
                  initCoords: this.state.location,
                });
              }
            }}>
            <Input
              disabled
              placeholder={`${I18n.t('latitude')}: ${
                this.state.location.latitude
              }`}
            />
            <Input
              disabled
              placeholder={`${I18n.t('longitude')}: ${
                this.state.location.longitude
              }`}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            placeholder={I18n.t('description')}
            value={this.state.description}
            onChangeText={text => this.setState({description: text})}
          />
        </Content>
      </Container>
    );
  }
}

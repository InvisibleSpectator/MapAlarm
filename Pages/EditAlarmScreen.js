import React from 'react';
import {
  View,
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
import {BaseRouter} from '@react-navigation/native';
import {format} from 'date-fns';
import TimePicker from 'react-native-simple-time-picker';
import Database from '../Model/Database';

export default class EditAlarmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(this.props.route.params.alarm);
    this.weekdaysKeys = Object.keys(this.state.options);
    console.log(this.props.route.params.alarm);
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
              <Icon name="check" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Item floatingLabel>
            <Label>Имя</Label>
            <Input
              onChangeText={text => this.setState({name: text})}
              value={this.state.name}
            />
          </Item>
          <Item>
            <Label>Время</Label>
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
          {this.weekdaysKeys.map(weekday => {
            return (
              <ListItem key={weekday}>
                <CheckBox
                  checked={this.state.options[weekday]}
                  onPress={() => {
                    this.setState({
                      options: {
                        ...this.state.options,
                        [`${weekday}`]: !this.state.options[weekday],
                      },
                    });
                  }}
                />
                <Body>
                  <Text>{weekday}</Text>
                </Body>
              </ListItem>
            );
          })}
          <Item style={{justifyContent: 'space-between'}}>
            <Label>Активность</Label>
            <Switch
              value={Boolean(this.state.isActive)}
              onChange={() => {
                this.setState({isActive: !this.state.isActive});
              }}
            />
          </Item>
          <Item style={{justifyContent: 'space-between'}}>
            <Label>Геопривязка</Label>
            <Switch
              value={Boolean(this.state.isLocationBound)}
              onChange={() => {
                this.setState({isLocationBound: !this.state.isLocationBound});
              }}
            />
          </Item>
          <Item disabled>
            <Input
              disabled
              placeholder={`Широта: ${this.state.location.latitude}`}
            />
            <Input
              disabled
              placeholder={`Долгота: ${this.state.location.longitude}`}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Описание"
            value={this.state.description}
            onChangeText={text => this.setState({description: text})}
          />
        </Content>
      </Container>
    );
  }
}

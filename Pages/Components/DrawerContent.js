import React from 'react';
import {Container, Content} from 'native-base';
import DrawerAlarmCard from './DrawerAlarmCard';

export default class DrawerContent extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          {this.props.alarms.map((alarm, index) => (
            <DrawerAlarmCard
              key={JSON.stringify(alarm)}
              onSelect={this.props.onSelect}
              navigation={this.props.navigation}
              onDelete={this.props.onDelete}
              onEdit={this.props.onEdit}
              alarm={alarm}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

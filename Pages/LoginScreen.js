import auth from '@react-native-firebase/auth';
import React from 'react';
import {View} from 'react-native';
import {
  Toast,
  Input,
  Item,
  Label,
  Icon,
  ListItem,
  Text,
  Button,
  Content,
  Header,
  Container,
} from 'native-base';
import I18n from 'react-native-i18n';
export default class LoginScreen extends React.Component {
  state = {email: '', password: '', currentUser: auth().currentUser};

  componentDidMount() {
    // const {currentUser} = 'asdas';
    // this.setState(state => {
    //   return {...state, currentUser};
    // });
    // console.log(this.state);
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'))
    //   .catch(() => console.log('Error'));
  }

  render() {
    let isEmail = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/.test(this.state.email);
    let isPasswordGood = this.state.password.length >= 6;
    return (
      <Container>
        <Content>
          <ListItem>
            <Item
              floatingLabel
              success={this.state.email.length > 0 && isEmail}
              error={this.state.email.length > 0 && !isEmail}>
              <Label>{I18n.t('email')}</Label>
              <Input
                onChangeText={email =>
                  this.setState({email: email.replace(/\s+/g, ' ').trim()})
                }
                value={this.state.email}
              />
              {(() => {
                if (this.state.email.length > 0)
                  return isEmail ? (
                    <Icon name="checkmark-circle" />
                  ) : (
                    <Icon name="close-circle" />
                  );
              })()}
            </Item>
          </ListItem>
          <ListItem>
            <Item
              floatingLabel
              success={this.state.password.length > 0 && isPasswordGood}
              error={this.state.password.length > 0 && !isPasswordGood}>
              <Label>{I18n.t('password')}</Label>
              <Input
                secureTextEntry
                onChangeText={password =>
                  this.setState({
                    password: password.replace(/\s+/g, ' ').trim(),
                  })
                }
                value={this.state.password}
              />
              {(() => {
                if (this.state.password.length > 0)
                  return isPasswordGood ? (
                    <Icon name="checkmark-circle" />
                  ) : (
                    <Icon name="close-circle" />
                  );
              })()}
            </Item>
          </ListItem>
          <Button
            full
            // onPress={() => this.props.navigation.navigate('Home')}
            disabled={!(isPasswordGood && isEmail)}
            onPress={() => {
              auth()
                .createUserWithEmailAndPassword(
                  this.state.email,
                  this.state.password,
                )
                .then(() => this.props.navigation.navigate('Home'))
                .catch(err =>
                  Toast.show({
                    text: 'Wrong password!',
                    type: 'warning',
                  }),
                );
            }}>
            <Text>{I18n.t('create_account')}</Text>
          </Button>

          <Button
            full
            disabled={!(isPasswordGood && isEmail)}
            onPress={() =>
              auth()
                .signInWithEmailAndPassword(
                  this.state.email,
                  this.state.password,
                )
                .then(() => this.props.navigation.navigate('Home'))
                .catch(err =>
                  Toast.show({
                    text: 'Wrong password!',
                    type: 'warning',
                  }),
                )
            }>
            <Text>{I18n.t('sign_in')}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

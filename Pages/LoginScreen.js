import auth from '@react-native-firebase/auth';
import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { Toast, Input, Item, Label, Icon } from 'native-base';

export default class LoginScreen extends React.Component {
  state = { email: '', password: '', currentUser: auth().currentUser };

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
      <View>
        <Item floatingLabel success={this.state.email.length > 0 && isEmail} error={this.state.email.length > 0 && !isEmail} >
          <Label>email</Label>
          <Input
            onChangeText={email =>
              this.setState({ email: email.replace(/\s+/g, ' ').trim() })
            }
            value={this.state.email}
          />
          {(() => { if (this.state.email.length > 0) return isEmail ? <Icon name="checkmark-circle" /> : <Icon name="close-circle" /> })()}

        </Item>
        <Item floatingLabel success={this.state.password.length > 0 && isPasswordGood} error={this.state.password.length > 0 && !isPasswordGood}>
          <Label>password</Label>
          <Input
            secureTextEntry
            onChangeText={password =>
              this.setState({ password: password.replace(/\s+/g, ' ').trim() })
            }
            value={this.state.password}
          />
          {(() => { if (this.state.password.length > 0) return isPasswordGood ? <Icon name="checkmark-circle" /> : <Icon name="close-circle" /> })()}
        </Item>
        <Button
          title="Зарегистрироваться"
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
              )
          }}
        />
        <Button
          title="Войти"
          disabled={!(isPasswordGood && isEmail)}
          onPress={() =>
            auth()
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then(() => this.props.navigation.navigate('Home'))
              .catch(err =>
                Toast.show({
                  text: 'Wrong password!',
                  type: 'warning',
                }),
              )
          }
        />
      </View>
    );
  }
}

import auth from '@react-native-firebase/auth';
import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {Toast, Input, Item, Label, Icon} from 'native-base';

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
    return (
      <View>
        <Item floatingLabel success>
          <Label>email</Label>
          <Input
            onChangeText={email =>
              this.setState({email: email.replace(/\s+/g, ' ').trim()})
            }
            value={this.state.email}
          />
          <Icon name="checkmark-circle" />
        </Item>
        <Item floatingLabel>
          <Label>password</Label>
          <Input
            secureTextEntry
            onChangeText={password =>
              this.setState({password: password.replace(/\s+/g, ' ').trim()})
            }
            value={this.state.password}
          />
        </Item>
        <Button
          title="Зарегистрироваться"
          // onPress={() => this.props.navigation.navigate('Home')}
          disabled={!(this.state.email && this.state.password)}
          onPress={() => {
            auth()
              .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password,
              )
              .then(() => this.props.navigation.navigate('Home'));
          }}
        />
        <Button
          title="Войти"
          disabled={!(this.state.email && this.state.password)}
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

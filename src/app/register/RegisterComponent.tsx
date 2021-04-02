import * as React from 'react';
import { Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { AuthAction } from '../globals/AuthAction';
import { RegisterStateModel, RegisterStore } from './RegisterStore';
import { ManagerFactory } from '../../domain/ManagerFactory';

interface RegisterComponentProps {
  message: string;
}

export class RegisterComponent extends React.Component<
  RegisterComponentProps,
  RegisterStateModel
> {
  store: RegisterStore;
  action: AuthAction;
  count = 0;

  componentWillMount() {}

  componentDidMount() {
    this.action = new AuthAction(ManagerFactory.buildAuthManager());
  }

  getForm(): JSX.Element {
    return (
      <View style={{ width: 200 }}>
        <FormLabel style={{ borderColor: 'white' }}>
          What's your name? {this.count}
        </FormLabel>
        <FormInput
          placeholder="Email"
          onChangeText={text => {
            this.setState({ emailInput: text.toLowerCase() });
          }}
          value={this.state.emailInput}
        />

        <FormInput
          placeholder="Display Name"
          onChangeText={text => {
            this.setState({ displayName: text.toLowerCase() });
          }}
          value={this.state.displayName}
        />

        <FormInput
          placeholder="Password"
          onChangeText={text => {
            this.setState({ passwordInput: text.toLowerCase() });
          }}
          value={this.state.passwordInput}
        />

        <Button
          title="Sign In"
          onPress={() => {
            this.action.register(
              this.state.emailInput,
              this.state.passwordInput,
              this.state.displayName,
            );
          }}
        />
      </View>
    );
  }

  getContent(): JSX.Element {
    return (
      <View>
        {this.getForm()}
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Please Sign Up</Text>
      </View>
    );
  }

  render() {
    this.count++;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'skyblue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.getContent()}
      </View>
    );
  }
}

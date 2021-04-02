import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    height: 300,
    width: 245,
  },
  formDescription: {
    marginBottom: 32,
    color: '#2196F3',
    fontWeight: 'bold',
    opacity: 0.69,
  },
  formItem: { flexDirection: 'row' },
  inputField: { flex: 2 },
  inputIcon: {
    flex: 1,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#BBDEFB',
    height: 0.5,
    width: 300 * 1.05,
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },
  signInText: {
    marginTop: 32,
    color: '#2196F3',
    fontWeight: '300',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

class FormItem extends React.PureComponent<
  {
    setValue(x: string): void;
    label: string;
    icon: string;
    tintColor: string;
    password?: boolean;
  },
  {inputValue: string}
> {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  render() {
    return (
      <View style={styles.formItem}>
        <View style={styles.inputIcon}>
          <Ionicons
            name={this.props.icon}
            size={25}
            color={this.props.tintColor}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            multiline={false}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={this.props.password}
            returnKeyType="next"
            placeholder={this.props.label}
            onChangeText={input => {
              this.props.setValue(input);
              this.setState({ inputValue: input });
            }}
            value={this.state.inputValue}
          />
        </View>
      </View>
    );
  }
}

interface RequireAuthProps {
  signUp(email: string, password: string, username: string): void;

  signIn(id: string, password: string): void;

  isProgressing: boolean;
}

export class RequireAuthComponent extends React.Component<
  RequireAuthProps,
  {showSignUp: boolean; isProgressing: boolean}
> {
  protected email: string;
  protected password: string;
  protected username: string;
  private readonly SIGN_UP_BUTTON: string = 'CREATE';
  private readonly SIGN_IN_BUTTON: string = 'OKAY';
  private readonly SIGN_IN_DESCRIPTION: string =
    'Use your Email or Username to log in';

  private readonly SIGN_UP_DESCRIPTION: string =
    "To use every feature of Breathe you're required to have a Account";

  private readonly SIGN_UP_LINK: string = 'Already have an account?';
  private readonly SIGN_IN_LINK: string = 'Create an Account';

  constructor(props) {
    super(props);
    this.state = { showSignUp: true, isProgressing: this.props.isProgressing };
  }

  signUpForm() {
    return (
      <View>
        <View style={styles.form}>
          <Text style={styles.formDescription}>{this.SIGN_UP_DESCRIPTION}</Text>
          <FormItem
            label="Email"
            setValue={x => {
              this.email = x;
            }}
            icon="ios-mail-outline"
            tintColor="#90CAF9"
          />
          <Divider style={{ margin: 16 }} />
          <FormItem
            label="Password"
            setValue={x => {
              this.password = x;
            }}
            icon="ios-key-outline"
            tintColor="#90CAF9"
            password={true}
          />
          <Divider style={{ margin: 16 }} />
          <FormItem
            label="Username"
            setValue={x => {
              this.username = x;
            }}
            icon="ios-contact-outline"
            tintColor="#90CAF9"
          />
        </View>
        <Button
          title={this.SIGN_UP_BUTTON}
          onPress={() => {
            this.props.signUp(this.email, this.password, this.username);
          }}
          backgroundColor="#2196F3"
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ showSignUp: false });
          }}>
          <Text style={styles.signInText}>{this.SIGN_UP_LINK}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  signInForm() {
    return (
      <View>
        <View style={styles.form}>
          <Text style={styles.formDescription}>{this.SIGN_IN_DESCRIPTION}</Text>
          <FormItem
            label="Email / Username"
            setValue={x => {
              this.email = x;
            }}
            icon="ios-mail-outline"
            tintColor="#90CAF9"
          />
          <Divider style={{ margin: 16 }} />
          <FormItem
            label="Password"
            setValue={x => {
              this.password = x;
            }}
            icon="ios-key-outline"
            tintColor="#90CAF9"
            password={true}
          />
          <Divider style={{ margin: 16 }} />
        </View>
        <Button
          title={this.SIGN_IN_BUTTON}
          onPress={() => {
            this.props.signIn(this.email, this.password);
          }}
          backgroundColor="#2196F3"
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ showSignUp: true });
          }}>
          <Text style={styles.signInText}>{this.SIGN_IN_LINK}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <Card title="Authentication">
        {!!this.state.showSignUp && this.signUpForm()}
        {!this.state.showSignUp && this.signInForm()}
      </Card>
    );
  }
}

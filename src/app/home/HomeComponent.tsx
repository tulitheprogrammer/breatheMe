import {MainWindow} from '../MainWindow';
import * as React from 'react';
import {RequireAuthComponent} from '../common/RequireAuthComponent';
import {ManagerFactory} from '../../domain/ManagerFactory';
import {HomeComponentController} from './HomeComponentController';
import {LocalRepository} from '../../data/repository/LocalRepository';
import {
  Image,
  ProgressViewIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';

export interface HomeComponentState {
  isProgressing: boolean;
  isLoggedIn: boolean;
  currentProgress: number;
  currentUsername: string;
  welcomeText: string;
  currentDate: string;
}

export class HomeComponent extends React.Component<{}, HomeComponentState> {
  protected email: string;
  protected password: string;
  protected username: string;
  protected controller: HomeComponentController;
  protected styles;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.controller = new HomeComponentController(
      this,
      ManagerFactory.buildAuthManager(),
      LocalRepository.getInstance(),
    );
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.styles = StyleSheet.create({
      welcomeCardActionButton: {
        color: '#1976D2',
        fontWeight: 'bold',
        opacity: 0.69,
      },
      welcomeCard: {
        height: 250,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      statisticsCard: {
        height: 100,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
      },
      lastPostCard: {
        height: 300,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
      },
      lastPostImage: {
        flex: 3,
        alignItems: 'stretch',
      },
      lastPostAuthor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },

      cardContentView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    });
  }

  getInitialState(): HomeComponentState {
    return {
      isProgressing: false,
      isLoggedIn: false,
      currentProgress: 0,
      currentUsername: '',
      welcomeText: '',
      currentDate: new Date(Date.now()).toString(),
    };
  }

  componentWillMount(): void {
    this.controller.tryAuth();
  }

  private signUp(email, password, username): void {
    this.controller.signUp(email, password, username);
  }

  private signIn(email, password): void {
    this.controller.signIn(email, password);
  }

  public displayMessage(message: string) {
    alert(message);
  }

  private getProgressBar() {
    return <ProgressViewIOS progress={this.state.currentProgress} />;
  }

  private getLastPostCard() {
    // http://www.abc.net.au/news/image/7515684-3x2-940x627.jpg
    return (
      <Card title="Last Post">
        <View style={this.styles.lastPostCard}>
          <View style={this.styles.lastPostAuthor}>
            <Text style={{fontWeight: 'bold', color: '#1976D2'}}>
              Mr Iceman
            </Text>
          </View>
          <View style={this.styles.lastPostImage}>
            <Image
              style={{width: 150, height: 80}}
              source={{
                uri: 'http://www.abc.net.au/news/image/7515684-3x2-940x627.jpg',
              }}
            />
          </View>
        </View>
      </Card>
    );
  }

  private getWelcomeCard() {
    return (
      <Card
        title={`Welcome ${this.state.currentUsername}`}
        containerStyle={this.styles.welcomeCard}>
        <View style={this.styles.cardContentView}>
          <Text>{this.state.welcomeText}</Text>
          <TouchableOpacity>
            <Text style={this.styles.welcomeCardActionButton}>
              Start a Session
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  private getStatisticsCard() {
    return (
      <Card title="Quick Stats">
        <View style={this.styles.statisticsCard}>
          <Text>
            This Week you have done
            <Text style={{fontWeight: 'bold'}}>0 Breathing Sessions</Text>.
          </Text>
          <Text>
            You meditated for
            <Text style={{fontWeight: 'bold'}}>0 Minutes</Text> in total
          </Text>
          <Text>
            and you were out for
            <Text style={{fontWeight: 'bold'}}>0 Minutes</Text> in the cold.
          </Text>
        </View>
      </Card>
    );
  }

  private getDashboard() {
    return (
      <ScrollView>
        {this.getWelcomeCard()}
        {this.getStatisticsCard()}
        {this.getLastPostCard()}
      </ScrollView>
    );
  }

  public updateState(state: HomeComponentState) {
    this.setState(state);
  }

  render() {
    return (
      <MainWindow>
        {!this.state.isLoggedIn && !this.state.isProgressing && (
          <RequireAuthComponent
            signUp={this.signUp}
            signIn={this.signIn}
            isProgressing={this.state.isProgressing}
          />
        )}

        {!!this.state.isProgressing && this.getProgressBar()}
        {!!this.state.isLoggedIn &&
          !this.state.isProgressing &&
          this.getDashboard()}
      </MainWindow>
    );
  }
}

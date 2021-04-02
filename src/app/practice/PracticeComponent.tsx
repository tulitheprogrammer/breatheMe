import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MainWindow} from '../MainWindow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProps} from 'react-navigation';

export const styles = StyleSheet.create({
  menuTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  menuItem: {
    backgroundColor: '#2196F3',
    height: 200,
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#fff',
    borderStyle: 'dotted',
    borderWidth: 1,
    margin: 8,
  },
  menu: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class MenuItem extends React.PureComponent<{
  title: string;
  icon: string;
  onClick: () => void;
}> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onClick}>
        <View style={styles.menuItem}>
          <Ionicons name={this.props.icon} size={55} color="#fff" />
          <Text style={styles.menuTitle}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export class PracticeComponent extends React.Component<NavigationScreenProps> {
  private displayBreathingSessionComponent() {
    this.props.navigation.navigate('Practice', {screen: 'Breathing'});
  }

  render() {
    return (
      <MainWindow>
        <View style={styles.menu}>
          <MenuItem
            title="Breathing"
            icon="ios-clock-outline"
            onClick={() => this.displayBreathingSessionComponent()}
          />
          <MenuItem
            title="Cold Exposure"
            icon="ios-snow-outline"
            onClick={() => {
              alert('Cold Exposure: Under Construction');
            }}
          />
        </View>
      </MainWindow>
    );
  }
}

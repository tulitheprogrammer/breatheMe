import React from 'react';
import { StyleSheet, View } from 'react-native';

export class MainWindow extends React.Component {
  private styles;

  constructor(props: {}) {
    super(props);

    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#BBDEFB',
        paddingLeft: 8,
        paddingRight: 8,
      },
      navBar: {
        height: 55,
        backgroundColor: '#1976D2',
        elevation: 3,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      titleText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      rightNavPart: {
        flex: 1,
        alignItems: 'flex-end',
      },
      leftNavPart: {
        flex: 1,
      },
      body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
    });
  }

  render() {
    return (
      <View style={[this.styles.container, { height: 20 }]}>
        <View style={this.styles.container}>
          <View style={this.styles.body}>{this.props.children}</View>
        </View>
      </View>
    );
  }
}

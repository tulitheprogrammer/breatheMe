import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface TimerCircleProps {
  onStopCallBack: (number) => void;

  onStartCallBack(): () => void;
}

export interface TimeCircleState {
  isLaunched: boolean;
  isStopped: boolean;
  currentTimer: number;
  currentMinute: number;
  currentDisplayString;
}

const styles = StyleSheet.create({
  surface: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export class TimerCircleComponent extends React.Component<
  TimerCircleProps,
  TimeCircleState
> {
  VELOCITY_MS = 1000;
  currentIntervall;

  constructor(props) {
    super(props);
    this.state = this.getInitState();

    this.toggleTimer = this.toggleTimer.bind(this);
  }

  private getInitState(): TimeCircleState {
    return {
      isLaunched: false,
      isStopped: false,
      currentTimer: 0,
      currentMinute: 1,
      currentDisplayString: 'Tap to record breath holding',
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleTimer}>
        <View style={styles.surface}>
          <Text style={styles.circleText}>
            {this.state.currentDisplayString}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  toggleTimer() {
    if (this.state.isLaunched) {
      this.stop();
      clearInterval(this.currentIntervall);
      return;
    }

    const displayString = '0:0';

    this.setState(() => {
      return {
        ...this.state,
        currentDisplayString: displayString,
        currentTimer: 0,
        isLaunched: true,
      };
    });

    this.currentIntervall = setInterval(() => {
      this.updateTime();
    }, this.VELOCITY_MS);
  }

  private stop() {
    this.props.onStopCallBack(this.state.currentTimer);
    this.setState(this.getInitState());
  }

  private updateTime() {
    let currentSeconds = this.state.currentTimer;
    currentSeconds++;
    const tempSeconds = currentSeconds;
    let tempMinute = this.state.currentMinute;
    let displayString = '';
    if (currentSeconds == 60 * tempMinute) {
      tempMinute++;
    }

    displayString = `${tempMinute - 1}:${tempSeconds - (tempMinute - 1) * 60}`;

    this.setState(() => {
      return {
        ...this.state,
        currentDisplayString: displayString,
        currentTimer: currentSeconds,
        currentMinute: tempMinute,
      };
    });
  }
}

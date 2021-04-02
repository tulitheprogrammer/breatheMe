import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TimerCircleComponent} from '../practice/Timer/TimerCircleComponent';
import {BreathingController} from './BreathingController';
import {ManagerFactory} from '../../domain/ManagerFactory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ResultFormatter} from './ResultFormatter';
import {DialogManager} from '../common/DialogManager';

const style = StyleSheet.create({
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: '#2196F3',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  header: {},

  buttonBox: {
    paddingTop: 16,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },

  result: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },

  resultText: {
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitleView: {
    flex: 1,
  },
  lastResultText: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 8,
  },
  resultContentView: {
    flex: 3,
    flexWrap: 'wrap',
  },
  timerView: {
    paddingTop: 16,
    flex: 3,
  },

  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  finishSessionText: {
    color: '#BBDEFB',
    fontWeight: '800',
  },
});

export interface BreathingComponentState {
  trackBreaths: boolean;
  start: boolean;
  currentRound: number;
  sessionDone: boolean;
  sessionSaveFailed: boolean;
  sessionSaved: boolean;
  results: string[];
}

export class BreathingComponent extends React.Component<
  {},
  BreathingComponentState
> {
  private controller: BreathingController;

  constructor(props: {}) {
    super(props);
    this.state = this.getDefaultState();
    this.controller = new BreathingController(
      this,
      ManagerFactory.buildSessionManger(),
      new ResultFormatter(),
      new DialogManager(),
    );
    this.updateState = this.updateState.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  public getDefaultState(): BreathingComponentState {
    return {
      trackBreaths: false,
      start: false,
      currentRound: 0,
      sessionDone: false,
      sessionSaveFailed: false,
      sessionSaved: false,
      results: [],
    };
  }

  public updateState(state: BreathingComponentState) {
    this.setState(state);
  }

  public getState(): BreathingComponentState {
    return this.state;
  }

  private startTimer() {}

  private stopTimer(time: number) {
    // alert(`You made it to ${time} seconds`);
    this.controller.addRound(time);
  }

  private getResults() {
    return (
      <View style={style.result}>
        <View style={style.resultTitleView}>
          <Text style={[style.resultText, {paddingBottom: 8}]}>Results</Text>
        </View>
        <View style={style.resultContentView}>
          {this.state.results.map((val, index) => {
            const isLastItem = index + 1 === this.state.results.length;
            const resultTextStyle = isLastItem
              ? [style.resultText, style.lastResultText]
              : style.resultText;
            return (
              <View style={style.resultTextView} key={index}>
                <Text style={resultTextStyle}>
                  {index + 1} - {val}
                </Text>
                {isLastItem ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.controller.removeLastRound();
                    }}>
                    <Ionicons
                      name="ios-close-outline"
                      size={30}
                      color="#BBDEFB"
                    />
                  </TouchableOpacity>
                ) : (
                  ''
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={style.content}>
        {!this.state.start && (
          <View style={style.header}>
            <Text style={style.text}>
              Do you want to track your Breaths before the retention phase, too?
            </Text>
            <View style={style.buttonBox}>
              <TouchableOpacity
                onPress={() => {
                  this.controller.launchWithoutTrackingBreaths();
                }}>
                <Text style={style.buttonText}> No</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={style.buttonText}> Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!!this.state.start && (
          <View>
            {this.getResults()}
            <View style={style.timerView}>
              <TimerCircleComponent
                onStartCallBack={() => this.startTimer}
                onStopCallBack={this.stopTimer}
              />
            </View>
            <View style={style.bottomView}>
              <TouchableOpacity
                onPress={() => {
                  this.controller.onClickedDone();
                }}>
                <Text style={style.finishSessionText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

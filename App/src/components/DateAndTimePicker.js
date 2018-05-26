import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder
} from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class DateAndTimePicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '20:00',
      datetime: '2017-02-01 20:00',
      datetime1: '2017-02-01 20:00'
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          style={{width: 200}}
          date={this.state.datetime1}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: '#fff',
              borderBottomColor: "#eee"
            }
          }}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({datetime1: datetime});}}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
};

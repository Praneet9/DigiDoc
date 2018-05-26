/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


/*export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Bye Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}*/

import {StackNavigator} from 'react-navigation';
import Main from "./src/screens/Main";
import Signup from "./src/screens/Signup";
import Signin from "./src/screens/Signin";
import PatientDetails from "./src/screens/PatientDetails";
import DoctorDetails from "./src/screens/DoctorDetails";
import DoctorProfile from "./src/screens/DoctorProfile";
import PatientProfile from "./src/screens/PatientProfile";
import DoctorsList from "./src/screens/DoctorsList";
import Appointment from "./src/screens/Appointment";
import CardDetail from "./src/screens/CardDetail";
import Card from "./src/components/Card";
import CardList from "./src/components/CardList";
import DocAppointment from "./src/screens/DocAppointment";
import Analytics from "./src/screens/Analytics";
import PatCard from "./src/screens/PatCard";

const App = StackNavigator({

    Main: {screen: Main},
    PatientDetails: {screen: PatientDetails},
    DoctorDetails: {screen: DoctorDetails},
    DoctorsList: {screen: DoctorsList},
    Signup: {screen: Signup},
    Appointment:{screen: Appointment},
    CardDetail: {screen: CardDetail},
    PatientProfile: {screen: PatientProfile},
    DoctorProfile: {screen: DoctorProfile},
    Signin: {screen: Signin},
    DocAppointment: {screen: DocAppointment},
    Analytics: {screen: Analytics},
    PatCard: {screen: PatCard}
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

import React, { Component } from 'react';
import {View,Text, ScrollView} from 'react-native'
import AppointmentCard from '../components/AppointmentCard';
import {NavigationActions} from "react-navigation";

export default class DocAppointment extends Component{



    static navigationOptions = (
        {
            title: 'DocAppointment',
            header: null
        }
    );

    render(){
        return(
            <ScrollView>
                <AppointmentCard name="Rishabh" time="10:00PM" date="25-Apr-2018" />
                <AppointmentCard name="Afzal" time="5:30PM" date="12-Apr-2018" />
                <AppointmentCard name="Maaz" time="6:30PM" date="12-Apr-2018" />
                <AppointmentCard name="Jawad" time="3:30PM" date="13-Apr-2018" />
            </ScrollView>

        );
        }
}
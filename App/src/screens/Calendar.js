import  React, {Component} from 'react'
import {View} from 'react-native'
import RNCalendarEvents from 'react-native-calendar-events';

export default class Calendar extends Component{
    render(){
        return(
            RNCalendarEvents.saveEvent('Title of event', {
                startDate: '2018-04-22T19:26:00.000Z',
                endDate: '2017-04-23T19:26:00.000Z'
              }) 

        );
    }

}
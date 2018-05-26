import React, {Component} from 'react';
import {Text, Image,TouchableOpacity, View, Button} from 'react-native';
import {NavigationActions} from "react-navigation";
import RNCalendarEvents from 'react-native-calendar-events';

const AppointmentCard = ({  name,date, time}) =>{
    
    
    return(
        
        <View style={ styles.Card}>
            <View style={styles.InnerView}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.Title}> {name} </Text>
                    <Text> Preferred Date & Time  </Text>
                    <Text> {date} </Text>
                    <Text> {time} </Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.AcceptButton} 
                    onPress={() => {
                        console.warn('Appointment added in calendar');
                        RNCalendarEvents.saveEvent( 'Appointment', {
                            startDate: '2018-04-25T16:30:00.000Z',
                            endDate: '2018-04-25T17:00:00.000Z'
                          }) 



                    }  }
                    
                    
                    
                    >
                        <Text style={{color: '#ffffff'}}>Accept</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DenyButton}>
                        <Text style={{color: '#ffffff'}}>Deny</Text>    
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default AppointmentCard;

const styles = {
    Title:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    Card: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: "#eee",
    },
    InnerView: {
        marginLeft: 20,
        justifyContent:  'space-between',
         flexDirection: 'row',
         flex: 1,
    },

    Images: {
        borderRadius: 50,
        height: 70,
        width: 70
    },
    ImageContainer:{       
        height: 70,
        width: 70

    },

    AcceptButton: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: "#4CAF50",
        borderRadius: 5,
        alignItems: 'center'
    },

    DenyButton: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: "#F44336",
        borderRadius: 5,
        alignItems: 'center'
    }


}
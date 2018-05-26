import React, {Component} from 'react';
import {ScrollView, Text, Button, TouchableOpacity, View} from 'react-native';
import Appointment from '../screens/Appointment';

//const DocTypeList = ({listOfDoc}) => {
  export default class DocTypeList extends Component {
    constructor(myprops){
        super(myprops);

        this.state = {
            listOfDoc: myprops.listOfDoc,
            type: '',
            navigation: myprops.navigation
        };
        
    }

    render(){ 
    return(
    <ScrollView style={{ flex: 1 }}>
     {
     this.state.listOfDoc.map((item, key) => (
                <TouchableOpacity 
                    key={key}  
                    onPress ={ ()=> this.state.navigation.navigate('Appointment', {status: true, type: item})} >
                        <View style={styles.Button} >
                            <Text style={styles.Title}>{item}</Text>
                        </View>
                </TouchableOpacity>
            ))
    }
    </ScrollView>
    );
    }
} 

const styles = {
    Button: {
        backgroundColor: '#29B6F6',
        width: '80%',
        borderRadius: 50,
        marginVertical: 7,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    Title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
        
    }

}

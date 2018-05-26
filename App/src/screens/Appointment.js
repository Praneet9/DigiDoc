import React, {Component} from 'react';
import {Text, Image,ScrollView, View, TextInput, TouchableOpacity, } from 'react-native';
import {Icon} from 'native-base';
import Card from '../components/Card';
import CardList from '../components/CardList';
import DocTypeList from '../components/DocTypeList';
import {NavigationActions} from "react-navigation";


export default class Appointment extends Component{
    constructor(props){
        super(props);

        this.state = {
            type: '',
            status: this.getParams(),
            listOfDoc: [
                'Orthopedic', 'Immunologist', 'Cardiologist', 'Dermatologist' , 'Pediatricians', 'Physiatrists'
            ],

            
        }
    }

    getParams(){
        let status= false;
        if(this.props.navigation.state.params)
            status= this.props.navigation.state.params.status;
        return status;
    }

    static navigationOptions = (
        {
            title: 'Appointment',
            header: null
        }
    );

    render(){
        return(
            <ScrollView style={styles.Container}>
                <View style={{ flexDirection: 'row' , margin: 5}}>
                    <View style={ styles.Icon}>
                        <Icon name="md-search" style={{ color: "#29B6F6"}} />
                    </View>
                    <TextInput placeholder="Search" style={{flex:1 }} />
                </View>

            {
                this.state.status ? 
                 <CardList navigation={this.props.navigation} type={this.props.navigation.state.params.type}/> : <DocTypeList listOfDoc={this.state.listOfDoc} navigation={this.props.navigation}/>
            }
            </ScrollView>
        );
    }
}


const styles={
    Container: {
        flex: 1,
        backgroundColor : "#fff"
    },
    Icon: {
        justifyContent: "center",
        paddingRight: 10,
        paddingLeft: 10,
    }


}
import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, } from 'react-native';
import { Icon, ListItem, Body, Left, Right, Thumbnail, List } from 'native-base';
import {NavigationActions} from "react-navigation";

export default class DoctorsList extends Component{

    static navigationOptions = (
        {
            title: 'Hello',
            header: null
        }
    );

    state = {
      doctorList: []
    };

    async componentWillMount() {

        try {

            let url = 'http://da.digiklug.com:12000/doctors/list';
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json())
                .then((res) => {
                    //alert(res.message);
                    if (res.success === true) {
                        this.setState({doctorList: res.details});
                        //alert(res.message)
                    } else {
                        alert(res.message);
                    }

                }).catch((error) => {
                    alert("Please check your Internet Connection");
                }).done();
        } catch(error) {
            alert("Something went wrong!")
        }
    }

    renderList() {
        return this.state.doctorList.map(list =>

            <ListItem avatar style={{marginLeft: 0, paddingLeft: 10}} key = {list.email} onPress = {() => this.props.navigation.dispatch(NavigationActions.navigate({
                routeName: "DoctorProfile",
                params: {email: list.email},
            }))}>
                <Left style={{justifyContent: "center"}}>
                    <Thumbnail small source={require('../../profile.jpg')} />
                </Left>
                <Body style={{justifyContent: "center"}}>
                    <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>{list.first_name + " " + list.last_name}</Text>
                    <Text style = {{fontWeight: "normal", fontSize: 12,}}>{list.specialization}</Text>
                </Body>
                <Right style={{justifyContent: "center"}}>
                    <TouchableOpacity>
                        <Icon name='eye' ios = 'ios-eye'/>
                    </TouchableOpacity>
                </Right>
            </ListItem>

        )
    };

    render(){

        return(

            <ScrollView>

                <List>

                    {this.renderList()}

                </List>

            </ScrollView>

        )

    }

}
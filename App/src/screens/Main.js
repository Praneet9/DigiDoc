
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import Signup from "./Signup";
import {NavigationActions} from "react-navigation";

export default class Main extends Component {

    componentWillMount() {

        this.checkToken();

    }

    async checkToken() {

        try {
            let token = await AsyncStorage.getItem("ACCESS_TOKEN");
            let email = await AsyncStorage.getItem("email");
            let profile_type = await AsyncStorage.getItem("profile_type");
            if (profile_type === null) {
                return;
            }
            if (profile_type === "patients") {
                var goTo = "PatientProfile"
            }
            if (profile_type === "doctors") {
                var goTo = "DoctorProfile"
            }
            let url = 'http://da.digiklug.com:12000/users/check/' + profile_type;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    email: email,
                    token: token,

                })
            }).then((response) => response.json())
                .then((res) => {
                    if (res.success === true) {
                        //this.props.navigation.navigate(goTo, email)
                        this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: goTo, params: {email: email} }),
                            ]
                        }))
                    }

                }).catch((error) => {
                    alert("Please check your Internet Connection");
                }).done();
        } catch(error) {
            alert("Something went wrong!");
        }

    }

    static navigationOptions = (
        {
            title: 'Bye',
            header: null
        }
    );

    render(){
        return (

            <View style = {styles.ViewContainer}>

                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"
                />

                <Text style = {styles.TitleText}>
                    DIGI DOC
                </Text>

                <Text style = {styles.SubtitleText}>
                    Here Patients Meet Cure
                </Text>

                <TouchableOpacity style = {styles.SignupButton} onPress = {() => this.props.navigation.navigate("Signup")}>
                    <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff"}}>
                        SIGN UP
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.SigninButton} onPress = {() => this.props.navigation.navigate("Signin")}>
                    <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#29B6F6"}}>
                        SIGN IN
                    </Text>
                </TouchableOpacity>
                 {/* <TouchableOpacity style = {styles.SigninButton} onPress = {() => this.props.navigation.navigate("PatCard")}>
                    <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#29B6F6"}}>
                        Test Button
                    </Text>
                </TouchableOpacity>  */}

            </View>

        )
    }

}

const styles = {
    ViewContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    TitleText: {
        color: "#212121",
        marginTop: "35%",
        fontFamily: "Helvetica",
        fontSize: 30,
        textAlign: "center"
    },
    SubtitleText: {
        color: "#757575",
        fontFamily: "Helvetica-Bold",
        textAlign: "center",
        marginTop: "2%"
    },
    SignupButton: {
        marginTop: "40%",
        height: 45,
        width: "70%",
        backgroundColor: "#29B6F6",
        borderRadius: 20,
        alignSelf: "center",
    },
    SigninButton: {
        marginTop: "5%",
        height: 45,
        width: "70%",
        borderWidth: 1,
        borderColor: "#29B6F6",
        borderRadius: 20,
        alignSelf: "center",
    }
};
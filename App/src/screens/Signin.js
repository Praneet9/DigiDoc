import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, StatusBar, Switch, AsyncStorage, ScrollView } from 'react-native';
import { ListItem, Icon, Left, Body, Right } from 'native-base';
import InputField from "../components/InputField";
import { NavigationActions } from 'react-navigation'

export default class Signin extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            switchValue: false,
            profile_type: "",
            signin_error: "",
        }
    }

    static async storeToken(accessToken, email, profile_type) {
        try {
            await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("profile_type", profile_type);
        } catch(error) {
            console.log("Something went wrong!")
        }
    }

    static navigationOptions = (
        {
            header: null
        }
    );

    handleToggleSwitch = () => this.setState({
        switchValue: !this.state.switchValue
    });

    async onLoginPressed() {
        let profiletype = this.state.profile_type;
        let navto = "Signin";

        if(this.state.switchValue === true) {
            profiletype = "doctors";
            navto = "DoctorProfile";
        }
        if (this.state.switchValue !== true) {
            profiletype = "patients";
            navto = "PatientProfile";
        }
        try {
            await fetch('http://da.digiklug.com:12000/' + profiletype + '/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    email: this.state.email,
                    password: this.state.password,

                })
            }).then((response) => response.json())
                .then((res) => {
                    if (res.success === true) {
                        Signin.storeToken(res.token, this.state.email, profiletype);
                        // //this.props.navigation.navigate(navto, this.state.email);
                        this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: navto, params: {email: this.state.email} }),
                            ]
                        }))
                    } else {
                        alert(res.message);
                    }

                }).catch((error) => {
                    alert("Please check your Internet Connection");
                }).done();

        } catch (errors) {
            alert("Something went wrong");
        }

    }

    render(){
        return (

            <View style = {styles.ViewContainer}>

                <StatusBar
                    backgroundColor="#29B6F6"
                    barStyle="light-content"
                />

                <View style = {styles.HeaderContainer}>
                    <Text style = {{paddingTop: "8%", paddingHorizontal: "10%",color: "#fafafa", textAlign: "center", fontWeight: "bold", fontSize: 25, fontFamily: "Helvetica-Bold"}}>
                        DIGI DOC
                    </Text>
                    <Text style = {{textAlign: "center", fontWeight: "bold", color: "#fafafa", fontFamily: "Helvetica-Bold"}}>
                        HERE PATIENTS MEET CURE
                    </Text>
                </View>

                <View style = {styles.CardStyle}>

                    <Text style = {{paddingBottom: 15,color: "#424242", textAlign: "center", fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>
                        SIGN IN
                    </Text>

                    <KeyboardAvoidingView style = {{paddingTop: 10}}>

                        <InputField
                            style ={{color: "#eee"}}
                            secureEntry = {false}
                            onChangeText = {(val) => this.setState({email: val})}
                            returnKeyType="next"
                            keyboardType="email-address"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCapitalize = "none"
                            autoCorrect={false}
                            label = "EMAIL"
                            signinError ={this.state.signin_error}
                        />

                        <InputField
                            returnKeyType="go"
                            secureTextEntry = {true}
                            onChangeText = {(val) => this.setState({password: val})}
                            label = "PASSWORD"
                            signinError = {this.state.signin_error}
                        />

                        <ListItem icon style={{borderBottomWidth: 0}}>
                            <Left>
                                <Icon name="medkit" ios='ios-medkit' />
                            </Left>
                            <Body style={{borderBottomWidth: 0}}>
                            <Text>Are you a Doctor?</Text>
                            </Body>
                            <Right style={{borderBottomWidth: 0}}>
                                <Switch
                                    onValueChange = {this.handleToggleSwitch}
                                    value = {this.state.switchValue}
                                />
                            </Right>
                        </ListItem>

                    </KeyboardAvoidingView>

                    <TouchableOpacity style = {styles.ButtonStyle} onPress = {this.onLoginPressed.bind(this)} >
                        <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff"}}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>

                </View>

                <Text style = {{marginTop: "90%", textAlign: "center", fontWeight: "bold", color: "#757575", fontFamily: "Helvetica-Bold"}}
                      onPress = {() => this.props.navigation.navigate("Signup")}
                >
                    Don't have an account? SIGN UP!
                </Text>

            </View>

        )
    }

}

const styles = {
    ViewContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        marginBottom: 2
    },
    HeaderContainer: {
        backgroundColor: "#29B6F6",
        height: "35%",
    },
    CardStyle: {
        position: "absolute",
        height: "auto",
        width: "90%",
        backgroundColor: "#fff",
        top: "25%",
        marginLeft: "5%",
        marginRight: "5%",
        borderRadius: 15,
        elevation: 3,
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingHorizontal: "7%"
    },
    ButtonStyle: {
        marginTop: 10,
        height: 45,
        width: "70%",
        backgroundColor: "#29B6F6",
        borderRadius: 20,
        alignSelf: "center",
    }
};
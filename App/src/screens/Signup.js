import React, { Component } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    StatusBar,
    Switch,
    AsyncStorage
} from 'react-native';
import { ListItem, Icon, Left, Body, Right } from 'native-base';
import InputField from '../components/InputField';
import {NavigationActions} from "react-navigation";

export default class Signup extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            passwordInput: "",
            password_confirmation: "",
            email_validated: false,
            password_validated: false,
            repassword_validated: false,
            switchValue: false,
            emailError: "",
            passwordError: "",
            confirmError: ""
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

    /*state = {
      switchValue: false
    };*/

    handleToggleSwitch = () => this.setState({
        switchValue: !this.state.switchValue
    });

    
    validate(text, type){
        //regex for email
        email_test=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        password_test=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        //Checks the input with regex using test() 
        if(type == 'email'){
            if(email_test.test(text.trim().toLowerCase())){
                this.setState({email: text.trim()});
                this.setState({email_validated: true});
                this.setState({emailError: ""});
                console.log('correct email');
            }
            else{
                    this.setState({emailError: "Invalid email"});
                    console.log('invalid email');
                }
            }
            
        
        if(type == 'password'){
            if(password_test.test(text.trim())){
                this.setState({passwordInput: text.trim() });
                this.setState({password_validated: true});
                this.setState({passwordError: ""});
                console.log('Password is correct');
            }
            else{
                this.setState({passwordError: "Invalid Password, Correct eg: Hello123! "});
                console.log('invalid password');
            }
            
        }

        if(type == 'confirm_password'){
            console.log(this.state.password_confirmation);
            if(this.state.passwordInput.trim() === text.trim()){
                this.setState({repassword_validated: true});
                this.setState({password_confirmation:text.trim()});
                this.setState({confirmError: ""});
            }
            else{
                this.setState({confirmError: "Passwords do not match"});
                console.log(this.state.passwordInput);
                console.log(this.state.password_confirmation);
            }
        }
    }




    async onRegisterPressed() {

        if (this.state.repassword_validated === false  || this.state.email_validated === false || this.state.password_validated === false) {
            console.log('Some thing is wrong!');
            return;
        }

        let profiletype = "";
        let navto = "";

        if(this.state.switchValue === true) {
            profiletype = "doctors";
            navto = "DoctorDetails"
        } else {
            profiletype = "patients";
            navto = "PatientDetails"
        }

        try {
            //alert("In Here");
            let url = 'http://da.digiklug.com:12000/' + profiletype + '/register' ;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    email: this.state.email,
                    password: this.state.passwordInput,

                })
            }).then((response) => response.json())
                .then((res) => {
                    //alert(res.message);
                    if (res.success === true) {
                        Signup.storeToken(res.token, this.state.email, profiletype);
                        //this.props.navigation.navigate(navto, this.state.email);
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
            console.log(errors);
            alert("Couldn't register. Please try again!")
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
                        CREATE NEW ACCOUNT
                    </Text>

                    <KeyboardAvoidingView style = {{paddingTop: 10}}>

                        <InputField
                            //style ={{color: "#eee"}}
                            secureEntry = {false}
                            //onChangeText = {(val) => this.setState({email: val})}
                            onChangeText = {(text)=>this.validate(text, 'email')}
                            returnKeyType="next"
                            keyboardType="email-address"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCapitalize = "none"
                            label = "EMAIL"
                            emailError = {this.state.emailError}
                        />

                        <InputField
                            returnKeyType="go"
                            secureTextEntry = {true}
                            //onChangeText = {(val) => this.setState({passwordInput: val})}
                            onChangeText = {(text)=>this.validate(text, 'password')}
                            label = "PASSWORD"
                            passwordError = {this.state.passwordError}
                          
                        />
                        
                        <InputField
                            returnKeyType="go"
                            secureTextEntry = {true}
                            //onChangeText = {(val) => this.setState({password_confirmation: val})}
                            onChangeText = {(text)=>this.validate(text, 'confirm_password')}
                            label = "CONFIRM PASSWORD"
                            confirmError= {this.state.confirmError}
                        />

                        {/*<Text style = {styles.Label}>
                            PASSWORD
                        </Text>

                        <TextInput
                            style = {{marginTop: 0, paddingTop: 0}}

                                   underlineColorAndroid='#eee'
                                   returnKeyType="go"
                                   secureTextEntry
                                   onChangeText = {(val) => this.setState({passwordInput: val})}
                        />*/}

                        {/*<Text style = {styles.Label}>
                            EMAIL
                        </Text>*/}

                        {/*<TextInput
                                    style = {{marginTop: 0, paddingTop: 0}}
                                   onChangeText = {(val) => this.setState({email: val})}
                                   underlineColorAndroid='#eee'
                                   onSubmitEditing={() => this.passwordInput.focus()}
                                   returnKeyType="next"
                                   keyboardType="email-address"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                        />*/}

                        {/*<Text style = {styles.Label}>
                            CONFIRM PASSWORD
                        </Text>

                        <TextInput
                            style = {{marginTop: 0, paddingTop: 0}}

                            underlineColorAndroid='#eee'
                            returnKeyType="go"
                            secureTextEntry
                            onChangeText = {(val) => this.setState({password_confirmation: val})}
                        />*/}

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

                    <TouchableOpacity style = {styles.ButtonStyle} onPress = {this.onRegisterPressed.bind(this)} >
                        <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff"}}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>

                </View>

                <Text style = {{marginTop: "90%", textAlign: "center", fontWeight: "bold", color: "#757575", fontFamily: "Helvetica-Bold"}}
                      onPress = {() => this.props.navigation.navigate("Signin")} >
                    Already have an account? SIGN IN!
                </Text>

            </View>

        )
    }
}



const styles = {
    ViewContainer: {
        backgroundColor: "#ffffff",
        flex: 1
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
    Label: {
        margin: 0,
        paddingLeft: 3,
        color: "#bdbdbd",
        fontSize: 12,
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
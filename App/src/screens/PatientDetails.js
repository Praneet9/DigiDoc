import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, StatusBar, CheckBox } from 'react-native';
import { Grid, Col, } from 'native-base';
import DatePicker from 'react-native-datepicker'
import InputField from "../components/InputField";
import {NavigationActions} from "react-navigation";
import {ImageSet } from "../components/ImageSet"

export default class PatientDetails extends Component {

    constructor() {
        super();

        this.state = {
            first_name: "",
            last_name: "",
            gender: "",
            dob: "",
            history: "",
            fname_validation: false,
            lname_validation: false,
            fname_error: "",
            lname_error: "",
            other_error: "",
            current_status: "",
            email: "",
            termsCheckedValue: false,
            maleCheckedValue: true,
            femaleCheckedValue: false,
            date:""
        }
    }

    static navigationOptions = (
        {
            title: 'Hello',
            header: null
        }
    );

    termsCheckbox = () => this.setState(state => ({
        termsCheckedValue: !state.termsCheckedValue,
    }));

    genderCheckbox = () => this.setState(state => ({
        femaleCheckedValue: state.maleCheckedValue,
        maleCheckedValue: !state.maleCheckedValue,
    }));


    validate(text, type){
        name_test= /^[a-z ,.'-]+$/i;
        if(type == 'fname'){
            if(name_test.test(text.trim())){
                this.setState({first_name: text});
                this.setState({fname_validation: true});
                this.setState({ fname_error: '' });
                console.log('Fname is correct');
            }
            else{
                this.setState({ fname_error: 'Invalid Firstname' });
                console.log('Not correct');
            }
        }

        if(type == 'lname'){
            if(name_test.test(text.trim())){
                this.setState({last_name: text});
                this.setState({lname_validation: true});
                console.log('lname is correct');
                this.setState({ lname_error: '' });

            }
            else{
                this.setState({ lname_error: 'Invalid Lastname' });
                console.log('Not correct');
            }
        }
    }


    async onUpdateProfilePressed() {

        if (this.state.termsCheckedValue !== true || this.state.fname_validation === false || this.state.lname_validation === false) {
            alert("Please agree to terms and conditions");
            return;
        }
        if (this.state.maleCheckedValue !== true) {
            this.state.gender = "Female";
        } else {
            this.state.gender = "Male";
        }

        try {
            //alert("In Here");
            await fetch('http://da.digiklug.com:12000/patients/details', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: this.state.name,
                    email: this.state.email,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    gender: this.state.gender,
                    //dob: this.state.dob,
                    history: this.state.history,
                    current_status: this.state.current_status,

                })
            }).then((response) => response.json())
                .then((res) => {
                    if (res.success === true) {
                        //let email = res.message;

                        //this.props.navigation.navigate("PatientProfile",this.state.email);
                        this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: "PatientProfile", params: {email: this.state.email} }),
                            ]
                        }))
                    } else {
                        alert(res.message);
                    }

                }).catch((error) => {
                    alert("Please check your Internet Connection");
                }).done();

        } catch (errors) {

        }

    }

    render(){

        this.state.email = this.props.navigation.state.params.email;

        return (

            <View style = {styles.ViewContainer}>

                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content"
                />

                <ScrollView style = {{paddingTop: 25, paddingBottom: 25, paddingHorizontal: 25}}>

                    <View>

                        {/* <Text style = {{ marginBottom: 10, marginHorizontal: "5%", marginTop: 10, paddingBottom: 15,color: "#424242",
                                        textAlign: "center", fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>
                            HELLO PATIENT{"\n"}ENTER YOUR DETAILS
                        </Text> */}

                        <KeyboardAvoidingView style = {{paddingTop: 15}}>

                            <InputField
                                secureEntry = {false}
                                onChangeText = {(text) => this.validate(text, 'fname') }
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize = "none"
                                label = "FIRST NAME"
                                fnameError = {this.state.fname_error}
                            />

                            <InputField
                                secureEntry = {false}
                                onChangeText = {(text) => this.validate(text, 'lname') }
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize = "none"
                                label = "LAST NAME"
                                lnameError ={this.state.lname_error}
                            />

                            <Text style = {styles.Label}>
                                GENDER
                            </Text>

                            <Grid style = {{marginTop: 10, marginBottom: 10}}>
                                <Col>
                                    <Grid>
                                        <Col style = {{width: 40,}}>
                                            <CheckBox
                                                style = {{}}
                                                onValueChange={this.genderCheckbox}
                                                value={this.state.maleCheckedValue}
                                            />
                                        </Col>
                                        <Col>
                                            <Text style = {{ paddingTop: 7}}>
                                                Male
                                            </Text>
                                        </Col>
                                    </Grid>
                                </Col>
                                <Col>
                                    <Grid>
                                        <Col style = {{width: 40,}}>
                                            <CheckBox
                                                style = {{}}
                                                onValueChange={this.genderCheckbox}
                                                value={this.state.femaleCheckedValue}
                                            />
                                        </Col>
                                        <Col>
                                            <Text style = {{ paddingTop: 7}}>
                                                Female
                                            </Text>
                                        </Col>
                                    </Grid>
                                </Col>
                            </Grid>

                            <Text style = {styles.Label}>
                                DATE OF BIRTH
                            </Text>

                            <DatePicker
                                style={{width: "100%", marginBottom: 7}}
                                mode="date"
                                date={this.state.date}
                                format="Do MMMM YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon = {false}
                                customStyles={{
                                    dateInput: {
                                        borderLeftColor: "transparent",
                                        borderRightColor: "transparent",
                                        borderTopColor: "transparent",
                                        borderBottomColor: "#F5F5F5",
                                        paddingBottom: 0,
                                    }
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />

                            <InputField
                                secureEntry = {false}
                                onChangeText = {(val) => this.setState({history: val})}
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize = "none"
                                label = "HISTORY"
                                otherError = {this.state.other_error}
                                autoCorrect={false}
                            />

                            <InputField
                                secureEntry = {false}
                                onChangeText = {(val) => this.setState({current_status: val})}
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize = "none"
                                label = "CURRENT STATUS"
                                otherError = {this.state.other_error}
                                autoCorrect={false}
                            />

                            <ImageSet />

                            <Grid style = {{marginTop: 20,}}>
                                <Col style = {{width: 40,}}>
                                    <CheckBox
                                        containerStyle={{backgroundColor: '#000'}}
                                        style = {{borderColor: "#bdbdbd"}}
                                        onValueChange={this.termsCheckbox}
                                        value={this.state.termsCheckedValue}
                                    />
                                </Col>
                                <Col>
                                    <Text style = {{paddingTop: 7}}>
                                        I agree to the Terms and Private Policy
                                    </Text>
                                </Col>
                            </Grid>

                            <TouchableOpacity style = {styles.ButtonStyle} onPress = {this.onUpdateProfilePressed.bind(this)}>
                                <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff"}}>
                                    SIGNUP
                                </Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>

                    </View>

                </ScrollView>

            </View>

        )
    }

}

const styles = {
    ViewContainer: {
        backgroundColor: "#ffffff",
        flex: 1
    },
    Label: {
        margin: 0,
        paddingLeft: 3,
        color: "#bdbdbd",
        fontSize: 12,
    },
    ButtonStyle: {
        marginTop: 20,
        marginBottom: 20,
        height: 45,
        width: "100%",
        backgroundColor: "#29B6F6",
        borderRadius: 5,
        alignSelf: "center",
    }
};
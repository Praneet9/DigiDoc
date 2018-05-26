import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon, Body, Grid, Col, Left, Header, Title, Button, Right, Thumbnail, Card } from 'native-base';
import {NavigationActions} from "react-navigation";

export default class PatientProfile extends Component {

    constructor() {
        super();

        this.state = {
            first_name: "",
            last_name: "",
            gender: "",
            dob: "",
            history: "",
            current_status: "",
            email: "",
        }
    }

    static async onLogout () {
        try {
            await AsyncStorage.removeItem("ACCESS_TOKEN");
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("profile_type");
            //this.props.navigation.navigate("Main")
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: "Main" }),
                ]
            }))
        } catch(error) {
            console.log("Something went wrong!")
        }
    }

    async componentWillMount () {

        try {
            //alert("In Here");
            await fetch('http://da.digiklug.com:12000/patients/profile', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    email: this.props.navigation.state.params.email,

                })
            }).then((response) => response.json())
                .then((res) => {
                    if (res.success === true) {
                        this.setState({email: res.user.email});
                        this.setState({first_name: res.user.first_name});
                        this.setState({last_name: res.user.last_name});
                        this.setState({dob: res.user.dob});
                        this.setState({gender: res.user.gender});
                        this.setState({history: res.user.history});
                        this.setState({current_status: res.user.current_status});
                    } else {
                        alert("Couldn't find your details");
                        history.goBack();
                    }

                }).catch((error) => {
                    alert("Please check your Internet Connection");
                }).done();

        } catch (errors) {

        }
    }

    static navigationOptions = (
        {
            title: 'Hello',
            header: null
        }
    );

    render(){

        return (

            <View style = {{backgroundColor: "#fff", flex: 1}}>

                <ScrollView>

                    <Header style={{backgroundColor: "#29B6F6", }}
                            androidStatusBarColor = "#0288D1"
                    >

                        <Left>
                            <Button transparent>
                                <Icon name='menu'/>
                            </Button>
                        </Left>
                        <Body style={{alignItems: "center"}}>
                        <Title style={{textAlign: "center"}}>Patient Profile</Title>
                        </Body>
                        <Right>
                        <Button transparent onPress= {() => this.props.navigation.navigate("PatCard")} >
                                <Icon name='md-albums' style={{ fontSize: 20, color: '#ffffff' }} />
                            </Button>
                            
                            <Button transparent onPress= {() => this.props.navigation.navigate("Appointment")} >
                                <Text style={{ fontSize: 30, color: '#ffffff' }}> + </Text>
                            </Button>
                            
                            <Button transparent>
                                <Icon name='settings'/>
                            </Button>
                        </Right>


                    </Header>

                    <Card style={{marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5}}>

                        <Grid style = {{margin: 20}}>
                            <Col style = {{width : "30%"}}>
                                <Thumbnail large source={{uri: 'http://via.placeholder.com/140x100'}} />
                            </Col>
                            <Col style = {{width : "60%", justifyContent: "center", alignItems: "center"}}>
                                <Text style = {{fontWeight: "bold", fontSize: 18, fontFamily: "Helvetica-Bold"}}>{this.state.first_name + " " + this.state.last_name}</Text>
                            </Col>
                        </Grid>

                    </Card>

                    {/*<Text style = {{marginHorizontal: 15, fontWeight: "bold", fontSize: 18, fontFamily: "Helvetica-Bold"}}>DETAILS</Text>

                    <View
                        style={{
                            borderBottomColor: '#000',
                            borderBottomWidth: 1,
                            marginHorizontal: 15,
                            marginTop: 5,
                            marginBottom: 10
                        }}
                    />*/}

                    <Card style={{marginLeft: 10, marginRight: 10, marginBottom: 10, paddingVertical: 10,}}>

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "ios-mail-outline"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>Email</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>{this.state.email}</Text>
                            </Col>
                        </Grid>

                        <View
                            style={{
                                borderBottomColor: '#bdbdbd',
                                borderBottomWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                        />

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "ios-call-outline"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>Contact</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>8097245128</Text>
                            </Col>
                        </Grid>

                        <View
                            style={{
                                borderBottomColor: '#bdbdbd',
                                borderBottomWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                        />

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "ios-clock-outline"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>History</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>{this.state.history}</Text>
                            </Col>
                        </Grid>

                        <View
                            style={{
                                borderBottomColor: '#bdbdbd',
                                borderBottomWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                        />

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "pulse"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>Diagonised</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>{this.state.current_status}</Text>
                            </Col>
                        </Grid>

                        <View
                            style={{
                                borderBottomColor: '#bdbdbd',
                                borderBottomWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                        />

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "medkit"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>Address</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>Some Colony, Some Place, Some City, Pincode - 400081</Text>
                            </Col>
                        </Grid>

                        <View
                            style={{
                                borderBottomColor: '#bdbdbd',
                                borderBottomWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                        />

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "person"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>Gender</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>{this.state.gender}</Text>
                            </Col>
                        </Grid>

                        <View
                            style={{
                                borderBottomColor: '#bdbdbd',
                                borderBottomWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                        />

                        <Grid style = {{marginHorizontal: 15}}>
                            <Col style = {{width : "15%", justifyContent: "center",}}>
                                <Icon name = "calendar"/>
                            </Col>
                            <Col style = {{width : "85%", justifyContent: "center",}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, fontFamily: "Helvetica-Bold"}}>Age</Text>
                                <Text style = {{fontWeight: "normal", fontSize: 12,}}>21</Text>
                            </Col>
                        </Grid>

                    </Card>

                    <TouchableOpacity style = {styles.ButtonStyle} onPress = {() => this.props.navigation.navigate("DoctorsList")}>
                        <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff", fontFamily: "Helvetica-Bold"}}>
                            Doctor's List
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.ButtonStyle} onPress = {PatientProfile.onLogout.bind(this)}>
                        <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff", fontFamily: "Helvetica-Bold"}}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>

        )

    }

}

const styles = {

    ButtonStyle: {
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 45,
        width: "95%",
        backgroundColor: "#29B6F6",
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center"
    }

};
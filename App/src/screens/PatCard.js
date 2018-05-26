import React, { Component } from 'react';
import {View,PixelRatio,Image, Text,StatusBar, CheckBox , ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import InputField from '../components/InputField'
import { Grid, Col, } from 'native-base';
import DatePicker from 'react-native-datepicker'
import  ImagePicker from 'react-native-image-picker';

import {NavigationActions} from "react-navigation";

export default class PatCard extends Component{

    constructor() {
        super();

        this.state = {
            ImageSource: null,
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
            title: 'PatCard',
            header: null
        }
    );

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
   
              ImageSource: source
   
            });
          }
        });
      }

    render(){
        return(
            <ScrollView style={{ marginHorizontal: 20 }}>
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

 
 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

   <View style={styles.ImageContainer}>

   { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
     <Image style={styles.ImageContainer} source={this.state.ImageSource} />
   }

   </View>

 </TouchableOpacity>


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

<InputField
    secureEntry = {false}
    onChangeText = {(val) => this.setState({current_status: val})}
    returnKeyType="next"
    keyboardType="default"
    autoCapitalize = "none"
    label = "COMPLICATIONS"
    otherError = {this.state.other_error}
    autoCorrect={false}
/>


<TouchableOpacity style = {styles.ButtonStyle} onPress= {() => this.props.navigation.navigate("PatientProfile")} >
    <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff"}}>
        SUBMIT
    </Text>
</TouchableOpacity>

</KeyboardAvoidingView>
            </ScrollView>

        );
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1'
      },
   
      ImageContainer: {
        width: 100,
        height: 100,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#29B6F6',
        
      },

};
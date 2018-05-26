import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {Icon} from 'native-base';
import {NavigationActions} from 'react-navigation';
import ImageSet from '../components/ImageSet';
import InputField from '../components/InputField';
import DateAndTimePicker from '../components/DateAndTimePicker';

export default class CardDetail extends Component {
    
static navigationOptions = (
    {
        title: 'CardDetail',
        header: null
    }
);
    render(){
        return(
            <ScrollView style={styles.Profile}> 
                    <ImageBackground
                        source={require('../../android/app/src/main/res/drawable/clinic.jpg')} 
                        style={styles.backgroundImage} >
                        <View style={styles.backgroundOverlay}>
                            <View style ={styles.ImageContainer}>
                                <Image style ={styles.Images} source={require('../../android/app/src/main/res/drawable/profile.jpg')} />                
                                <Text style={styles.ClinicName}>Clinic Name </Text>
                            </View>
                        </View> 
                    </ImageBackground>
                    <ImageSet />
                    <View style={styles.Container}>
                        <Text style={styles.SetText}> Set appointment</Text>
                        <View>
                             <DateAndTimePicker />
                             <TouchableOpacity style = {styles.ButtonStyle} onPress = {() => alert('Appointment Set')} >
                        <Text style = {{textAlign: "center", padding: 12, fontWeight: "bold", color: "#fff"}}>
                            Set Appointment
                        </Text>
                             </TouchableOpacity>
                             <Text style={{ textAlign: 'center', marginVertical: 10, color: '#a8a8a8' }} > OR </Text>
                             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                 <Icon name="mail" style={{marginHorizontal:20,padding: 12, backgroundColor: '#FFEB3B', color: '#fff', width: 50, height: 50, borderRadius: 50 }}/>
                                 <Icon name="text" style={{marginHorizontal:20,padding: 12, backgroundColor: '#4CAF50', color: '#fff',width: 50, height: 50,borderRadius: 50 }}/>
                                 <Icon name="call" style={{marginHorizontal:20,padding: 12, backgroundColor: '#03A9F4', color: '#fff',width: 50, height: 50,borderRadius: 50  }}/>
                                 
                             </View>
                        </View>

                    </View>
                
            </ScrollView>

        );
    }
}

const styles = {
    Icon:{

    },
    backgroundOverlay: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255, 0.5)'
    },

    backgroundImage:{
        flex: 1,
        height: 200,
        width: null,
    },
    Profile: {
        flex: 1,
        backgroundColor: '#fff',
    },
Images: {
    borderRadius: 50,
    height: 80,
    width: 80,
    borderWidth: 3,
    borderColor: '#fff'
},
ImageContainer:{
    flexDirection: 'row',
    left: '20%',
    top: '25%'
},
ClinicName: { 
    marginLeft: '3%', 
    fontWeight: "bold",
    fontSize: 22,
},
Container: {
    flex: 1,
    marginHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#eee',

},
SetText: {
    fontSize:18,
    marginBottom: 10
},
ButtonStyle: {
    marginTop: 10,
    height: 45,
    width: "70%",
    backgroundColor: "#29B6F6",
    borderRadius: 20,
    alignSelf: "center",
}
}
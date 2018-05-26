import React, {Component} from 'react';
import {Text, Image,TouchableOpacity, View, Button} from 'react-native';
import CardDetail from '../screens/CardDetail';
import {NavigationActions} from "react-navigation";


const Card = ({ imageURL, title, address, votes, category, navigation}) =>{
    
    return(
        <TouchableOpacity onPress= {() => navigation.navigate("CardDetail")}>
        <View style={ styles.Card}>
            <View style= {styles.ImageContainer}>
                <Image style={styles.Images} source={require('../../android/app/src/main/res/drawable/clinic.jpg')}  />
            </View>
            <View style={styles.InnerView}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.Title}> {title} </Text>
                    <Text> {category} </Text>
                    <Text> {address} </Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text>{votes}</Text>
                    <TouchableOpacity style={styles.Button}>
                        <Text style={{color: '#ffffff'}}>Call</Text>    
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );
}

export default Card;

const styles = {
    Title:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    Card: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: "#eee",
    },
    InnerView: {
        marginLeft: 20,
        justifyContent:  'space-between',
         flexDirection: 'row',
         flex: 1,
    },

    Images: {
        borderRadius: 50,
        height: 70,
        width: 70
    },
    ImageContainer:{       
        height: 70,
        width: 70

    },

    Button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: "#29B6F6",
        borderRadius: 5,
    }


}
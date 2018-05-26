import React, { Component } from 'react';
import {ScrollView,ImageBackground, View, Image, Text} from 'react-native';

const ImageSet= ({}) => {
    return(
        <View style={styles.Container}>
            <Text style={styles.SetText}>Images of clinic </Text>
            <View style={styles.SetContainer}>
                <Image style={styles.ImageItem} source={require('../../android/app/src/main/res/drawable/clinic.jpg')}/>
                <Image style={styles.ImageItem} source={require('../../android/app/src/main/res/drawable/clinic.jpg')}/>
                <Image style={styles.ImageItem} source={require('../../android/app/src/main/res/drawable/clinic.jpg')}/>
                <ImageBackground style={styles.LastItem} source={require('../../android/app/src/main/res/drawable/clinic.jpg')} >
                    <View style={styles.lastOverlay}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </ImageBackground>
                <Image />
            </View>
        </View>
    );


}

export default ImageSet;

const styles= {
    Container: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: '#eee',

    },
    SetContainer: {
        flex :1,
        flexDirection: 'row',
        
    },
    ImageItem: {
        height: 40,
        width: 40,
        marginRight: 15, 
    },
    SetText: {
        fontSize:18,
        marginBottom: 10
    },
    LastItem: {
        height: 40, 
        width: 40,
    },
    lastOverlay:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plus: {
        color: '#fff',
        fontSize: 25,
        
    }
  }
import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import Card from './Card'

const CardList = ({type , navigation}) => {
    return(
        <ScrollView style={{ flex: 1 }}>
        {/* <Text> {type} </Text> */}
        <Card
        title = 'Orient Clinic'
        category = 'Orthopedic'
        address = 'Marine Lines'
        votes = '92%'
        navigation= {navigation}
    />
    <Card
        
        title = 'V Star'
        category = 'Dental'
        address = 'Charni Road'
        votes = '86%'
        navigation= {navigation}
    />
    <Card
        
        title = 'K Mart'
        category = 'Orthopedic'
        address = 'Marine Lines'
        votes = '92%'
        navigation= {navigation}
    />
    <Card
        
        title = 'Williams'
        category = 'Dental'
        address = 'Churchgate'
        votes = '98%'
        navigation= {navigation}
    />
    </ScrollView>
    );

} 

export default CardList;
import React, {Component} from 'react';
import {Text, Image,ScrollView,  View, TextInput, TouchableOpacity, } from 'react-native';
import {NavigationActions} from "react-navigation";
import { AreaChart, Grid , PieChart} from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'
import * as shape from 'd3-shape'

import {Icon} from 'native-base'
export default class Analytics extends Component{
    constructor(props){
        super(props);



        this.state = {
            data: [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ],
           

     
        }
    }

   

    static navigationOptions = (
        {
            title: 'Analytics',
            header: null
        }
    );

    render(){

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: randomColor() },
                key: `pie-${index}`,
            }))

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={ index }>
                        <Line
                            x1={ labelCentroid[ 0 ] }
                            y1={ labelCentroid[ 1 ] }
                            x2={ pieCentroid[ 0 ] }
                            y2={ pieCentroid[ 1 ] }
                            stroke={ data.svg.fill }
                        />
                        <Circle
                            cx={ labelCentroid[ 0 ] }
                            cy={ labelCentroid[ 1 ] }
                            r={ 15 }
                            fill={ data.svg.fill }
                        />
                    </G>
                )
            })
        }

        return(
            <ScrollView style={styles.Container}>
            <View style={{ flexDirection: 'row' , margin: 5}}>
                    <View style={ styles.Icon}>
                        <Icon name="md-search" style={{ color: "#29B6F6"}} />
                    </View>
                    <TextInput placeholder="Search" style={{flex:1 }} />
                </View>

                <Text style={{ marginHorizontal:20 }}>Number of appointments</Text>
                
                <AreaChart
                style={{ marginHorizontal: 20,height: 200, flex:1 }}
                data={this.state.data }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
            </AreaChart>

            <Text style={{ marginHorizontal:20 }}>Types of fractures</Text>

            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                innerRadius={ 20 }
                outerRadius={ 55 }
                labelRadius={ 80 }
            >
                <Labels/>
            </PieChart>


            
            </ScrollView>
        );
    }
}


const styles={


}
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Favourites from './Favourites'
import Map from './Map'

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator initialRouteName='Home' swipeEnabled={true} tabBarOptions={{activeTintColor:'#fff', labelStyle:{fontSize:18, fontWeight:'bold'}, tabStyle:{justifyContent:'center', borderWidth:0}, swipeEnabled:true, style:{backgroundColor:'#000'}}}>
            <Tab.Screen name="Feed" component={Home} />
            <Tab.Screen name="Favourites" component={Favourites} />
            <Tab.Screen name="Maps" component={Map} />
        </Tab.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default HomeScreen;

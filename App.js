/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import Screens from './screens'
const {Home, Detail} = Screens

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import HomeScreen from './screens/HomeScreen'

const Stack = createStackNavigator();
const App = () => {
  
  const barOptions = {
    headerStyle:{
      backgroundColor:'#000',
    },
    headerTitleStyle:{
      color:'#fff'
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{...barOptions, headerTitle:props => <TitleBar/>}} />
        <Stack.Screen name='Detail' component={Detail} options={{...barOptions, headerTintColor:'#fff'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TitleBar = () => {
  return (
    // <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <Text style={{color:'#fff', fontSize:27, fontWeight:'bold'}}>Movie<Text style={{color:'#ff0'}}>DB</Text></Text>
  );
}


const styles = StyleSheet.create({
  
});

export default App;

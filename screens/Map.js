//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Modal } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';

// create a component
const MapPage = ({navigation}) => {
    const [coord, setCoord] = useState({longitude:3.2,latitude:6.7, latitudeDelta:0.05, longitudeDelta:0.05})
    
    const getLoc = async() => {
        try {
            let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if(granted) {
                Geolocation.getCurrentPosition(info => {
                    let cd = coord;
                    cd.longitude = info.coords.longitude;
                    cd.latitude = info.coords.latitude;
                    setCoord(cd);
                    console.log(coord);
                });
            }
        } catch(err) {
            // console.log(err);
        }
    }

    useEffect(()=>{
        setInterval(()=>getLoc(), 100)
    },[]);

    return (
        <View style={{flex:1}}>
            <Modal transparent={true}>
                <View style={{height:200,marginVertical:80}}>
                    <Text>Longitude: {coord.longitude}</Text>
                    <Text>Latitude: {coord.latitude}</Text>
                    {/* <Text>Altitude: {coord.altitude}</Text>
                    <Text>Speed: {coord.speed}</Text> */}
                </View>
            </Modal>

            <MapView style={{flex:1}} initialRegion={{latitude:coord.latitude, longitude:coord.longitude, latitudeDelta:0.005, longitudeDelta:0.005}} >
                <Marker coordinate={{latitude:coord.latitude, longitude:coord.longitude}} />
            </MapView>
        </View>
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
export default MapPage;

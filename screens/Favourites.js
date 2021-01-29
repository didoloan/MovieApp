//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { apilink, imglinkbase } from '../app.json' 

const composeImgurl = imgpath => {
    let full = imglinkbase+imgpath.replace('\\','');
    return full;
}

const MovieItem = ({navigation, item}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('Detail', item)}>
            <View style={{width:80,height:130,margin:5}}>
                <ImageBackground style={{flex:1, resizeMode:'cover', justifyContent:'center'}} source={{uri:composeImgurl(item.poster_path)}}>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

// create a component
const Favourites = ({navigation}) => {
    const [favs, addFav] = useState([]);

    useEffect(()=>{
        getFav();
    },[]);

    useEffect(() => {
        navigation.addListener('focus', ()=>{
            console.log('in view');
            getFav();
        })
    }, [navigation])

    const getFav = async () => {
        console.log('fetching');
        let favs
        try {
            favs = await AsyncStorage.getItem('movies');
            // console.log(JSON.parse(favs));
        } catch (error) {
            
        }
        addFav(JSON.parse(favs));
    }

    return (
        <View style={styles.container}>
            <FlatList data={favs} horizontal={false} numColumns={4} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <MovieItem navigation={navigation} item={item} />} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Favourites;

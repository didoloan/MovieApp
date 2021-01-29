//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {imglinkbase, genres, ytkey} from '../app.json';
import TextStroke from '../stylehelper/TextStroke';
import YouTube, {YouTubeStandaloneAndroid} from 'react-native-youtube';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const composeImgurl = imgpath => {
    if(imgpath){
        let full = imglinkbase+imgpath.replace('\\','');
        return full;
    }
    return
}

// create a component
const Detail = ({route, navigation}) => {
    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerLeftStyle: {color:'#fff'},
    //     });
    // }, []);

    const item = route.params;

    const [itemgenres, setGenres] = useState([]);
    // const [vid, setVid] = useState([]);
    // const [vids, setVids] = useState([]);
    const [vid, setVid] = useState('');

    const populateGenres = () => {
        let movieGenres = [];
        genres.forEach(genre => {
            if(item.genre_ids.includes(genre.id)){
                movieGenres.push(genre.name);
            }
        })
        setGenres(movieGenres);
    }

    const addToFav = async() => {
        let old = await AsyncStorage.getItem('movies');
        // console.log(old);
        if(!old){
            try {
                let res = await AsyncStorage.setItem('movies', JSON.stringify([item]))
            } catch (error) {
                console.log(error);
            }
        }else{
            old = JSON.parse(old);
            try {
                let res = await AsyncStorage.setItem('movies', JSON.stringify([item, ...old]));
            } catch (error) {
                // console.log(error);
            }
        }
        
    }

    const getVideoID = async() => {
        // console.log(item.id);
        let result;
        try {
            let res = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=16e4f0d31b676995ea0f3aa8dd6b3d38`);
            result = await res.json();
        } catch (error) {
            // console.log('fetch failed');
        }
        setVid(result.results[0].key);
        // console.log(result.results[0].key);
        // console.log(vid);
        // let ids = []
        // result.results.forEach(vid => ids.push(vid.key));
        // setVids([...ids]);
        // console.log(ids);
        // setTimeout(()=>{console.log('state value: '+vids);}, 200);
    }

    useEffect(() => {
        populateGenres();
    },[]);

    useEffect(() => {
        getVideoID();
        getVideoID();
    },[])

    return (
        <View style={styles.container}>
            <View style={{height:250,width:360}}>
                <ImageBackground style={{flex:1, padding:10, resizeMode:'cover', flexDirection:'column'}} source={{uri:composeImgurl(item.backdrop_path)}}>
                
                    <View style={{flexDirection:'row',position: 'relative'}}>
                        
                        <View style={{width:100, height:180, borderWidth:2, borderColor:'#000', borderRadius: 6, overflow:'hidden'}}>
                            <ImageBackground style={{flex:2, resizeMode:'cover', justifyContent:'center'}} source={{uri:composeImgurl(item.poster_path)}}>
                            </ImageBackground>
                        </View>
                        <View style={{padding:20, flexWrap:'wrap', flexDirection:'column', justifyContent:'center',alignItems:'center',width: 240}}>
                            <TouchableOpacity onPress={() => addToFav()} style={{marginBottom:30}}>
                                <Icon name='star' size={30} color='#aaa' />
                            </TouchableOpacity>
                            <TextStroke stroke={2} color={'#000'}>
                                <Text style={{color:'#fff', fontSize:27, fontWeight:'bold'}}>{item.original_title}</Text>
                            </TextStroke>
                        </View>
                        
                    </View>
                    
                    <View style={{justifyContent:'center' ,flexDirection:'row', flexWrap:'wrap', paddingTop:20}}>
                        {itemgenres.map((genre,key) => <TouchableOpacity key={key}><Text style={styles.genre}>{genre}</Text></TouchableOpacity>)}
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>
            <View style={{padding:20, backgroundColor:'#000'}}>
                <Text style={{fontSize:26, color:'#fff', fontWeight:'bold'}}>Description:</Text>
                <Text style={{fontSize:16, color:'#fff'}}>{item.overview}</Text>
                <Text style={{fontSize:20, color:'#fff'}}><Text style={{fontWeight:'bold'}}>Release Date:</Text> {item.release_date}</Text>
                <Text style={{fontSize:20, color:'#fff'}}><Text style={{fontWeight:'bold'}}>Rating:</Text> {item.vote_average}</Text>
            </View>
                <Text style={{fontSize:26, color:'#fff', fontWeight:'bold', paddingLeft:20}}>Watch Trailer</Text>
                {/* {vid&&vid.map(video => <YouTube
                apiKey= {ytkey}
                videoId={video.key}
                controls={1}
                style={{ alignSelf: 'stretch', height: 300 }}
                />)} */}
                {vid!==''&&<YouTube
                apiKey= {ytkey}
                showinfo={false}
                videoId={vid}
                controls={1}
                rel={false}
                modestbranding={true}
                style={{ alignSelf: 'stretch', height: 270 }}
                />}
            </ScrollView>
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#000',
    },
    genre: {
        borderRadius:8,
        marginRight:5,
        marginBottom:5,
        fontSize: 12,
        padding: 5,
        backgroundColor: '#eee',
        color:'#000',
        position:'relative'
    }
});

//make this component available to the app
export default Detail;

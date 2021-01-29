//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, 
    Alert, ImageBackground, Modal, 
    Button, FlatList, TextInput, 
    TouchableOpacity, ActivityIndicator
 } from 'react-native';
// import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { apilink, imglinkbase } from '../app.json'
import Icon from 'react-native-vector-icons/FontAwesome'
// create a component



// create a component
const composeImgurl = imgpath => {
    let full = imglinkbase+imgpath.replace('\\','');
    return full;
}

const MovieItem = ({item,navigation}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('Detail', item)}>
            <View style={{width:80,height:130,margin:5}}>
                <ImageBackground style={{flex:1, resizeMode:'cover', justifyContent:'center'}} source={{uri:composeImgurl(item.poster_path)}}>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};



const Home = ({navigation}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [nextPage, setNext] = useState(2);
    const [search, setSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerRight: ()=> (<TouchableOpacity style={{paddingRight:10,}} onPressIn={() => setSearch(!search)}><Icon name={search?'times':'search'} size={30} color={search?'#000':'#fff'} /></TouchableOpacity>),
    //     });
    // }, [search]);

    const getMovies = async() => {
        setLoading(true);
        let result;
        try {
            let res = await fetch(apilink);
            result = await res.json();
        } catch (error) {
            Alert.alert('Network Error', 'Try again?',
            [
                {text:'No', onPress:()=>1+1},
                {text:'Retry', onPress:()=>getMovies()}  
            ],
            {cancelable:true})
        }
        setMovies(result.results);
        setLoading(false);
    }

    const getMoreMovies = async(page) => {
        let result;
        try {
            let res = await fetch(`${apilink}&page=${nextPage}`);
            result = await res.json();
        } catch (error) {
            Alert.alert('Network Error', 'Try again?',
            [
                {text:'No', onPress:()=>1+1},
                {text:'Retry', onPress:()=>getMoreMovies()}  
            ],
            {cancelable:true})
        }
        setMovies([...movies, ...result.results]);
        setNext(nextPage+1);
    }

    useEffect(() => {
        getMovies();
        getMoreMovies();
    }
    ,[])
    return (
        <View style={styles.container}>
            
            <View style={{justifyContent:'center', alignItems:'center', position:'absolute', zIndex:2, bottom:20, right:20, padding:5, borderRadius:25}}>
            <TouchableOpacity>
            <Icon.Button
            name="filter"
            backgroundColor="#3b5998"
            onPress={()=> getMoreMovies}>
            Filter
            </Icon.Button>
            </TouchableOpacity>
            
            </View>
            
            {/* <View style={{backgroundColor:'#000', width:360,padding:10, alignItems:'center', flexDirection:'row'}}>
            {search&&<TextInput onChangeText={text => setSearchText(text)} value={searchText} style={{width:300, height:40, paddingHorizontal:20, marginRight:10, backgroundColor:'#fff', borderRadius:16}} />}
                {search&&<TouchableOpacity onPress={() => setSearch(!search)}><Icon name='times' size={30} color='#fff'/></TouchableOpacity>}
            </View> */}
            
            <FlatList data={movies} horizontal={false} numColumns={4} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <MovieItem navigation={navigation} item={item} />} onEndReachedThreshold={1} 
            onEndReached={({ distanceFromEnd }) => {
                getMoreMovies()
            }} />
            <ActivityIndicator animating={loading} />
        </View>
    );
};

// const apilink = 'https://api.themoviedb.org/3/discover/movie?sortby=popularity.desc&api_key=16e4f0d31b676995ea0f3aa8dd6b3d38';
// const imglinkbase = 'https://image.tmdb.org/t/p/w220_and_h330_face';

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
export default Home;

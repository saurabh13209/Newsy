import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as RNLocalize from "react-native-localize";
import Axios from 'axios';
import NewsStore from '../../Store/NewsStore';
import { FlatList } from 'react-native-gesture-handler';
import { Observer } from 'mobx-react';
import { fontCustomSize } from '../../Common/fontCustomSize';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import AntIcons from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';

export default HomeScreen = ({ navigation }) => {

    useEffect(() => {
        NewsStore.homeData = []
        Axios.get("https://newsapi.org/v2/top-headlines?country=" + RNLocalize.getCountry().toLowerCase() + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.articles.forEach((newsEach, index) => {
                var keyMain = newsEach.publishedAt + newsEach.title.split(" ")[0] + newsEach.title.split(" ")[1] + newsEach.title.split(" ")[2];
                database().ref("News/" + keyMain + "/").once("value", (resData => {
                    if (resData.val() == null) {
                        database().ref("News/" + keyMain + "/").set({
                            "Like": 0,
                            "Dislike": 0,
                        })
                    } else {
                        var temp = newsEach;
                        temp["Like"] = resData.val()["Like"];
                        temp["Dislike"] = resData.val()["Dislike"];
                        NewsStore.homeData = [
                            ...NewsStore.homeData,
                            temp
                        ]
                    }
                }))
            })
        })
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Observer>
                {
                    () => (<FlatList
                        data={NewsStore.homeData}
                        renderItem={({ item, index }) => (<TouchableOpacity
                            onPress={() => {
                                Linking.openURL(item.url)
                            }}
                        >
                            <View style={{ flexDirection: 'column', margin: 10, elevation: fontCustomSize(5), backgroundColor: 'white', borderRadius: fontCustomSize(5) }}>
                                {item.author == null ? null : item.author == "" ? null : <TouchableOpacity
                                    onPress={() => {
                                        console.log("Open Page post");
                                    }}
                                ><Text style={{ padding: fontCustomSize(10), fontFamily: "Bold", color: 'black' }}>{item.author}</Text></TouchableOpacity>}
                                {item.urlToImage == "" ? null : <Image source={{ uri: item.urlToImage }} style={{ height: fontCustomSize(160), resizeMode: "cover" }} />}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: fontCustomSize(10), paddingBottom: 0 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    var temp = [];
                                                    NewsStore.homeData.forEach((data, i) => {
                                                        if (i == index) {
                                                            var x = data;
                                                            x["Like"] += 1;
                                                            temp = [
                                                                ...temp,
                                                                x
                                                            ]
                                                        } else {
                                                            temp = [
                                                                ...temp,
                                                                data
                                                            ]
                                                        }
                                                    })
                                                    NewsStore.homeData = temp
                                                    var keyMain = item.publishedAt + item.title.split(" ")[0] + item.title.split(" ")[1] + item.title.split(" ")[2]
                                                    database().ref("News/" + keyMain + "/Like").once("value", (likeValue => {
                                                        database().ref("News/" + keyMain + "/").update({ "Like": parseInt(likeValue.val()) + 1 })
                                                    }))
                                                }}
                                                style={{ flexDirection: 'row', flexDirection: 'row', }}>
                                                <AntIcons name="like2" size={fontCustomSize(16)} color="black" />
                                                <Text style={{ marginLeft: fontCustomSize(5), fontSize: fontCustomSize(14), fontFamily: "Bold" }}>{item.Like}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    var temp = [];
                                                    NewsStore.homeData.forEach((data, i) => {
                                                        if (i == index) {
                                                            var x = data;
                                                            x["Dislike"] += 1;
                                                            temp = [
                                                                ...temp,
                                                                x
                                                            ]
                                                        } else {
                                                            temp = [
                                                                ...temp,
                                                                data
                                                            ]
                                                        }
                                                    })
                                                    NewsStore.homeData = temp
                                                    var keyMain = item.publishedAt + item.title.split(" ")[0] + item.title.split(" ")[1] + item.title.split(" ")[2]
                                                    database().ref("News/" + keyMain + "/Dislike").once("value", (likeValue => {
                                                        database().ref("News/" + keyMain + "/").update({ "Dislike": parseInt(likeValue.val()) + 1 })
                                                    }))
                                                }}
                                                style={{ flexDirection: 'row', flexDirection: 'row', }}>
                                                <AntIcons name="dislike2" size={fontCustomSize(16)} color="black" />
                                                <Text style={{ marginLeft: fontCustomSize(5), fontSize: fontCustomSize(14), fontFamily: "Bold" }}>{item.Dislike}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("MemesScreen");
                                            }}
                                            style={{ flexDirection: 'row', flexDirection: 'row', }}>
                                            <FontistoIcons name="laughing" size={fontCustomSize(16)} color="black" />
                                            <Text style={{ marginLeft: fontCustomSize(5), fontSize: fontCustomSize(14), fontFamily: "Bold" }}>Memes</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', padding: fontCustomSize(10) }}>
                                    <Text style={{ fontSize: fontCustomSize(14), fontFamily: "SemiBold" }}>{item.title}</Text>
                                    <Text style={{ fontSize: fontCustomSize(11), fontFamily: "Regular", marginTop: fontCustomSize(3) }}>{item.description}></Text>
                                </View>
                            </View>
                        </TouchableOpacity>)}
                        keyExtractor={(item) => (item.title + "")} />)
                }
            </Observer>
        </View >
    );
}
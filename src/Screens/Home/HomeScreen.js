import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ActivityIndicator, ToastAndroid } from 'react-native';
import * as RNLocalize from "react-native-localize";
import Axios from 'axios';
import NewsStore from '../../Store/NewsStore';
import { FlatList } from 'react-native-gesture-handler';
import { Observer } from 'mobx-react';
import { fontCustomSize } from '../../Common/fontCustomSize';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import {
    addDislike, addLike, setFollowData, getDislikedItems,
    getFollowData, getBookmarkData, setBookmarkData, getKeyMain, getLikedItems
} from '../../Common/functions';


export default HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [likedArray, setLikedArray] = useState([]);
    const [dislikedArray, setDislikedArray] = useState([]);

    useEffect(() => {
        setLoading(true);
        getFollowData();
        getBookmarkData();
        setLikedArray(getLikedItems());
        setDislikedArray(getDislikedItems());
        NewsStore.homeData = []
        Axios.get("https://newsapi.org/v2/top-headlines?country=" + RNLocalize.getCountry().toLowerCase() + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.articles.forEach(newsEach => {
                var keyMain = getKeyMain(newsEach);
                database().ref("News/" + keyMain + "/").once("value", (resData => {
                    if (resData.val() == null) {
                        database().ref("News/" + keyMain + "/").set({
                            "Like": 0,
                            "Dislike": 0,
                        })
                        var temp = newsEach;
                        temp["Like"] = 0;
                        temp["Dislike"] = 0;
                        NewsStore.homeData = [
                            ...NewsStore.homeData,
                            temp
                        ]
                    } else {
                        var temp = newsEach;
                        temp["Like"] = resData.val()["Like"];
                        temp["Dislike"] = resData.val()["Dislike"];
                        NewsStore.homeData = [
                            ...NewsStore.homeData,
                            temp
                        ]
                    }
                    setLoading(false);
                }))
            })
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Observer>
                {
                    () => (isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#252525" />
                    </View> : NewsStore.homeData.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#252525", fontFamily: "Bold", fontSize: fontCustomSize(14) }}>No News</Text>
                    </View> : <FlatList
                                data={NewsStore.homeData}
                                renderItem={({ item, index }) => (<TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(item.url)
                                    }}
                                >
                                    <View style={{ flexDirection: 'column', margin: 10, elevation: fontCustomSize(5), backgroundColor: 'white', borderRadius: fontCustomSize(5) }}>
                                        {item.source.id == null ? null : item.author == "" ? null : <View style={{ margin: fontCustomSize(10), marginBottom: 0, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: "Bold", color: 'black' }}>{item.source.name}</Text>
                                            <Observer>
                                                {
                                                    () => (<TouchableOpacity
                                                        onPress={() => {
                                                            setFollowData(item.source.id, item.source.name);
                                                        }}
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: fontCustomSize(10), backgroundColor: NewsStore.followingPages.includes(item.source.name) ? "#252525" : "#fff", borderColor: NewsStore.followingPages.includes(item.source.name) ? "#fff" : "#252525", borderWidth: 1, padding: fontCustomSize(4), paddingLeft: fontCustomSize(8), paddingRight: fontCustomSize(8), }}>
                                                        {NewsStore.followingPages.includes(item.source.name) ? null : <AntIcons name="plus" color="#252525" style={{ marginRight: fontCustomSize(5) }} />}
                                                        <Text style={{ fontFamily: "Regular", color: NewsStore.followingPages.includes(item.source.name) ? "#fff" : "#252525" }}>{NewsStore.followingPages.includes(item.source.name) ? "Following" : "Follow"}</Text>
                                                    </TouchableOpacity>)
                                                }
                                            </Observer>
                                        </View>}
                                        {item.author == null ? null : item.author == "" ? null : <TouchableOpacity
                                            onPress={() => {
                                                console.log("Open Page post");
                                            }}
                                        ><Text style={{ padding: fontCustomSize(10), paddingTop: fontCustomSize(5), fontFamily: "Medium", color: 'black' }}>{item.author}</Text></TouchableOpacity>}
                                        {item.urlToImage == "" ? null : item.urlToImage == undefined ? null : <Image source={{ uri: item.urlToImage }} style={{ height: fontCustomSize(160), resizeMode: "cover" }} />}
                                        <View style={{ flexDirection: 'row', padding: fontCustomSize(10), paddingBottom: 0 }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (!likedArray.includes(getKeyMain(item))) {
                                                                var keyMain = getKeyMain(item);
                                                                addLike(keyMain);
                                                                setLikedArray(getLikedItems());
                                                                database().ref("News/" + keyMain + "/Like").once("value", (likeValue => {
                                                                    database().ref("News/" + keyMain + "/").update({ "Like": parseInt(likeValue.val()) + 1 }).catch(err => console.log(err))
                                                                })).catch(err => console.log(err))
                                                            } else {
                                                                ToastAndroid.show("Already liked", ToastAndroid.LONG);
                                                            }
                                                        }}
                                                        style={{ flexDirection: 'row', flexDirection: 'row', }}>
                                                        <Observer>{() => (<AntIcons name={likedArray.includes(getKeyMain(item)) ? "like1" : "like2"} size={fontCustomSize(16)} color="black" />)}</Observer>
                                                        <Text style={{ marginLeft: fontCustomSize(5), fontSize: fontCustomSize(14), fontFamily: "Bold" }}>{item.Like}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginLeft: fontCustomSize(20) }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (!dislikedArray.includes(getKeyMain(item))) {
                                                                var keyMain = getKeyMain(item);
                                                                addDislike(keyMain);
                                                                setDislikedArray(getDislikedItems());
                                                                database().ref("News/" + keyMain + "/Dislike").once("value", (likeValue => {
                                                                    database().ref("News/" + keyMain + "/").update({ "Dislike": parseInt(likeValue.val()) + 1 })
                                                                }))
                                                            } else {
                                                                ToastAndroid.show("Already disliked", ToastAndroid.LONG);
                                                            }
                                                        }}
                                                        style={{ flexDirection: 'row', flexDirection: 'row', }}>
                                                        <Observer>{() => (<AntIcons name={item["Dislike"] == 1 ? "dislike1" : "dislike2"} size={fontCustomSize(16)} color="black" />)}</Observer>
                                                        <Text style={{ marginLeft: fontCustomSize(5), fontSize: fontCustomSize(14), fontFamily: "Bold" }}>{item.Dislike}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'column', padding: fontCustomSize(10) }}>
                                            <Text style={{ fontSize: fontCustomSize(14), fontFamily: "SemiBold" }}>{item.title}</Text>
                                            <Text style={{ fontSize: fontCustomSize(11), fontFamily: "Regular", marginTop: fontCustomSize(3) }}>{item.description}></Text>
                                        </View>
                                        <View style={{ marginLeft: fontCustomSize(10), flexDirection: 'row', marginRight: fontCustomSize(10), marginBottom: fontCustomSize(10), justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: "Regular", color: "#2c2d2d" }}>published At: {new Date(item.publishedAt).getHours()}:{new Date(item.publishedAt).getMinutes()}</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Linking.openURL(`whatsapp://send?text=` + item.url + "\n\n" + item.title + "\n\nTo read more such interesting news, download Newsy Application");
                                                    }}
                                                    style={{ flexDirection: 'row', marginRight: fontCustomSize(10) }}>
                                                    <FontIcons name="share" color="#252525" size={fontCustomSize(16)} style={{ marginRight: fontCustomSize(5) }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setBookmarkData({
                                                            sourceName: item.source.name == null ? "" : item.source.name,
                                                            sourceId: item.author == null ? "" : item.author,
                                                            url: item.url,
                                                            title: item.title,
                                                            urlToImage: item.urlToImage == null ? "" : item.urlToImage,
                                                            description: item.description,
                                                            publishedAt: item.publishedAt
                                                        });
                                                    }}
                                                    style={{ flexDirection: 'row' }}>
                                                    <Observer>
                                                        {
                                                            () => (
                                                                NewsStore.bookmarkId.includes(item.title) ? <FontIcons name="bookmark" color="#252525" size={fontCustomSize(16)} style={{ marginRight: fontCustomSize(5) }} /> : <FontIcons name="bookmark-o" color="#252525" size={fontCustomSize(16)} style={{ marginRight: fontCustomSize(5) }} />
                                                            )
                                                        }
                                                    </Observer>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>)}
                                keyExtractor={(item) => (item.title + "")} />)
                }
            </Observer>
        </View >
    );
}
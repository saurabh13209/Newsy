import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Share } from 'react-native';
import * as RNLocalize from "react-native-localize";
import Axios from 'axios';
import NewsStore from '../../Store/NewsStore';
import { FlatList } from 'react-native-gesture-handler';
import { Observer } from 'mobx-react';
import { fontCustomSize } from '../../Common/fontCustomSize';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import { getRealmData, setBookMarkData } from '../../Common/functions';
import Realm from 'realm';
import { BookmarkSchema, FollowSchema } from '../../Common/Schema';


export default HomeScreen = ({ navigation }) => {

    const [newsId, setMapId] = useState({})
    const realm = new Realm({ schema: [BookmarkSchema, FollowSchema] });


    useEffect(() => {
        setMapId(getRealmData());
        setBookMarkData();
        NewsStore.homeData = []
        Axios.get("https://newsapi.org/v2/top-headlines?country=" + RNLocalize.getCountry().toLowerCase() + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.articles.forEach((newsEach, index) => {
                var keyMain = newsEach.publishedAt + newsEach.title.split(" ")[0] + newsEach.title.split(" ")[1] + newsEach.title.split(" ")[2];
                keyMain = keyMain.split(".");
                keyMain = keyMain.join();
                keyMain = keyMain.split("#");
                keyMain = keyMain.join();
                keyMain = keyMain.split("$");
                keyMain = keyMain.join();
                keyMain = keyMain.split("[");
                keyMain = keyMain.join();
                keyMain = keyMain.split("'");
                keyMain = keyMain.join();
                keyMain = keyMain.split("]");
                keyMain = keyMain.join();
                keyMain = keyMain.split("\"");
                keyMain = keyMain.join();
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
                }))
            })
        })
    }, [])

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
                                {item.source.id == null ? null : item.author == "" ? null : <View style={{ margin: fontCustomSize(10), marginBottom: 0, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: "Bold", color: 'black' }}>{item.source.name}</Text>
                                    <Observer>
                                        {
                                            () => (<TouchableOpacity
                                                onPress={() => {
                                                    if (NewsStore.followingPages.includes(item.source.id)) {
                                                        realm.write(() => {
                                                            realm.delete(realm.objects("Follow")[newsId[item.source.id]])
                                                        })
                                                        getRealmData()
                                                    } else {
                                                        realm.write(() => {
                                                            realm.create("Follow", {
                                                                name: item.source.name,
                                                                id: item.source.id
                                                            })
                                                        })
                                                        getRealmData()
                                                    }
                                                }}
                                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: fontCustomSize(10), backgroundColor: NewsStore.followingPages.includes(item.source.id) ? "#252525" : "#fff", borderColor: NewsStore.followingPages.includes(item.source.id) ? "#fff" : "#252525", borderWidth: 1, padding: fontCustomSize(4), paddingLeft: fontCustomSize(8), paddingRight: fontCustomSize(8), }}>
                                                {NewsStore.followingPages.includes(item.source.id) ? null : <AntIcons name="plus" color="#252525" style={{ marginRight: fontCustomSize(5) }} />}
                                                <Text style={{ fontFamily: "Regular", color: NewsStore.followingPages.includes(item.source.id) ? "#fff" : "#252525" }}>{NewsStore.followingPages.includes(item.source.id) ? "Following" : "Follow"}</Text>
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
                                            <AntIcons name="arrowsalt" size={fontCustomSize(16)} color="black" />
                                            <Text style={{ marginLeft: fontCustomSize(7), fontSize: fontCustomSize(14), fontFamily: "Bold" }}>Related</Text>
                                        </TouchableOpacity>
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
                                                Share.share({
                                                    title: "News",
                                                    message: item.title,
                                                    url: item.url
                                                })
                                            }}
                                            style={{ flexDirection: 'row', marginRight: fontCustomSize(10) }}>
                                            <FontIcons name="share" color="#252525" size={fontCustomSize(20)} style={{ marginRight: fontCustomSize(5) }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!NewsStore.bookmarkId.includes(item.title)) {
                                                    NewsStore.bookmarkId.push(item.title);
                                                    realm.write(() => {
                                                        realm.create("Bookmark", {
                                                            sourceName: item.source.name == null ? "" : item.source.name,
                                                            sourceId: item.author == null ? "" : item.author,
                                                            url: item.url,
                                                            title: item.title,
                                                            urlToImage: item.urlToImage == null ? "" : item.urlToImage,
                                                            description: item.description,
                                                            publishedAt: item.publishedAt
                                                        })
                                                    })
                                                    setBookMarkData();
                                                } else {

                                                }
                                            }}
                                            style={{ flexDirection: 'row' }}>
                                            <Observer>
                                                {
                                                    () => (
                                                        NewsStore.bookmarkId.includes(item.title) ? <FontIcons name="bookmark" color="#252525" size={fontCustomSize(20)} style={{ marginRight: fontCustomSize(5) }} /> : <FontIcons name="bookmark-o" color="#252525" size={fontCustomSize(20)} style={{ marginRight: fontCustomSize(5) }} />
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
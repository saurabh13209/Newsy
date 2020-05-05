import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import NewsStore from '../../Store/NewsStore';
import { fontCustomSize } from '../../Common/fontCustomSize';
import Axios from 'axios'
import FontIcons from 'react-native-vector-icons/FontAwesome';
import { Observer } from 'mobx-react';
import { setBookmarkData } from '../../Common/functions';

export default FollowingScreen = () => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentNews, setCurrent] = useState("");

    getNews = (id) => {
        setLoading(true);
        var tempData = [];
        var tempTitle = [];
        Axios.get("https://newsapi.org/v2/top-headlines?sources=" + id + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.articles.forEach((newsEach, index) => {
                if (!tempTitle.includes(newsEach.title)) {
                    tempData = [
                        ...tempData,
                        newsEach
                    ]
                    tempTitle = [
                        ...tempTitle,
                        newsEach.title
                    ]
                    tempTitle.push(newsEach.title)
                }
            })
            setLoading(false);
            setData(tempData)
        })
    }

    useEffect(() => {
        console.log("wea");
        if (NewsStore.followingNames.length > 0) {
            NewsStore.currentPage = NewsStore.followingNames[0].name
            getNews(NewsStore.followingNames[0].id);
        } else {
            setLoading(false)
        }
    }, [currentNews])

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Observer>
                {() => {
                    if (NewsStore.followingNames.length > 0) {
                        NewsStore.currentPage = NewsStore.followingNames[0].name
                        setCurrent(NewsStore.followingNames[0].name)
                    }
                    return (<View >
                        <FlatList
                            alwaysBounceHorizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingTop: fontCustomSize(5), paddingBottom: fontCustomSize(5) }}
                            horizontal={true}
                            data={NewsStore.followingNames}
                            renderItem={({ item }) => (NewsStore.currentPage == item.name ? <TouchableOpacity style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), backgroundColor: '#252525' }}>
                                <Text style={{ fontFamily: "Medium", color: "white", margin: fontCustomSize(5) }}>{item.name}</Text>
                            </TouchableOpacity> : <TouchableOpacity
                                onPress={() => {
                                    NewsStore.currentPage = NewsStore.followingNames[0].name
                                    getNews(item.id);
                                }}
                                style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), borderColor: '#252525', borderWidth: 1 }}>
                                    <Text style={{ fontFamily: "Medium", color: "#252525", margin: fontCustomSize(5) }}>{item.name}</Text>
                                </TouchableOpacity>)}
                            keyExtractor={(item) => (item + "")}
                        />
                    </View>)
                }}
            </Observer>

            {isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"} color="#252525" />
            </View> : data.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: "#252525", fontFamily: "Bold", fontSize: fontCustomSize(14) }}>No News</Text>
            </View> : <FlatList
                        style={{ flex: 1 }}
                        data={data}
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
                                ><Text style={{ padding: fontCustomSize(10), paddingTop: fontCustomSize(5), fontFamily: "Medium", color: 'black' }}>{item.author}</Text></TouchableOpacity>}
                                {item.urlToImage == "" ? null : <Image source={{ uri: item.urlToImage }} style={{ height: fontCustomSize(160), resizeMode: "cover" }} />}
                                <View style={{ flexDirection: 'column', padding: fontCustomSize(10) }}>
                                    <Text style={{ fontSize: fontCustomSize(14), fontFamily: "SemiBold" }}>{item.title}</Text>
                                    <Text style={{ fontSize: fontCustomSize(11), fontFamily: "Regular", marginTop: fontCustomSize(3) }}>{item.description}></Text>
                                </View>
                                <View style={{ marginLeft: fontCustomSize(10), flexDirection: 'row', marginRight: fontCustomSize(10), marginBottom: fontCustomSize(10), justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: "Regular", color: "#2c2d2d" }}>published At: {new Date(item.publishedAt).getHours()}:{new Date(item.publishedAt).getMinutes()}</Text>
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
                                                    NewsStore.bookmarkId.includes(item.title) ? <FontIcons name="bookmark" color="#252525" size={fontCustomSize(20)} style={{ marginRight: fontCustomSize(5) }} /> : <FontIcons name="bookmark-o" color="#252525" size={fontCustomSize(20)} style={{ marginRight: fontCustomSize(5) }} />
                                                )
                                            }
                                        </Observer>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>)}
                        keyExtractor={(item) => (item.title + "")} />}
        </View >
    );
}
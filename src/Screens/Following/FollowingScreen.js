import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import NewsStore from '../../Store/NewsStore';
import { fontCustomSize } from '../../Common/fontCustomSize';
import Axios from 'axios'
import FontIcons from 'react-native-vector-icons/FontAwesome';
import { Observer } from 'mobx-react';

export default FollowingScreen = () => {

    const [currentPage, setCurrentPage] = useState("")
    const [data, setData] = useState([]);

    getNews = (id) => {
        var tempData = [];
        var tempTitle = [];
        Axios.get("https://newsapi.org/v2/top-headlines?sources=" + id + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.articles.forEach((newsEach, index) => {
                if (!tempTitle.includes(newsEach.title)) {
                    tempData = [
                        ...tempData,
                        newsEach
                    ]
                    tempTitle.push(newsEach.title)
                }
            })
            setData(tempData)
        })
    }

    useEffect(() => {
        setCurrentPage(NewsStore.followingNames[0].name);
        getNews(NewsStore.followingNames[0].id);
    }, [NewsStore.followingNames])

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Observer>
                {() => (
                    <FlatList
                        alwaysBounceHorizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ paddingTop: fontCustomSize(5), paddingBottom: fontCustomSize(5) }}
                        horizontal={true}
                        data={NewsStore.followingNames}
                        renderItem={({ item }) => (currentPage == item.name ? <TouchableOpacity style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), backgroundColor: '#252525' }}>
                            <Text style={{ fontFamily: "Medium", color: "white", margin: fontCustomSize(5) }}>{item.name}</Text>
                        </TouchableOpacity> : <TouchableOpacity
                            onPress={() => {
                                setCurrentPage(item.name);
                                getNews(item.id);
                            }}
                            style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), borderColor: '#252525', borderWidth: 1 }}>
                                <Text style={{ fontFamily: "Medium", color: "#252525", margin: fontCustomSize(5) }}>{item.name}</Text>
                            </TouchableOpacity>)}
                        keyExtractor={(item) => (item + "")}
                    />
                )}
            </Observer>

            <FlatList
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
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <FontIcons name="bookmark-o" color="#252525" size={fontCustomSize(20)} style={{ marginRight: fontCustomSize(5) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>)}
                keyExtractor={(item) => (item.title + "")} />
        </View >
    );
}
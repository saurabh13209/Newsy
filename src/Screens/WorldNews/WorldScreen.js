import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Axios from 'axios';
import { fontCustomSize } from '../../Common/fontCustomSize';
import database from '@react-native-firebase/database';
import { Observer } from 'mobx-react';
import NewsStore from '../../Store/NewsStore';
import AntIcons from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/Octicons'

export default WorldScreen = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState("business")
    const themes = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

    getNews = (country, category) => {
        var temp = [];
        Axios.get("https://newsapi.org/v2/sources?country=" + country + "&category=" + category + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.sources.forEach(dataMain => {
                temp = [
                    ...temp,
                    dataMain
                ]
            })
            setData(temp);
        })
    }
    useEffect(() => {
        getNews("us", "general")
    }, [])
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View >
                <FlatList
                    alwaysBounceHorizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingTop: fontCustomSize(5), paddingBottom: fontCustomSize(5) }}
                    horizontal={true}
                    data={themes}
                    renderItem={({ item }) => (currentPage == item ? <TouchableOpacity style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), backgroundColor: '#252525' }}>
                        <Text style={{ fontFamily: "Medium", color: "white", margin: fontCustomSize(5) }}>{item}</Text>
                    </TouchableOpacity> : <TouchableOpacity
                        onPress={() => {
                            setCurrentPage(item);
                            getNews("us", item)
                        }}
                        style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), borderColor: '#252525', borderWidth: 1 }}>
                            <Text style={{ fontFamily: "Medium", color: "#252525", margin: fontCustomSize(5) }}>{item}</Text>
                        </TouchableOpacity>)}
                    keyExtractor={(item) => (item + "")}
                />
            </View>

            <Observer>
                {
                    () => (
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={data}
                                renderItem={({ item, index }) => (<TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(item.url)
                                    }}
                                >
                                    <View style={{ flexDirection: 'column', margin: 10, elevation: fontCustomSize(5), backgroundColor: 'white', borderRadius: fontCustomSize(5) }}>
                                        {item.name == null ? null : item.name == "" ? null : <TouchableOpacity
                                            onPress={() => {
                                                console.log("Open Page post");
                                            }}
                                        ><Text style={{ padding: fontCustomSize(10), paddingBottom: 0, fontFamily: "Bold", color: 'black' }}>{item.name}</Text></TouchableOpacity>}
                                        <Text style={{ fontSize: fontCustomSize(14), fontFamily: "Medium", color: "#777", margin: fontCustomSize(10), marginTop: fontCustomSize(5) }}>{item.description}></Text>
                                    </View>
                                </TouchableOpacity>)}
                                keyExtractor={(item) => (item.description + "")} />
                            <TouchableOpacity
                                style={{ backgroundColor: '#252525', elevation: 30, justifyContent: "center", alignItems: 'center', height: fontCustomSize(50), width: fontCustomSize(50), position: "absolute", zIndex: 2, bottom: fontCustomSize(30), borderRadius: fontCustomSize(50), right: fontCustomSize(30) }}
                                onPress={() => {

                                }}
                            >
                                <MatIcon name="globe" color="white" size={fontCustomSize(30)} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </Observer>

        </View >
    );
}
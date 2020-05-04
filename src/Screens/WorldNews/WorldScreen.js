import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios';
import { fontCustomSize } from '../../Common/fontCustomSize';
import { Observer } from 'mobx-react';
import MatIcon from 'react-native-vector-icons/FontAwesome'
import { Dialog } from 'react-native-simple-dialogs';
import { ScrollView } from 'react-native-gesture-handler';


export default WorldScreen = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState("general")
    const [currentCountry, setCountry] = useState("ae");
    const themes = ["general", "technology", "science", "business", "entertainment", "health", "sports"]
    const [showDialog, setDialog] = useState(false);

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
        getNews(currentCountry, "general")
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
                            getNews(currentCountry, item)
                        }}
                        style={{ margin: fontCustomSize(5), paddingRight: fontCustomSize(5), paddingLeft: fontCustomSize(5), borderRadius: fontCustomSize(10), borderColor: '#252525', borderWidth: 1 }}>
                            <Text style={{ fontFamily: "Medium", color: "#252525", margin: fontCustomSize(5) }}>{item}</Text>
                        </TouchableOpacity>)}
                    keyExtractor={(item) => (item + "")}
                />
            </View>

            <Dialog
                visible={showDialog}
                title="Choose Country"
                backgroundColor={"#000"}
                onTouchOutside={() => setDialog(false)} >
                <ScrollView style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("ae");
                                getNews(currentCountry, currentPage);
                            }}
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/ae.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>United Arab Emirates</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("ar");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/ar.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>Argentina</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: fontCustomSize(20) }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("at");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/at.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>Austria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("au");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/au.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>Australia</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: fontCustomSize(20) }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("ca");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/ca.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>Canada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("gb");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/gb.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>United Kingdom</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: fontCustomSize(20) }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("in");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/in.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>India</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDialog(false);
                                setCountry("us");
                                getNews(currentCountry, currentPage);
                            }} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/us.png")} style={{ height: fontCustomSize(60), width: fontCustomSize(60) }} />
                            <Text style={{ marginTop: fontCustomSize(5) }}>United States</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Dialog>

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
                                style={{ backgroundColor: '#252525', elevation: 5, justifyContent: "center", alignItems: 'center', height: fontCustomSize(50), width: fontCustomSize(50), position: "absolute", zIndex: 2, bottom: fontCustomSize(30), borderRadius: fontCustomSize(50), right: fontCustomSize(30) }}
                                onPress={() => {
                                    setDialog(true);
                                }}
                            >
                                <MatIcon name="wpexplorer" color="white" size={fontCustomSize(30)} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </Observer>

        </View >
    );
}
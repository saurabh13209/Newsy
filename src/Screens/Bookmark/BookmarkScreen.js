import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { fontCustomSize } from '../../Common/fontCustomSize';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import NewsStore from '../../Store/NewsStore';
import { Observer } from 'mobx-react';

export default BookmarkScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Observer>
                {
                    () => (
                        <FlatList
                            data={NewsStore.bookmarkData}
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
                            keyExtractor={(item) => (item.title + "")} />

                    )
                }
            </Observer>
        </View>
    );
}
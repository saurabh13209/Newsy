import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Axios from 'axios';

export default MemesScreen = (props) => {
    useEffect(() => {
        Axios.get("http://newsapi.org/v2/everything?q=" + props.route.params.query + "&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
            res.data.articles.forEach(data => {
                console.log(data.title);
            })
        })
    }, [])
    return (
        <View>
            <Text>
                Kickme
            </Text>
        </View>
    );
}
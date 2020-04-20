import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ProfileScreen = () => {

    const [data, setData] = useState("null");

    AuthGoogle = async () => {
        setData("Loading");
        GoogleSignin.hasPlayServices().then(() => {

        }).catch((err) => {
            console.log("Play service error");
        })
        GoogleSignin.configure({
            webClientId: '797580310063-bqj2dtv86in6imjoj9hdddgaiervpgmv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
        try {
            const { accessToken, idToken } = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            await firebase.auth().signInWithCredential(credential).then(async () => {
                const currentUser = await GoogleSignin.getCurrentUser();
                setData(currentUser + "");
            }).catch(err => {
                console.log(err);
                setData(err + "");
            })
        } catch (e) {
            setData(e + "");
        }
    }


    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    AuthGoogle();
                }}
            >
                <Text>
                    Login
                </Text>
            </TouchableOpacity>

            <Text>{data}</Text>
        </View>
    );
}
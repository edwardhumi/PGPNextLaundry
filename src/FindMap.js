import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { firebase } from '../config';
import backgroundImage from '../images/rm222-mind-14.jpg'

const FindMap = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchUserData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [isFocused]);

    const fetchUserData = () => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase
                .firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setName(snapshot.data());
                    } else {
                        console.log('User does not exist');
                    }
                });
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container} >
                <View style={styles.centerContent}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.name}>Find Your Nearest Laundry Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../images/maplink.png')} style={styles.map} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default FindMap;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topArea: {
        backgroundColor: 'rgba(160, 202, 240, 0.8)',
        paddingTop: 50,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    header: {
        marginLeft: 15,
    },
    location: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        position: 'absolute',
        top: 130
    },
    profileButton: {
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 25,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 700,
        height: 700,
    },
    map: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    button: {
        flexDirection: 'row',
        marginTop: 20,
        height: 50,
        width: 300,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',
        top: 110
      },
      name: {
        fontSize: 18, 
        color: 'black',
      },
},
);
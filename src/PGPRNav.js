import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from 'react';
import { useNavigation} from '@react-navigation/native';
import backgroundImage from '../images/rm222-mind-14.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PGPRNav = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Image source={require('../images/back.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate('R1')} style={styles.button}>
                        <Text style={styles.name}>Residence 1{'\n'}(Block 1-4)</Text>
                        <Ionicons name='ios-home' size={60} color={'black'} style= {styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('R2')} style={styles.button}>
                        <Text style={styles.name}>Residence 2{'\n'}(Block 5-8)</Text>
                        <Ionicons name='ios-home' size={60} color={'black'} style= {styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('R3')} style={styles.button}>
                        <Text style={styles.name}>Residence 3{'\n'}(Block 9-12)</Text>
                        <Ionicons name='ios-home' size={60} color={'black'} style= {styles.icon}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default PGPRNav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    topArea: {
        backgroundColor: '#A0CAF0',
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
        fontSize: 20,
        fontWeight: 'bold'
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
    button: {
        flexDirection: 'row',
        marginTop: 20,
        height: 110,
        width: 300,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 20,
        borderColor: 'black',
    },
    name: {
        fontSize: 20,
        color: 'black',
    },
    pgpr: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginRight: 15,
    },
    pioneer: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginRight: 25,
    },
    light: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
        marginRight: 15,
    },
    helix: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginRight: 8,
    },
    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        padding: 50,
        marginLeft: -20,
    },
    backButton: {
        backgroundColor: '#EFEFEF',
        borderRadius: 30,
        padding: 15,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    backButtonImage: {
        width: '100%',
        height: '100%',
    },
    icon: {
        marginRight:40
    }
});
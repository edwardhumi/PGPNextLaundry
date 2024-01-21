import React, { useState, useRef, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text, SafeAreaView, StyleSheet, View, Dimensions, Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: 1.2909,
    longitude: 103.7811,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const R1_POSITION = {
    latitude: 1.29145,
    longitude: 103.78275,
}

const R2_POSITION = {
    latitude: 1.29103,
    longitude: 103.78177,
}

const R3_POSITION = {
    latitude: 1.29123,
    longitude: 103.78038,
}
const HH_POSITION = {
    latitude: 1.29125,
    longitude: 103.77999,
}
const PH_POSITION = {
    latitude: 1.29040,
    longitude: 103.78060,
}
const LH_POSITION = {
    latitude: 1.29062,
    longitude: 103.78185,
}

export default function Maps() {
    const navigation = useNavigation();
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [showDirections, setShowDirections] = useState(false)
    const [distance, setDistance] = useState(0)
    const [duration, setDuration] = useState(0)
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [nearest, setNearest] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setOrigin(location.coords)
        })();
    }, []);

    useEffect(() => {
        if (origin) {
            moveTo(origin);
        }
    }, [origin]);

    useEffect(() => {
        if (destination) {
            moveTo(destination);
        }
    }, [destination]);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const moveTo = (position) => {
        mapRef.current?.animateToRegion({
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
    };

    const traceRouteOnReady = (args) => {
        if (args) {
            setDistance(args.distance)
            setDuration(args.duration)
        }
    }
    const handlePress = (position) => {
        setDestination(position)
        setShowDirections(true)
    }
    const cancelRoute = () => {
        setShowDirections(false);
        setDistance(0);
        setDuration(0);
        setNearest(null)
    };

    const pickDestination = (i) => {
      if (i == 0) {
        return R1_POSITION
      } 
      if (i == 1) {
        return R2_POSITION
      }
      if (i == 2) {
        return R3_POSITION
      }
      if (i == 3) {
        return HH_POSITION
      }
      if (i == 4) {
        return PH_POSITION
      }
      if (i == 5) {
        return LH_POSITION
      }
    }
    
    const nearestLaundry = (i) => {
        if (i == 0) {
            return "Residence 1"
          } 
          if (i == 1) {
            return "Residence 2"
          }
          if (i == 2) {
            return "Residence 3"
          }
          if (i == 3) {
            return "Helix House"
          }
          if (i == 4) {
            return "Pioneer House"
          }
          if (i == 5) {
            return "Light House"
          }
    }
    //Algorithm to find the nearest laundry room with regards to current location
    const pickNearest = () => {
      let dist = [];
      for (let i = 0; i < 6; i++) {
        let dest = pickDestination(i)
        //Collects all the distance
        dist[i] = Math.sqrt((origin.latitude - dest.latitude)**2 + (origin.longitude - dest.longitude)**2)
      }
      let min_dist = dist[0]
      let min_index = 0
      for (let i = 1; i < 6; i++) {
        console.log(dist[i])
        //Proceed to find the minimum distance
        if (dist[i] < min_dist) {
          min_dist = dist[i]
          min_index = i
        }
      }
      setDestination(pickDestination(min_index))
      setShowDirections(true)
      setNearest(nearestLaundry(min_index))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Image source={require('../images/back.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
            </View>
            <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
                {origin && <Marker coordinate={origin} title="Origin" />}
                {destination && <Marker coordinate={destination} title="Destination" />}
                {showDirections && origin && destination && <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey = 'NULL' //moved to .env
                    strokeColor="#6644ff"
                    strokeWidth={4}
                    onReady={traceRouteOnReady}
                />}
                <Marker coordinate={R3_POSITION} title="Residence 3" pinColor="cyan" onPress={() => handlePress(R3_POSITION)} />
                <Marker coordinate={R2_POSITION} title="Residence 2" pinColor="violet" onPress={() => handlePress(R2_POSITION)} />
                <Marker coordinate={R1_POSITION} title="Residence 1" pinColor="#99C68E" onPress={() => handlePress(R1_POSITION)} />
                <Marker coordinate={LH_POSITION} title="Light House" pinColor="orange" onPress={() => handlePress(LH_POSITION)} />
                <Marker coordinate={HH_POSITION} title="Helix House" pinColor="yellow" onPress={() => handlePress(HH_POSITION)} />
                <Marker coordinate={PH_POSITION} title="Pioneer House" pinColor="blue" onPress={() => handlePress(PH_POSITION)} />
            </MapView>
            <View style={styles.searchContainer}>
            {nearest === null ? (
                        <TouchableOpacity style={styles.button} onPress={pickNearest}>
                            <Text style={styles.buttonText}>Pick your nearest laundry room</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={pickNearest}>
                            <Text style={styles.buttonText}>Nearest Laundry Room:  
                                <Text style={styles.laundryText}> {nearest}</Text>
                            </Text>
                           
                        </TouchableOpacity>
                    )}
            </View>
            {distance && duration ? (
                <View style={styles.distanceDurationContainer}>
                    <Text>Distance: {distance.toFixed(3) * 1000} m</Text>
                    <Text>Duration: {Math.ceil(duration)} min</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={cancelRoute}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    searchContainer: {
        position: 'absolute',
        bottom: 40, 
        alignSelf: 'center', 
        width: '90%',
        backgroundColor: '#364D62',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
    },
    input: {
        borderColor: '#888',
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#D5E4F1",
        paddingVertical: 12,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
    },
    distanceDurationContainer: {
        position: 'absolute',
        bottom: 120, 
        alignSelf: 'center', 
        backgroundColor: '#fffee0',
        padding: 8,
        borderRadius: 8,
        elevation: 4,
        right: 25
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 8,
        marginTop: 8,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1, 
    },
    backButton: {
        backgroundColor: '#A0CAF0',
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
    laundryText: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
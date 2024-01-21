import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, SafeAreaView, TextInput, Button, Text, View, StyleSheet, Alert, Image } from 'react-native';
import { firebase, db } from '../../config'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ref, set, onValue } from 'firebase/database'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import storage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from 'react-native-gesture-handler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

function Laundry(props) {
  // State for modifying timer
  const [currentTime, setCurrentTime] = useState("00:00");
  const [startTime, setStartTime] = useState({ hours: 0, minutes: 0, seconds: 0, person: 0 });
  const [usable, setUsable] = useState(true)
  // State for queue system
  const [queueList, setQueueList] = useState([]);
  const [currentPerson, setCurrentPerson] = useState(null)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // State for notification
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // State for QR system
  const [scanned, setScanned] = useState(false)
  // State for navigation system
  const isFocused = useIsFocused();
  const navigation = useNavigation();


  // Fetch user's data from authentication database
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
            const userData = snapshot.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
          } else {
            console.log('User does not exist');
          }
        });
    }
  };


  /* NOTIFICATION SYSTEM */
  useEffect(() => {
    // Get permission for notification
    const getPermission = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Notifications Disabled', 'Please enable push notifications!');
          await storage.setItem('expopushtoken', "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);

      // Notification format for Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
    getPermission();

    // Set up listener for notification
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => { });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Set a scheduled notification 25 minutes after the machine is confirmed
  const onClick = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "PGPNextLaundry",
        body: "Your Fresh Clothes Will Be Ready In 5 Minutes",
        data: { data: "data goes here" }
      },
      trigger: {
        seconds: 25 * 60, //25 Minutes
      }
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "PGPNextLaundry",
        body: "Your Clothes Are Ready to Be Pick Up",
        data: { data: "data goes here" }
      },
      trigger: {
        seconds: 30 * 60, //25 Minutes
      }
    });
  }


  /**** TIMER SYSTEM ****/
  // Fetch data from timer database when the page loads
  useEffect(() => {
    const timerRef = ref(db, `timers/${props.block}/${props.machine}`)
    onValue(timerRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const { hours, minutes, seconds, person } = data;
        setStartTime({ hours, minutes, seconds });
        setCurrentPerson(person)
      }
    })
  }, [])

  // Refresh the timer every second whenever startTime is triggered
  useEffect(() => {
    let intervalId;
    if (startTime.hours !== 0 || startTime.minutes !== 0 || startTime.seconds !== 0) {
      intervalId = setInterval(viewTimer, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  // Set the stopping time to be 30 minutes after the timer is started
  function startTimer() {
    const time = new Date();
    let h = time.getHours();
    let m = time.getMinutes() + 30;
    let s = time.getSeconds();
    if (m >= 60) {
      m -= 60;
      h += 1;
    }

    set(ref(db, `timers/${props.block}/${props.machine}`), {
      hours: h,
      minutes: m,
      seconds: s,
      person: firstName + ' ' + lastName,
    })
    setCurrentTime("30:00");
    setStartTime({ hours: h, minutes: m, seconds: s, person: 1 });
  }

  // Refresh the timer by calculating the time difference between the stopping time in database and the current time
  function viewTimer() {
    const time = new Date();
    let h = startTime.hours - time.getHours();
    let m = startTime.minutes - time.getMinutes();
    let s = startTime.seconds - time.getSeconds();

    if (s < 0) {
      s += 60;
      m -= 1;
    }
    if (m < 0) {
      m += 60;
      h -= 1;
    }
    //When the time runs out
    if (h < 0 || (m <= 0 && s <= 0) || startTime.person == 0) {
      setStartTime({ hours: 0, minutes: 0, seconds: 0, person: 0 });
      setCurrentPerson(null)
      setCurrentTime("00:00");
      setUsable(true)
      set(ref(db, `timers/${props.block}/${props.machine}`), {
        //Set the timer inside the database to null
      })
      set(ref(db, `scan/${props.block}/${props.machine}`), {
         //Set the scan status inside the database to null
      })
    } else {
      setCurrentTime(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
      setUsable(false)


    }
  }


  /**** QUEUE SYSTEM ****/
  // Fetch data from queue database when the page loads
  useEffect(() => {
    const queueRef = ref(db, `queue/${props.block}/${props.machine}`)
    onValue(queueRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setQueueList(data)
      }
    })
  }, [])

  // Scanned status
  useEffect(() => {
    const scanRef = ref(db, `scan/${props.block}/${props.machine}`)
    onValue(scanRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setScanned(data.scanned)
      }
    })
  }, [])

  // Book system
  const Book = () => {
    const newPerson = firstName + ' ' + lastName

    if (queueList.includes(newPerson)) {
      alert('You have already booked.');
      return;
    }

    let copiedq = [...queueList]
    copiedq.push(newPerson)
    set(ref(db, `queue/${props.block}/${props.machine}`), copiedq);
  }

  // Cancel Booking
  const Cancel = () => {
    const newPerson = firstName + ' ' + lastName

    if (!queueList.includes(newPerson)) {
      alert("You haven't book any machine");
      return;
    } else {
      let copiedq = [...queueList]
      copiedq.splice(copiedq.findIndex(a => a == newPerson), 1)
      set(ref(db, `queue/${props.block}/${props.machine}`), copiedq);
      setQueueList(copiedq)
      set(ref(db, `scan/${props.block}/${props.machine}`), {
        scanned: false
      })
    }
  }

  // Confirm using QR
  const Confirm = () => {
    if (usable && queueList[0] == firstName + ' ' + lastName && scanned) {
      if (queueList.length === 1) {
        set(ref(db, `queue/${props.block}/${props.machine}`), [])
          .then(() => {
            setCurrentPerson(queueList[0]);
            setQueueList([]);
          })
          .catch((error) => {
            console.log('Error clearing queue in the database:', error);
          });
      } else {
        const copiedq = [...queueList];
        const confirmedPerson = copiedq.shift();

        set(ref(db, `queue/${props.block}/${props.machine}`), copiedq)
          .then(() => {
            setCurrentPerson(confirmedPerson);
            setQueueList(copiedq);
          })
          .catch((error) => {
            console.log('Error updating queue in the database:', error);
          });
      }
      set(ref(db, `scan/${props.block}/${props.machine}`), {
        scanned: false
      })
      startTimer();
      onClick();
    }
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#A0CAF0', }]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {usable && <Image source={require('../../images/laundry_empty.png')} style={styles.laundryEmpty}></Image>}
        {!usable && <Image source={require('../../images/laundry_used.png')} style={styles.laundryUsed}></Image>}

        <View style={styles.outer}>
          <View style={styles.timer}>
            <Text style={styles.paragraph}>{currentTime}</Text>
          </View>
          <View style={styles.queue}>
            <View style= {styles.center}>
              {currentPerson ? (
                <Text style={styles.boldText}>Current person: <Text style={{ color: '#ff4d00' }}>{currentPerson}</Text></Text>
              ) : queueList.length > 0 ? (
                <Text style={styles.boldText}> <Text style={{ color: '#ff4d00' }}>{queueList[0]}</Text> is confirming </Text>
              ) : (
                <Text style={{ color: '#014421', fontWeight: 'bold', marginBottom: 5 }}>{props.machine} is usable</Text>
              )}
            </View>
            <Text style={{ fontWeight: 'bold' }}>Queue List:</Text>
            {queueList.map((person, index) => (
              <Text key={index}>{person}</Text>
            ))}

            {!queueList.includes(firstName + ' ' + lastName) && 
              <TouchableOpacity style = {styles.bookButton} onPress={Book}> 
                <Text style = {styles.insideText}>BOOK</Text>
              </TouchableOpacity>}
            {queueList.length > 0 && queueList[0] == firstName + ' ' + lastName && usable && scanned &&
              <TouchableOpacity style = {styles.confirmButton2} onPress={Confirm}> 
                <Text style = {styles.insideText}>CONFIRM</Text>
              </TouchableOpacity>}
            {!scanned && queueList[0] == firstName + ' ' + lastName && usable &&
             <TouchableOpacity style = {styles.confirmButton1} onPress={() => navigation.navigate('QRTest')}> 
                <Text style = {styles.insideText}>CONFIRM</Text>
              </TouchableOpacity>}
            {queueList.includes(firstName + ' ' + lastName) &&
             <TouchableOpacity style = {styles.cancelButton} onPress={Cancel}> 
                <Text style = {styles.insideText}>CANCEL</Text>
              </TouchableOpacity>}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Laundry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outer: {
    flex: 1,
    marginRight: 10
  },
  timer: {
    height: 50,
    backgroundColor: 'black',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: -5
  },
  queue: {
    margin: 10,
    justifyContent: 'center',
  },
  paragraph: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  boldText: {
    marginBottom: 5,
    fontWeight: 'bold'
  },
  laundryEmpty: {
    alignItems: 'center',
    width: 200,
    height: 200,
    marginRight: -20,
    marginLeft: -10,

  },
  laundryUsed: {
    alignItems: 'center',
    width: 200,
    height: 200,
    marginRight: -20,
    marginLeft: -10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
    borderRadius:10,
    alignItems: 'center',

  },
  bookButton: {
    backgroundColor:"#1775BB",
    width: '97%',
    height: 40,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderWidth: 1
  },
  cancelButton: {
    backgroundColor:"#d61f2c",
    width: '95%',
    height: 40,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderWidth: 1
  },
  confirmButton1: {
    backgroundColor:"#FFAE42",
    width: '95%',
    height: 40,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderWidth: 1
  },
  confirmButton2: {
    backgroundColor:"#2E8B57",
    width: '95%',
    height: 40,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderWidth: 1
  },
  insideText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
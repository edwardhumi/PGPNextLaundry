import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { db } from '../config'
import { ref, set, onValue } from 'firebase/database'

function Laundry(props) {
    const [currentTime, setCurrentTime] = useState("00:00");
    const [startTime, setStartTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [usable, setUsable] = useState(true)
    const [queueList, setQueueList] = useState([]);
    const [currentPerson, setCurrentPerson] = useState(null)
    const [name, setName] = useState('');

    // Fetch data from timer database
    useEffect(() => {
        const starCountRef = ref(db, `timers/${props.block}/${props.machine}`)
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const { hours, minutes, seconds } = data;
                setStartTime({ hours, minutes, seconds });
            }
        })
    }, [])

    // Fetch data from queue database
    useEffect(() => {
        const starCountRef = ref(db, `queue/${props.block}/${props.machine}`)
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setQueueList(data)
            }
        })
    }, [])

    // Refresh timer every second
    useEffect(() => {
        let intervalId;

        if (startTime.hours !== 0 || startTime.minutes !== 0 || startTime.seconds !== 0) {
            intervalId = setInterval(viewTimer, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [startTime]);

    // **** TIMER SYSTEM *****
    function startTimer() {
        const time = new Date();

        let h = time.getHours();
        let m = time.getMinutes() + 1;
        let s = time.getSeconds();
        if (m >= 60) {
            m -= 60;
            h += 1;
        }

        set(ref(db, `timers/${props.block}/${props.machine}`), {
            hours: h,
            minutes: m,
            seconds: s,
        })

        setCurrentTime("30:00");
        setStartTime({ hours: h, minutes: m, seconds: s });
    }

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
        if (h < 0 || (m <= 0 && s <= 0)) {
            setStartTime({ hours: 0, minutes: 0, seconds: 0 });
            setCurrentPerson(null)
            setCurrentTime("00:00");
            setUsable(true)
        } else {
            setCurrentTime(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
            setUsable(false)
        }
    }

    // **** QUEUE SYSTEM ****/
    const Book = () => {
        const newPerson = {
            name,
        };
        let copiedq = [...queueList]
        copiedq.push(newPerson)
        setName('')
        set(ref(db, `queue/${props.block}/${props.machine}`), copiedq);
    }

    const Confirm = () => {
        if (usable) {
            if (queueList.length == 1) {
                setQueueList([])
                setCurrentPerson(queueList[0])
                set(ref(db, `queue/${props.block}/${props.machine}`), queueList)
            } else {
                let copiedq = [...queueList]
                setCurrentPerson(copiedq.shift())
                set(ref(db, `queue/${props.block}/${props.machine}`), copiedq)
            }
        }
        startTimer()
    }

    return (
        <ScrollView style={[styles.box, { backgroundColor: !usable ? props.color : 'white' }]} justifyContent='center'>
            <View style={styles.timer}>
                <Text style={styles.paragraph}>{currentTime}</Text>
            </View>
            {/* <Button title="Start" onPress={startTimer} /> */}
            <View style={styles.queue}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {currentPerson ? (
                    <Text>Current person: {currentPerson.name}</Text>
                ) : (
                    <Text>Queue is empty</Text>
                )}

                <Text>Queue List:</Text>
                {queueList.map((person, index) => (
                    <Text key={index}>{person.name}</Text>
                ))}

                <Button title="Book" onPress={Book} />
                <Button title="Confirm" onPress={Confirm} />
            </View>
        </ScrollView>
    );
}
export default Laundry;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        height: 300,
        backgroundColor: 'black',
        margin: 10,
        //justifyContent: 'center'
    },
    timer: {
        flex: 1,
        height: 90,
        backgroundColor: 'black',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    queue: {
        margin: 10,
        height: 100,
        justifyContent: 'center',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        color: 'white',
        margin: 24,
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 100,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
});
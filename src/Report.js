import { ScrollView, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import { db } from '../config'
import { ref, set, push, onValue } from 'firebase/database'
import backgroundImage from '../images/rm222-mind-14.jpg'

const AddData = () => {
    const [block, setBlock] = useState('')
    const [machine, setMachine] = useState('')
    const [maintenanceRequest, setMaintenanceRequest] = useState('')
    const [showProblems, setShowProblems] = useState(false);
    const [todoData, setTodoData] = useState([]);
    const toggleProblems = () => {
        setShowProblems(!showProblems);
    };

    const dataAddOn = () => {
        if (!block || !machine || !maintenanceRequest) {
            Alert.alert('Missing Field', 'Please fill in all the fields.');
        }
        else {
            const newPostRef = push(ref(db, 'posts'));
            const postId = newPostRef.key;

            set(newPostRef, {
                id: postId,
                block: block,
                machine: machine,
                maintenanceRequest: maintenanceRequest,
            });

            setBlock('');
            setMachine('');
            setMaintenanceRequest('');
        }
    }

    useEffect(() => {
        const starCountRef = ref(db, 'posts/')
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const newPosts = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }))
                setTodoData(newPosts)
            }
        })
    }, [])
    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <ScrollView style={styles.container} contentContainerStyle={showProblems ? styles.contentContainerTop : styles.contentContainerCenter}>
                {!showProblems && (
                    <>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Report a Problem</Text>
                        </View>

                        <TextInput
                            placeholder='Block (R1, R2, R3, PH, LH, HH)'
                            value={block}
                            onChangeText={(text) => setBlock(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Machine Code (W1, W2, D1, D2)'
                            value={machine}
                            onChangeText={(text) => setMachine(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Maintenance Request'
                            value={maintenanceRequest}
                            onChangeText={(text) => setMaintenanceRequest(text)}
                            style={styles.input}
                        />

                        <View style={[styles.buttonContainer, { alignSelf: 'center' }]}>
                            <TouchableOpacity onPress={dataAddOn} style={styles.button}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.outerText}>———— or ————</Text>
                    </>
                )}
                <TouchableOpacity onPress={toggleProblems} style={[styles.showButton, showProblems ? styles.hideButton : styles.showButton]}>
                    <Text style={styles.showButtonText}>
                        {showProblems ? 'Hide' : 'Show Ongoing Problems'}
                    </Text>
                </TouchableOpacity>

                {showProblems && (
                    <>
                        <View style={styles.titleContainer2}>
                            <Text style={styles.titleText}>Ongoing Problems</Text>
                        </View>
                        {todoData &&
                            todoData.map((item, index) => {
                                return (
                                    <View key={index} style={styles.box}>
                                        <Text style={styles.text}>Block: {item.block}</Text>
                                        <Text style={styles.text}>Machine: {item.machine}</Text>
                                        <Text style={styles.text}>Maintenance Request: {item.maintenanceRequest}</Text>
                                    </View>
                                );
                            })}
                    </>
                )}
            </ScrollView>
        </ImageBackground>
    );
};
export default AddData
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        marginTop: -10
    },
    contentContainerTop: {
        justifyContent: 'flex-start',
    },
    contentContainerCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    box: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth:1
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        width: 300,
        borderWidth:1
    },
    text: {
        fontSize: 12,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
    },
    insert: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1775BB',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth:1,
        borderColor: 'white'
    },
    buttonContainer: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    showButton: {
        backgroundColor: '#00d5fc',
        width: 300,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },

    hideButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginLeft: 45,
        marginTop: 60,
    },
    showButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        width: 300,
        backgroundColor: '#9c141d',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        marginBottom: 20
    },
    titleText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'normal'
    },
    outerText: {
        color: 'grey',
        fontWeight: '300',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 7
    },
    titleContainer2: {
        width: 300,
        backgroundColor: '#9c141d',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 45,
    }
});
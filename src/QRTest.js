import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase, db } from '../config'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ref, set, onValue } from 'firebase/database'

const QRTest = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const [confirmed, setConfirmed] = useState(null);
    const navigation = useNavigation();

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.getPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        // console.log('Type: ' + type + '\nData: ' + data)

        if (data === 'ConfirmationQRCODER1W1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R1/W1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER1W2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R1/W2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER1W3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R1/W3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER1D1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R1/D1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER1D2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R1/D2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER1D3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R1/D3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER2W1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R2/W1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER2W2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R2/W2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER2W3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R2/W3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER2D1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R2/D1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER2D2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R2/D2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER2D3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R2/D3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER3W1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R3/W1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER3W2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R3/W2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER3W3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R3/W3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER3D1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R3/D1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER3D2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R3/D2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODER3D3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/R3/D3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEPHW1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/PH/W1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEPHW2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/PH/W2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEPHW3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/PH/W3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEPHD1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/PH/D1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEPHD2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/PH/D2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEPHD3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/PH/D3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODELHW1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/LH/W1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODELHW2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/LH/W2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODELHW3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/LH/W3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODELHD1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/LH/D1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODELHD2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/LH/D2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODELHD3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/LH/D3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEHHW1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/HH/W1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEHHW2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/HH/W2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEHHW3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/HH/W3`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEHHD1') {
            setConfirmed('confirmed');
            set(ref(db, `scan/HH/D1`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEHHD2') {
            setConfirmed('confirmed');
            set(ref(db, `scan/HH/D2`), {
                scanned: true
            })
        }
        else if (data === 'ConfirmationQRCODEHHD3') {
            setConfirmed('confirmed');
            set(ref(db, `scan/HH/D3`), {
                scanned: true
            })
        }
        else {
            setConfirmed('InvalidQR');
        }
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Image source={require('../images/back.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}></Text>
            {confirmed === 'confirmed' && <Text style={{ color: 'green', fontSize: 18, marginBottom: 10 }}>Confirmed</Text>}
            {confirmed === 'InvalidQR' && <Text style={{ color: 'red', fontSize: 18,marginBottom: 10 }}>Invalid QR</Text>}
            {scanned && confirmed === 'confirmed' && <Button title={'Go Back'} onPress={() => {
                setScanned(false);
                setText('Not yet scanned');
                setConfirmed(null);
                navigation.goBack();
            }} color='#2E8B57' />}
            {scanned && confirmed === 'InvalidQR' && <Button title={'Try Again'} onPress={() => {
                setScanned(false);
                setText('Not yet scanned');
                setConfirmed(null);
            }} color='tomato' />}
        </View>
    );
}
export default QRTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A0CAF0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
        borderWidth: 3
        
    },
    backButtonContainer: {
        position: 'absolute', 
        top: 50, 
        left: 25, 
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
});
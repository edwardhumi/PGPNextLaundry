import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style = {styles.container}>
      <Text style = {{fontWeight: 'bold', fontSize:28}}>PGPNextLaundry</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
});
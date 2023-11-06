import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const MyImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('./assets/3665896.png')}
        style={styles.imageSize}
      />
    </View>
  );
};

export default function SplashScreen({navigation}){
  
  const timer = setTimeout(()=>{
    navigation.navigate('Information1');
  },3000)

  useEffect(()=>{
    return () => {
      clearTimeout(timer);
    };
  },[])
  
  return(
    <SafeAreaView>
     <MyImage/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  imageSize: {
    width: 150,
    height: 150,
    resizeMode: 'contain', 
    position:'absolute',
    top:250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
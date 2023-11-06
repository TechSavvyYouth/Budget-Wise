import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View,Image } from 'react-native';

//information3-image
const MyImage = () => {
  return (
    <View style={styles.imageContainer2}>
      <Image
        source={require('./assets/3665896.png')}
        style={styles.imageSize2}
      />
    </View>
  );
};

//information-2
 export default function InformationScreen2({navigation}){
   
    const timer = setTimeout(() => {
      navigation.navigate('Information3');
    }, 4000);

    // Clear the timeout when the component unmounts
    useEffect(() => {
      return () => {
        clearTimeout(timer);
      };
    }, []); 
   
  
   return(
     <SafeAreaView style={styles.Container2}>

      <TouchableOpacity onPress={()=>navigation.navigate('Information3')} >
        <View style={styles.head2}>
          <Text style={styles.logoName2}> Budget Wise</Text>
            <MyImage/>
          <Text style={{fontSize:20,fontWeight:'bold',margin:20}}> Budget Wise</Text>
        </View>
        <View style={styles.content2}>
          <Text style={styles.textContent2}>Trusted by milions</Text>
          <Text style={styles.textContent2}>Over 3 million accounts</Text>
          <Text style={styles.textContent2}>added. </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.inlineElement2}>
        <Text style={styles.Textinput2}onPress={()=>navigation.replace('LogIn')}> Log in </Text>
        <Text style={styles.Textinput2} onPress={()=>navigation.replace('SignIn')}> Sign up </Text>
      </View>

     </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  imageContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container2:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:90
  },
  content2:{
    textAlign:'center',
    alignItems:'center',
    marginBottom:130,
    marginTop:32
  },
  textContent2:{
   margin:10,
   fontSize:17,
   fontWeight:'bold'
  },
  imageSize2: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
  inlineElement2:{
    flexDirection: 'row'
  },
  Textinput2:{
    margin: 9,
    color:'black',
    fontWeight:'bold',
    borderColor:'gray',
    width:150,
    borderWidth:3,
    fontSize:18,
    padding:5,
    height:40,
    borderRadius:5,
    marginRight:5,
    marginLeft:4,
    textAlign:'center'
  },
  head2:{
    alignContent:'center',
    alignItems:'center'
  },
  logoName2:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:30
  }

})
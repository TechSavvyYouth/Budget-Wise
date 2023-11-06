import React, {useState} from 'react';
import { Text, SafeAreaView, StyleSheet,  TextInput, View,Image } from 'react-native';

//information3-image
const MyImage = () => {
  return (
    <View style={styles.imageContainer3}>
      <Image
        source={require('./assets/3665896.png')}
        style={styles.imageSize3}
      />
    </View>
  );
};

//information-3
 export default function InformationScreen3({navigation}){
   
   return(
     <SafeAreaView style={styles.Container3}>

      <View style={styles.head3}>
        <Text style={styles.logoName3}> Budget Wise</Text>
        <MyImage/>
        <Text style={{fontSize:20,fontWeight:'bold',margin:20}}> Budget Wise</Text>
      </View>
      <View style={styles.content3}>
        <Text style={styles.textContent3}>Serious about security</Text>
      </View>

      <View style={styles.inlineElement3}>
        <Text style={styles.Textinput3}onPress={()=>navigation.replace('LogIn')}> Log in </Text>
        <Text style={styles.Textinput3} onPress={()=>navigation.replace('SignIn')}> Sign up </Text>
      </View>

     </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  imageContainer3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container3:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:90
  },
  content3:{
    textAlign:'center',
    alignItems:'center',
    marginBottom:130,
    marginTop:158
  },
  textContent3:{
   marginTop:-140,
   marginBottom:118,
   fontSize:17,
   fontWeight:'bold'
  },
  imageSize3: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
  inlineElement3:{
    flexDirection: 'row'
  },
  Textinput3:{
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
  head3:{
    alignContent:'center',
    alignItems:'center'
  },
  logoName3:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:30
  }

})
import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';


//information1-image
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


//information-1
export default function InformationScreen1({navigation}){
  
    const timer = setTimeout(() => {
      navigation.navigate('Information2');
    }, 4000);

    // Clear the timeout when the component unmounts
    useEffect(() => {
      return () => {
        clearTimeout(timer);
      };
    }, []);
   
   return(
    <SafeAreaView style={styles.Container}>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Information2')} >
        <View style={styles.head}>
          <Text style={styles.logoName}> Budget Wise</Text>
            <MyImage/>
          <Text style={{fontSize:20,fontWeight:'bold',margin:20}}> Budget Wise</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.textContent}>Two easy steps  to get started</Text>
          <Text style={styles.textContent}>Click (Ready to assign) to assign net monthy income.</Text>
          <Text style={styles.textContent}>And let Bugdet Wise to do the rest. </Text>
        </View>

      </TouchableOpacity>  

      { <View style={styles.inlineElement}>
        <Text style={styles.Textinput}onPress={()=>navigation.replace('LogIn')}> Log in </Text>
        <Text style={styles.Textinput} onPress={()=>navigation.replace('SignIn')}> Sign up </Text>
      </View> }

    </SafeAreaView>
      

    
   );
}


const styles = StyleSheet.create({
  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:90
  },
  imageSize: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
  content:{
    textAlign:'center',
    alignItems:'center',
    marginBottom:130,
    marginTop:10
  },
  textContent:{
   margin:10,
   fontSize:17,
   fontWeight:'bold'
  },
  inlineElement:{
    flexDirection: 'row'
  },
  Textinput:{
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
  head:{
    alignContent:'center',
    alignItems:'center'
  },
  logoName:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:30
  }
})
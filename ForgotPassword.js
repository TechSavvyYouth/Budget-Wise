// ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from './Firebase';
import {sendPasswordResetEmail} from 'firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = () => {
    
      sendPasswordResetEmail(auth,email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
      });
  };

  return (
    <View style={styles.container}>
      {resetSent ? (
        <Text style={{fontSize:16}}>Password reset instructions sent to your email. Check your inbox.</Text>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={{fontSize:16}}>Enter your email to reset your password</Text>
          <TextInput
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={handleResetPassword}>
            <Text style={styles.reset}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back to logIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    innerContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        margin: 9,
        color:'gray',
        borderColor:'gray',
        width:300,
        borderWidth:2,
        fontSize:18,
        padding:8,
        height:40,
        borderRadius:5,
        marginRight:3,
        marginLeft:11,
        fontWeight:'bold',
        fontSize:18,
    },
    reset:{
    width:300,
    padding:6,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'solid',
    backgroundColor:'lightgray',
    borderRadius:5,
    color:'white',
    fontWeight:'bold',
    fontSize:18,
    marginLeft:5,
    paddingLeft:88
    },
    back:{
    width:300,
    padding:6,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'solid',
    backgroundColor:'lightgray',
    borderRadius:5,
    color:'white',
    fontWeight:'bold',
    fontSize:18,
    marginLeft:5,
    paddingLeft:88,
    marginTop:9
    }
})


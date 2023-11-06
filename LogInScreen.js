import React, {useState} from 'react';
import { Text, SafeAreaView, StyleSheet,  TextInput, Image, View, TouchableOpacity } from 'react-native';
import {auth} from './Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';

//Plain-horizontal-line
function PlainHorizontalLine() {
  return <View style={styles.line} />;
}

//Main-function
function LoginScreen({navigation}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);

  const handleSubmit =()=>{
    if(!email || !password){
         setError(false);
    }else{
  
      signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
        
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        
      });
    }
  }

  return(
    <SafeAreaView style={{position:'absolute',top: 80, left:20}}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/3665896.png')}
          style={styles.image}
        />

        <Text style={styles.head}>create your account</Text>
      </View>


      <View style={styles.middleContainer}>
      
        <TextInput
        placeholder="Email address"
          style= {styles.emailInput}
          onChangeText = {(text)=>{setEmail(text)}}
          />
          <TextInput
        placeholder="Password"
          style= {styles.passwordInput}
          onChangeText = {(text)=>{setPassword(text)
        
        }}
        
          secureTextEntry={true}
        />

        {!error && (
          <Text style={{color:'red'}}> All fields are required</Text>
        )}

       <View style={styles.container}>
         <Text style={{color:'lightblue', margin:10}} onPress={()=>navigation.navigate('Forgot')}> forgot password? </Text>
       </View>

        <TouchableOpacity>
          <Text style={styles.button}
          onPress={handleSubmit}
          > Next </Text>
        </TouchableOpacity>
      </View>
      
      
    <PlainHorizontalLine/>

    <View style={styles.lilContainer}>
      <Text> Don't have an account? <Text style={styles.title} onPress={()=>navigation.navigate('SignIn')}> Sign in</Text></Text>
    </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  lilContainer:{
    alignContent:'center',
    alignItems:'center'
  },
  title:{
    color:'lightblue'
  },
  TitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin:5
  },
  TitleBeforeAfter: {
    height: 1,
    backgroundColor: '#000',
    flex: 1,
    maxWidth: 136,
  },
  Title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
   line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black', 
    marginVertical: 10, 
    width:304,
    marginLeft:14
  },
  lineText:{
    fontSize:18,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain', 
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head:{
    fontSize:23,
    fontWeight:'bold',
    margin:15
  },
   container:{
    alignContent:'center',
    alignItems:'center'
  },
  middleContainer:{
    marginBottom:10,
    alignContent:'center',
    alignItems:'center'
  },
  emailInput:{
    margin: 9,
    marginRight:14,
    marginTop:8,
    color:'gray',
    borderColor:'gray',
    width:300,
    borderWidth:2,
    fontSize:18,
    padding:7,
    height:40,
    borderRadius:5
  },
  passwordInput:{
    margin: 9,
    marginRight:14,
    marginTop:-2,
    color:'gray',
    borderColor:'gray',
    width:300,
    borderWidth:2,
    fontSize:18,
    padding:7,
    height:40,
    borderRadius:5
  },
  button:{
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
    marginRight:4,
    paddingLeft:130
  },
})
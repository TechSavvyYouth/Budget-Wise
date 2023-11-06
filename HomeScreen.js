import {MaterialCommunityIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, SafeAreaView, StyleSheet,  TextInput, Image, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation, route}){

  const [accounts, setAccounts] = useState([]);

  const addAccount = (accountData) => {
    setAccounts([...accounts, accountData]);
  };

  const navigateToAccountDetails = (account) => {
  navigation.navigate('OptDetails', { account });
  };


  return(
    <SafeAreaView>
      <View style={styles.headerContaner}>
        <Text style={styles.heading}>Account</Text>
        <Text onPress={()=>navigation.navigate('Add', { addAccount })} ><Ionicons name="add-circle" size={35} color="black" /></Text>
      </View>

      {accounts.map((account, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToAccountDetails(account)}>
        <View key={index} style={{ backgroundColor: account.color, padding: 15, margin: 10, borderRadius:10 }}>
          <Text style={{fontSize: 17,fontWeight:'bold'}}><MaterialCommunityIcons name="bullseye-arrow" size={24} color="black" style={
            { marginRight: 10 }}/> 
             {account.goal}</Text>
          <Text style={{fontSize: 17,fontWeight:'bold', paddingTop:5}}><Ionicons name="calendar" size={24} color="black" style={{  
             marginRight: 10 }}/> 
          {account.date.toDateString()}</Text>
        </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  heading:{
    fontSize:20,
    fontWeight:'bold',
    paddingRight:160,
    marginLeft:25,
  },
  headerContaner:{
    flexDirection:'row',
    marginTop:35
  }
})
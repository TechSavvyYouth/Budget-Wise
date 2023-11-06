import React, {useState} from 'react';
import { Text, SafeAreaView, StyleSheet,  TextInput, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation, route }) {

    const [postText, setPostText] = useState('');
    const [colorTheme, setColorTheme] = useState('');

    const CurrentDate = new Date();
    CurrentDate.setHours(0, 0, 0, 0);

    const handleSave = () => {
        // Create a new account object
        const newAccount = {
          goal: postText,
          color: colorTheme,
          date: CurrentDate,
        };
    
        // Call the addAccount function to add the new account to the list
        route.params.addAccount(newAccount);
    
        // Navigate back to the HomeScreen
        navigation.navigate('Home');
      };
    
      const handleColorSelect = (color) => {
        setColorTheme(color);
      };
    
      const colorOptions = [
        'red', 'green', 'yellow',
      ];

    return(
        <SafeAreaView style={styles.container}>
           <View style={styles.headerContainer}>
                <View style={styles.row}>
                   <Text style={styles.dateText}>{CurrentDate.toDateString()}</Text>
                   <Text style={{ marginLeft: 76 }}> <Ionicons name="calendar" size={24} color="black" /> </Text>
                </View>

                <TextInput
                style={styles.textInput}
                placeholder="Enter account goal"
                value={postText}
                onChangeText={setPostText}
                />

                <View style={styles.row}>
                   <Text style={styles.themeText}>Color theme</Text>

                    <View style={styles.colorPicker}>
                        {colorOptions.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.colorOption, { backgroundColor: color }]}
                            onPress={() => handleColorSelect(color)}
                        />
                        ))}
                    </View>
                </View>

                <View style={styles.row}>
                   <Text style={styles.buttonText} onPress={()=>navigation.goBack()}>Cancel</Text>
                   <Text style={styles.buttonTextSave} onPress={handleSave}> Save </Text>
                </View>
            </View> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
      },
      headerContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop:330
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },dateText: {
        marginLeft: 5,
        fontSize: 17,
        fontWeight:'bold'
      },
      textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        color: 'gray',
        padding: 6,
        marginLeft: 5,
        backgroundColor:'white',
        fontSize:17,
        fontWeight:'bold'
      },
      themeText: {
        marginLeft: 5,
        fontSize: 17,
        fontWeight:'bold'
      },
      buttonText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        cursor: 'pointer'
      },
      buttonTextSave: {
        color: '#337CCF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 105,
        cursor: 'pointer'
      },
      colorPicker: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        marginLeft:10
      },
      colorOption: {
        width: 20, 
        height: 25,
        margin: 10, 
        borderRadius: 15, 
      },
})
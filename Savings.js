import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import { useData } from './DataContext';

import { doc, deleteDoc } from "firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { db } from "./Firebase";

export default function SavingsScreen({ navigation }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [totalSavings, setTotalSavings] = useState(0);
  const [savingsData, setSavingsData] = useState([]);
  const [savingsDataDb, setSavingsDataDb] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  let user_id = "ELPrR0DsFuWPP7GVhDdr26EKyqv1";

  if (user) {
    user_id = user.uid;
    console.log("Found user");
  }

  useEffect(() => {
    const q = query(collection(db, "savings", user_id, user_id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setSavingsDataDb(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddSavings = () => {
    if (source.trim() === "" || amount.trim() === "") {
      Alert.alert("Please fill in both fields");
      return;
    }

    const newSavingsItem = { source, amount };
    setSavingsData([...savingsData, newSavingsItem]);
    setSource("");
    setAmount("");

    setTotalSavings((prevTotalIncome) => prevTotalIncome + parseFloat(amount));
  };

  const handleDeleteExpenseDb = async (index) => {
    await deleteDoc(doc(db, "savings", user_id, user_id, index));
  };

  const handleDeleteSavings = (index) => {
    const updatedSavingsData = [...savingsData];
    updatedSavingsData.splice(index, 1);
    setSavingsData(updatedSavingsData);
  };

  const handleDone = () => {
    try {
      savingsData.forEach(async (data) => {
        if (!data.id) {
          await addDoc(collection(db, "savings", user_id, user_id), {
            ...data,
            total: totalSavings ,
            createdAt: Date.now(),
            user: user_id,
          });
        }
      });

      setSavingsData([]);
    } catch (error) {
      console.log("Add Error: ", error);
    }

    //  navigation.navigate('Details',{totalSavings});
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Savings source"
        value={source}
        onChangeText={(text) => setSource(text)}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={styles.textInput}
      />

      <Button title="Add Savings" onPress={handleAddSavings} />

      <Text style={styles.header}>Savings List</Text>

      {savingsData.length > 0 ? (
        <>
          <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
            New Expenses
          </Text>
          <FlatList
            data={savingsData}
            keyExtractor={(item, index) => `${item.expense}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.incomeItem}>
                <Text>
                  {item.source}: ${item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteSavings(item.id)}>
                  <Ionicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : null}

      {savingsData.length > 0 ? (
        <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
          Existing Expenses
        </Text>
      ) : null}

      <FlatList
        data={savingsDataDb}
        keyExtractor={(item, index) => `${item.source}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.savingsItem}>
            <Text>
              {item.source}: ${item.amount}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteExpenseDb(index)}>
              <Ionicons name="close" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Done" onPress={handleDone} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 80,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "gray",
    marginBottom: 10,
    padding: 8,
    borderBottomColor: "black",
    color: "gray",
    padding: 6,
    marginLeft: 5,
    backgroundColor: "white",
    fontSize: 17,
    fontWeight: "bold",
    borderRadius: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  savingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
});

import {
  doc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { addDoc } from "firebase/firestore";
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
import { db } from "./Firebase";
import { getAuth } from "@firebase/auth";

export default function IncomeScreen({ navigation }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [incomeDataDb, setIncomeDataDb] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;

  let user_id = "ELPrR0DsFuWPP7GVhDdr26EKyqv1";

  if (user) {
    user_id = user.uid;
    console.log("Found user");
  }

  useEffect(() => {
    const q = query(collection(db, "income", user_id, user_id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setIncomeDataDb(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddIncome = () => {
    if (source.trim() === "" || amount.trim() === "") {
      Alert.alert("Please fill in both fields");
      return;
    }

    const newIncomeItem = { source, amount };
    setIncomeData([...incomeData, newIncomeItem]);
    setSource("");
    setAmount("");

    setTotalIncome((prevTotalIncome) => prevTotalIncome + parseFloat(amount));
  };

  const handleDeleteExpenseDb = async (index) => {
    await deleteDoc(doc(db, "income", user_id, user_id, index));
  };

  const handleDeleteIncome = (index) => {
    const updatedIncomeData = [...incomeData];
    updatedIncomeData.splice(index, 1);
    setIncomeDataDb(updatedIncomeData);
  };

  const handleDone = () => {
    try {
      incomeData.forEach(async (data) => {
        if (!data.id) {
          await addDoc(collection(db, "income", user_id, user_id), {
            ...data,
            total: totalIncome,
            createdAt: Date.now(),
            user: user_id,
          });
        }
      });

      setIncomeData([]);
    } catch (error) {
      console.log("Add Error: ", error);
    }

   // navigation.navigate("Details", { totalIncome });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Income source"
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

      <Button title="Add Income" onPress={handleAddIncome} />

      <Text style={styles.header}>Income List</Text>

      {incomeData.length > 0 ? (
        <>
          <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
            New Expenses
          </Text>
          <FlatList
            data={incomeData}
            keyExtractor={(item, index) => `${item.expense}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.incomeItem}>
                <Text>
                  {item.source}: ${item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteIncome(index)}>
                  <Ionicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : null}

      {incomeData.length > 0 ? (
        <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
          Existing Expenses
        </Text>
      ) : null}

      <FlatList
        data={incomeDataDb}
        keyExtractor={(item, index) => `${item.source}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.incomeItem}>
            <Text>
              {item.source}: ${item.amount}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteExpenseDb(item.id)}>
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
  incomeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
});

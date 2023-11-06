import { doc, deleteDoc } from "firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
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
import { db } from "./Firebase";
import { getAuth } from "@firebase/auth";
//import { useData } from './DataContext';

export default function ExpensesScreen({ navigation }) {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [expenseDataDb, setExpenseDataDb] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;

  let user_id = "ELPrR0DsFuWPP7GVhDdr26EKyqv1";

  if (user) {
    user_id = user.uid;
    console.log("Found user");
  }

  useEffect(() => {
    const q = query(collection(db, "expenses", user_id, user_id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setExpenseDataDb(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddExpense = () => {
    if (expense.trim() === "" || amount.trim() === "") {
      Alert.alert("Please fill in both fields");
      return;
    }

    const newExpenseItem = { expense, amount };
    setExpenseData([...expenseData, newExpenseItem]);
    setExpense("");
    setAmount("");

    setTotalExpense(
      (prevTotalExpense) => parseFloat(prevTotalExpense) + parseFloat(amount)
    );
  };

  const handleDeleteExpenseDb = async (index) => {
    await deleteDoc(doc(db, "expenses", user_id, user_id, index));
  };

  const handleDeleteExpense = async (index) => {
    const updatedExpenseData = [...expenseData];
    updatedExpenseData.splice(index, 1);
    setExpenseData(updatedExpenseData);
  };

  const handleDone = async () => {
    try {
      expenseData.forEach(async (data) => {
        if (!data.id) {
          await addDoc(collection(db, "expenses", user_id, user_id), {
            ...data,
            total: totalExpense,
            createdAt: Date.now(),
            user: user_id,
          });
        }
      });

      setExpenseData([]);
    } catch (error) {
      console.log("Add Error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter expense"
        value={expense}
        onChangeText={(text) => setExpense(text)}
        style={styles.textInput}
      />

      <TextInput
        keyboardType="decimal-pad"
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={styles.textInput}
      />

      <Button title="Add Source" onPress={handleAddExpense} />

      <Text style={styles.header}>Expense List</Text>
      {expenseData.length > 0 ? (
        <>
          <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
            New Expenses
          </Text>
          <FlatList
            data={expenseData}
            keyExtractor={(item, index) => `${item.expense}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.expenseItem}>
                <Text>
                  {item.expense}: ${item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteExpense(index)}>
                  <Ionicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : null}

      {expenseData.length > 0 ? (
        <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
          Existing Expenses
        </Text>
      ) : null}
      <FlatList
        data={expenseDataDb}
        keyExtractor={(item, index) => `${item.expense}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.expenseItem}>
            <Text>
              {item.expense}: ${item.amount}
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
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
});

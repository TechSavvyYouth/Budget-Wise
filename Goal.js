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

export default function GoalScreen({ navigation }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [goalData, setGoalData] = useState([]);
  const [goalDataDb, setGoalDataDb] = useState([]);
  const [totalGoal, setTotalGoal] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;

  let user_id = "ELPrR0DsFuWPP7GVhDdr26EKyqv1";

  if (user) {
    user_id = user.uid;
    console.log("Found user");
  }

  useEffect(() => {
    const q = query(collection(db, "goals", user_id, user_id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setGoalDataDb(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddGoal = () => {
    if (date.trim() === "" || amount.trim() === "") {
      Alert.alert("Please fill in both fields");
      return;
    }

    const newGoalItem = { date, amount };
    setGoalData([...goalData, newGoalItem]);
    setDate("");
    setAmount("");

    setTotalGoal(
      (prevTotalGoal) => parseFloat(prevTotalGoal) + parseFloat(amount)
    );
  };

  const handleDeleteGoalDb = async (index) => {
    await deleteDoc(doc(db, "goals", user_id, user_id, index));
  };

  const handleDeleteGoal = async (index) => {
    const updatedGoalData = [...goalData];
    updatedGoalData.splice(index, 1);
    setGoalData(updatedGoalData);
  };

  const handleDone = async () => {
    try {
      goalData.forEach(async (data) => {
        if (!data.id) {
          await addDoc(collection(db, "goals", user_id, user_id), {
            ...data,
            total: totalGoal,
            createdAt: Date.now(),
            user: user_id,
          });
        }
      });

      setGoalData([]);
    } catch (error) {
      console.log("Add Error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter goal date"
        value={date}
        onChangeText={(text) => setDate(text)}
        style={styles.textInput}
      />

      <TextInput
        keyboardType="decimal-pad"
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={styles.textInput}
      />

      <Button title="Add Goal" onPress={handleAddGoal} />

      <Text style={styles.header}>Goal List</Text>
      {goalData.length > 0 ? (
        <>
          <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
            New Goal
          </Text>
          <FlatList
            data={goalData}
            keyExtractor={(item, index) => `${item.date}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.goalItem}>
                <Text>
                  {item.date}: ${item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteGoal(index)}>
                  <Ionicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : null}

      {goalData.length > 0 ? (
        <Text style={[styles.header, { fontWeight: "400", fontSize: 14 }]}>
          Existing Goal
        </Text>
      ) : null}
      <FlatList
        data={goalDataDb}
        keyExtractor={(item, index) => `${item.expense}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.goalItem}>
            <Text>
              {item.data}: ${item.amount}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteGoalDb(item.id)}>
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
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
});

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
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./Firebase";
import { getAuth } from "@firebase/auth";

export default function AccountDetails({ navigation, route }) {
  const data = [
    {
      id: 1,
      header: "Income",
      expected: 789,
      actual: 70,
      difference: 0,
    },
    {
      id: 2,
      header: "Expenses (Fixed)",
      expected: 800,
      actual: 70,
      difference: 0,
    },
    {
      id: 3,
      header: "Savings",
      expected: 19,
      actual: 2344,
      difference: 0,
    },
  ];
  const [total_, setTotal] = useState(0);
  const [total_e, setTotale] = useState(0);
  const [total_w, setTotalw] = useState(0);
  const [total_f, setTotalf] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;

  let user_id = "ELPrR0DsFuWPP7GVhDdr26EKyqv1";

  if (user) {
    user_id = user.uid;
    console.log("Found user");
  }

  useEffect(() => {
    const q = query(collection(db, "expenses", user_id, user_id));
    const w = query(collection(db, "savings", user_id, user_id));
    const e = query(collection(db, "income", user_id, user_id));
    const f = query(collection(db, "goals", user_id, user_id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = 0;
      querySnapshot.forEach((doc) => {
        data = data + parseFloat(doc.data().amount);
      });
      setTotal(data);
    });

    const unsubscribew = onSnapshot(w, (querySnapshot) => {
      let data = 0;
      querySnapshot.forEach((doc) => {
        data = data + parseFloat(doc.data().amount);
      });
      setTotalw(data);
    });

    const unsubscribee = onSnapshot(e, (querySnapshot) => {
      let data = 0;
      querySnapshot.forEach((doc) => {
        data = data + parseFloat(doc.data().amount);
      });
      setTotale(data);
    });

    const unsubscribef = onSnapshot(f, (querySnapshot) => {
      let data = 0;
      querySnapshot.forEach((doc) => {
        data = data + parseFloat(doc.data().amount);
      });
      setTotalf(data);
    });

    return () => {
      unsubscribe();
      unsubscribee();
      unsubscribew();
      unsubscribef();
    };
  }, []);

  const moneyLeft = total_ - (total_f + total_e);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleRowPress(item)}>
      <View style={styles.tableRow}>
        <Text style={styles.verticalHeaderCell}>{item.header}</Text>
        <Text style={styles.tableCell}>
          {index === 1 ? total_ : index === 2 ? total_f :total_e}
        </Text>
        <Text style={styles.tableCell}>
          {index === 1 ? total_ : index === 2 ? total_w : total_e}
        </Text>
        <Text style={styles.tableCell}>{item.difference}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleRowPress = (item) => {
    if (item.header === "Income") {
      navigation.navigate("Income");
    } else if (item.header === "Expenses (Fixed)") {
      navigation.navigate("Expenses");
    } else if (item.header === "Savings") {
      navigation.navigate("Savings");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 110 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Summary</Text>

      <View style={styles.tableContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerCell}>Cash Flow Summary</Text>
        </View>

        <View style={styles.tableHeader}>
          <View>
            <Text style={styles.headerCell}> </Text>
          </View>
          <Text style={styles.headerCell}>Expected</Text>
          <Text style={styles.headerCell}>Actual</Text>
          <Text style={styles.headerCell}>Difference</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>

      <View style={{marginTop:40}}>
        <Button title="Enter goal amount" onPress={()=>navigation.navigate('Goal')}></Button>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.label}>Money Left</Text>
            <Text style={[styles.result, moneyLeft >= 0 ? styles.greenText : styles.redText]}>{moneyLeft.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  verticalHeaderCell: {
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    paddingLeft: 5,
    paddingTop: 10,
    borderColor: "gray",
    marginLeft: -10,
    marginRight: 20,
    marginTop: -10,
    marginBottom: -10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "gray",
    width: 340,
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    padding: 10,
  },
  headerCell: {
    fontWeight: "bold",
    paddingLeft: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  tableCell: {
    flex: 1,
    paddingLeft: 20,
  },
});

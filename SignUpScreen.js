import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

//Horizontal-line
const HorizontalLine = () => {
  return (
    <View style={styles.TitleContainer}>
      <View style={styles.TitleBeforeAfter}></View>
      <View style={styles.Title}>
        <Text style={styles.lineText}>or</Text>
      </View>
      <View style={styles.TitleBeforeAfter}></View>
    </View>
  );
};
//Plain-horizontal-line
const PlainHorizontalLine = () => <View style={styles.line} />;

//Main-function
function SignInScreen({ navigation }) {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = () => {
    if (!fname || !lname || !email || !password || !confirmPassword) {
      setAlert("All fields are required");
    } else if (password.length < 8) {
      setPasswordLengthError(true);
    } else if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);
          // You can redirect the user or perform other actions here.
          navigation.navigate("LogIn");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setAlert(
              "This email is already in use. Please choose another one."
            );
          } else {
            console.error("Error creating user:", error);
            setAlert(error.message);
          }
        });
    }
  };

  return (
    <SafeAreaView style={{ position: "absolute", top: 80, left:20 }}>
      <View style={styles.imageContainer}>
        <Image source={require("./assets/3665896.png")} style={styles.image} />

        <Text style={styles.head}>create your account</Text>
      </View>

      <View style={styles.inlineElement}>
        <TextInput
          placeholder="First name"
          style={styles.textinput}
          value={fname}
          onChangeText={(text) => {
            setFname(text);
          }}
        />

        <TextInput
          placeholder="Last name"
          style={styles.textinput}
          value={lname}
          onChangeText={(text) => {
            setLname(text);
          }}
        />
      </View>

      <View style={styles.middleContainer}>
        <TextInput
          placeholder="Email address"
          style={styles.emailInput}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text);

            if (passwordLengthError) {
              setPasswordLengthError(false);
            }
          }}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Passsword"
          style={styles.confirmInput}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry={true}
        />

        {!passwordMatch && (
          <Text style={{ color: "red" }}>
            Passwords do not match. Please try again.
          </Text>
        )}
        {passwordLengthError && (
          <Text style={{ color: "red" }}>
            Password must be at least 8 characters long.
          </Text>
        )}

        <TouchableOpacity>
          <Text style={styles.button} onPress={handleSubmit}>
            {" "}
            SignIn{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <HorizontalLine />
      <View style={styles.container}>
        <Text style={styles.altSignUp}>sign up with Apple</Text>

        <Text style={styles.altSignUp}>sign up with Google</Text>
      </View>

      <PlainHorizontalLine />

      <View style={styles.lilContainer}>
        <Text>
          {" "}
          Have an account?{" "}
          <Text
            style={styles.title}
            onPress={() => navigation.navigate("LogIn")}
          >
            {" "}
            Log in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  lilContainer: {
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    color: "lightblue",
  },
  TitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  TitleBeforeAfter: {
    height: 1,
    backgroundColor: "#000",
    flex: 1,
    maxWidth: 136,
  },
  Title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 10,
    width: 304,
    marginLeft: 14,
  },
  lineText: {
    fontSize: 18,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    fontSize: 23,
    fontWeight: "bold",
    margin: 15,
  },
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  middleContainer: {
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
  },
  altSignUp: {
    width: 300,
    padding: 6,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 9,
    paddingLeft: 80,
    margin: 4,
  },
  textinput: {
    margin: 9,
    color: "gray",
    borderColor: "gray",
    width: 142,
    borderWidth: 2,
    fontSize: 18,
    padding: 8,
    height: 40,
    borderRadius: 5,
    marginRight: 3,
    marginLeft: 11,
  },
  inlineElement: {
    flexDirection: "row",
    marginBottom: -11,
    marginTop: -10,
  },
  emailInput: {
    margin: 9,
    marginRight: 14,
    marginTop: 8,
    color: "gray",
    borderColor: "gray",
    width: 300,
    borderWidth: 2,
    fontSize: 18,
    padding: 7,
    height: 40,
    borderRadius: 5,
  },
  confirmInput: {
    margin: 9,
    marginRight: 14,
    marginTop: -2,
    color: "gray",
    borderColor: "gray",
    width: 300,
    borderWidth: 2,
    fontSize: 18,
    padding: 7,
    height: 40,
    borderRadius: 5,
  },
  passwordInput: {
    margin: 9,
    marginRight: 14,
    marginTop: -2,
    color: "gray",
    borderColor: "gray",
    width: 300,
    borderWidth: 2,
    fontSize: 18,
    padding: 7,
    height: 40,
    borderRadius: 5,
  },
  button: {
    width: 300,
    padding: 6,
    borderWidth: 2,
    borderColor: "gray",
    borderStyle: "solid",
    backgroundColor: "lightgray",
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 4,
    paddingLeft: 130,
  },
});

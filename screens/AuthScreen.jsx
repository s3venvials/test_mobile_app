import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Colors } from "react-native-paper";

import SignUpScreen from "./SignUpScreen";
import AuthStorage from "../services/AuthStorage";

import AuthenticationProviders from "../services/AuthProviders";
import * as ACTIONS from "../actions";

const initialState = {
  email: "",
  password: "",
  isSubmitted: false,
  error: "",
};

const AuthScreen = ({ navigation }) => {
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

  const authProvider = new AuthenticationProviders();

  const handleAuth = async () => {
    authProvider.action = ACTIONS.LOGIN;
    authProvider.email = state.email;
    authProvider.password = state.password;
    const response = await authProvider.EmailPassword();
    await new AuthStorage("User", JSON.stringify(response.data.idToken)).Save();
  };

  const handleSubmit = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        isSubmitted: true,
      }));
      if (!state.email || !state.password) {
        return;
      }

      setLoading(true);
      await handleAuth();
      setState(initialState);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Home");
      }, 600);
    } catch (error) {
      setLoading(false);
      setState((prevState) => ({
        ...prevState,
        error: error.toString(),
      }));
    }
  };

  if (signUp) {
    return <SignUpScreen signUp={(bool) => setSignUp(bool)} />;
  }

  const handleChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.errorText}>{state.error}</Text>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        value={state.email}
        onChangeText={handleChange.bind(this, "email")}
        label="Username"
      />
      {state.isSubmitted && !state.email && (
        <Text style={styles.errorText}>Email is required</Text>
      )}
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="password"
        secureTextEntry
        value={state.password}
        onChangeText={handleChange.bind(this, "password")}
      />
      {state.isSubmitted && !state.password && (
        <Text style={styles.errorText}>Password is required</Text>
      )}
      <Button
        loading={loading}
        style={styles.signInBtn}
        mode="contained"
        onPress={handleSubmit}
      >
        Login
      </Button>
      <Button
        style={styles.signInBtn}
        mode="text"
        onPress={() => setSignUp(true)}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
  },
  textInput: {
    marginVertical: 5,
  },
  signInBtn: {
    marginTop: 5,
  },
  errorText: {
    color: Colors.red500,
  },
});

export default AuthScreen;

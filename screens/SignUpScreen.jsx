import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Colors } from "react-native-paper";

import AuthenticationProviders from "../services/AuthProviders";
import * as ACTIONS from "../actions";

const initialState = {
    email: "",
    password: "",
    isSubmitted: false,
    error: "",
  };

const SignUpScreen = ({ signUp }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const authProvider = new AuthenticationProviders();

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
      authProvider.action = ACTIONS.SIGNUP;
      authProvider.email = state.email;
      authProvider.password = state.password;
      await authProvider.EmailPassword();
      setState(initialState);
      setTimeout(() => {
        setLoading(false);
        signUp(false);
      }, 600);
    } catch (error) {
      setLoading(false);
      setState((prevState) => ({
        ...prevState,
        error: error.toString(),
      }));
    }
  };

  const handleChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.errorText}>{state.error}</Text>
      <TextInput
        style={styles.textInput}
        value={state.email}
        onChangeText={handleChange.bind(this, "email")}
        mode="outlined"
        label="Username"
      />
      {state.isSubmitted && !state.email && (
        <Text style={styles.errorText}>Email is required</Text>
      )}
      <TextInput
        style={styles.textInput}
        value={state.password}
        onChangeText={handleChange.bind(this, "password")}
        mode="outlined"
        label="password"
        secureTextEntry
      />
      {state.isSubmitted && !state.password && (
        <Text style={styles.errorText}>Password is required</Text>
      )}
      <Button
        loading={loading}
        style={styles.signUpBtn}
        mode="contained"
        color={Colors.deepPurple500}
        onPress={handleSubmit}
      >
        Sign Up
      </Button>
      <Button
        style={styles.signUpBtn}
        mode="text"
        color={Colors.indigo500}
        onPress={() => signUp(false)}
      >
        Already Have An Account?
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
  signUpBtn: {
    marginTop: 5,
  },
  errorText: {
    color: Colors.red500,
  },
});

export default SignUpScreen;

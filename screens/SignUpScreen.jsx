import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Colors, Surface } from "react-native-paper";

import AuthenticationProviders from "../services/AuthProviders";
import * as ACTIONS from "../actions";

const initialState = {
  email: "",
  password: "",
  isSubmitted: false,
  error: "",
};

const SignupConfirmation = ({ signUp }) => {
  return (
    <Surface style={styles.container}>
      <Text style={styles.confirmText}>
        Your sign up was successfull! Just one more step and you will be ready
        to go! Please check your registered email to verify your account.
      </Text>
      <Button style={styles.signUpBtn} mode="contained" onPress={() => signUp(false)}>Go To Login</Button>
    </Surface>
  );
};

const SignUpScreen = ({ signUp }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
      const response = await authProvider.EmailPassword();
      authProvider.idToken = response.data.idToken;
      await authProvider.SendEmailVerification();
      setState(initialState);
      setTimeout(() => {
        setLoading(false);
        setShowConfirmation(true);
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

  if (showConfirmation) {
    return <SignupConfirmation signUp={signUp} />;
  }

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
  confirmText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default SignUpScreen;

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, TextInput, Button, Surface } from "react-native-paper";
import AuthenticationProviders from "../services/AuthProviders";

const initialState = {
  email: "",
  isSubmitted: false,
  error: "",
};

const SignupConfirmation = ({ navigation }) => {
  return (
    <Surface style={styles.container}>
      <Text style={styles.confirmText}>
        Please check your email and follow the instructions to complete the
        password reset process.
      </Text>
      <Button
        style={styles.signInBtn}
        mode="contained"
        onPress={() => navigation.navigate("Auth")}
      >
        Go To Login
      </Button>
    </Surface>
  );
};

export default function ForgotPassScreen({ navigation }) {
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
      if (!state.email) {
        return;
      }

      setLoading(true);
      authProvider.email = state.email;
      await authProvider.ResetPassword();
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
    return <SignupConfirmation navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
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
      <Button
        loading={loading}
        style={styles.signInBtn}
        mode="contained"
        onPress={handleSubmit}
      >
        Submit
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Auth")}>
        Go To Login
      </Button>
    </View>
  );
}

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
  confirmText: {
    fontSize: 20,
    textAlign: "center",
  },
});

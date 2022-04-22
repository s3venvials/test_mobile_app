import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Colors } from "react-native-paper";

import AppBarBottom from "../components/AppBarBottom";

import AuthStorage from "../services/AuthStorage";
import AuthenticationProviders from "../services/AuthProviders";
import Token from "../services/Token";

const AcountScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authProvider = new AuthenticationProviders();
  const authStorage = new AuthStorage();
  const token = new Token();
  authStorage.key = "User";
  token.key = "Token";

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await authStorage.Get();
      setUser(JSON.parse(currentUser));
    };
    getUser();
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      authProvider.idToken = await token.Get();
      await authProvider.DeleteAccount();
      await authStorage.Clear();
      await token.Clear();
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Auth");
      }, 600);
    } catch (error) {
      setLoading(false);
      setError(error.toString());
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.title}>User Account</Text>
        <Button
          loading={loading}
          mode="contained"
          onPress={handleDelete}
          color={Colors.red700}
        >
          Delete Account
        </Button>
      </View>
      <AppBarBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 2,
    fontSize: 19,
  },
  error: {
    color: Colors.red700,
  },
});

export default AcountScreen;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Avatar } from "react-native-paper";

import Token from "../services/Token";
import AuthStorage from "../services/AuthStorage";

export default function SplashScreen({ navigation }) {
  const auth = new AuthStorage("User").Get();

  auth.then((user) => {
    setTimeout(() => {
      if (user) {
        const isExpired = new Token(auth?.idToken, auth?.exp).IsExpired();
        if (isExpired) {
          navigation.navigate("Auth");
        } else {
          navigation.navigate("Home");
        }
      } else {
        navigation.navigate("Auth");
      }
    }, 600);
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>My Test App</Text>
        <Avatar.Icon size={175} icon="robot" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.blue600,
  },
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.white,
  },
});

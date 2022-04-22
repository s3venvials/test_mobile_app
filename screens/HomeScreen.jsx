import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import AppBarBottom from "../components/AppBarBottom";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Go to details"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
      <AppBarBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
});

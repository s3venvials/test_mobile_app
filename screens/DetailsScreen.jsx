import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AppBarBottom from "../components/AppBarBottom";

export default function DetailsScreen() {
  return (
    <View>
      <View style={style.container}>
        <Text>Details Screen</Text>
      </View>
      <AppBarBottom />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

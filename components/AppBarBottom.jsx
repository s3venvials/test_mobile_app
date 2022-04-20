import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import AuthStorage from "../services/AuthStorage";

const AppBarBottom = () => {
  const navigation = useNavigation();
  const authStorage = new AuthStorage();
  authStorage.key = "User";

  const handleLogOut = async () => {
    await authStorage.Clear();
    navigation.navigate("Auth")
  }

  return (
    <Appbar style={styles.bottom}>
      <View style={styles.actions}>
        <Appbar.Action
          icon="home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View style={styles.actions}>
        <Appbar.Action
          icon="account"
          onPress={() => console.log("Pressed account")}
        />
      </View>
      <View style={styles.actions}>
        <Appbar.Action
          icon="heart"
          onPress={() => console.log("Pressed heart")}
        />
      </View>
      <View style={styles.actions}>
        <Appbar.Action icon="logout" onPress={handleLogOut} />
      </View>
    </Appbar>
  );
};

export default AppBarBottom;

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "6%",
  },
});

import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import AuthStorage from "../services/AuthStorage";

const AppBarNavigation = ({ navigation, back }) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navName =
    navigation.getState().routes[navigation.getState().index].name;
  const isSplash = navName === "Splash";
  const isAuth = navName === "Auth" || navName === "Reset";
  const isHome = navName === "Home";
  const authStorage = new AuthStorage();
  authStorage.key = "User";

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await authStorage.Get();
      setUser(JSON.parse(currentUser));
    };
    if (!isAuth) {
      getUser();
    }
  }, []);

  if (isSplash) {
    return null;
  }

  return (
    <Appbar.Header>
      {!isHome && !isAuth && back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content
        title={isAuth ? "My Test App" : `Hello ${user?.email ?? ""}`}
      />
      {!isAuth && isHome && (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => {
              console.log("Option 1 was pressed");
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log("Option 2 was pressed");
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log("Option 3 was pressed");
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      )}
    </Appbar.Header>
  );
};

export default AppBarNavigation;

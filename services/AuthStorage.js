import * as SecureStore from "expo-secure-store";
import Token from "./Token";

export default class AuthStorage {
  constructor(key, idToken) {
    this.key = key;
    this.idToken = idToken;
  }

  async Save() {
    const T = new Token(this.idToken);
    const decoded = T.Decode();
    return await SecureStore.setItemAsync(this.key, JSON.stringify(decoded));
  }

  async Get() {
    return await SecureStore.getItemAsync(this.key);
  }

  async Clear() {
    return await SecureStore.deleteItemAsync(this.key);
  }
}

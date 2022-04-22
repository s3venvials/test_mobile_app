import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

class Token {
  constructor(idToken, exp, key) {
    this.idToken = idToken;
    this.exp = exp;
    this.key = key;
  }

  Decode() {
      return jwt_decode(this.idToken);
  }

  IsExpired() {
      const now = Date.now();
      return now >= this.exp * 1000;
  }

  async Save() {
    return await SecureStore.setItemAsync(this.key, this.idToken);
  }

  async Get() {
    return await SecureStore.getItemAsync(this.key);
  }

  async Clear() {
    return await SecureStore.deleteItemAsync(this.key);
  }
}

export default Token;

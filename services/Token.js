import jwt_decode from "jwt-decode";

class Token {
  constructor(idToken, exp) {
    this.idToken = idToken;
    this.exp = exp;
  }

  Decode() {
      return jwt_decode(this.idToken);
  }

  IsExpired() {
      const now = Date.now();
      return now >= this.exp * 1000;
  }
}

export default Token;

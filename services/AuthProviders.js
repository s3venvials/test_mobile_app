import * as API from "../api/Authentication";
import * as ACTIONS from "../actions";

export default class AuthenticationProviders {
  constructor(action, email, password) {
    this.action = action;
    this.email = email;
    this.password = password;
  }

  async EmailPassword() {
    switch (this.action) {
      case ACTIONS.SIGNUP:
        return await API.emailPasswordSignup(this.email, this.password);
      case ACTIONS.LOGIN:
        return await API.emailPasswordLogin(this.email, this.password);
      default:
        return;
    }
  }

  Google() {}
}

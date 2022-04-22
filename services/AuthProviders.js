import * as API from "../api/Authentication";
import * as ACTIONS from "../actions";

export default class AuthenticationProviders {
  constructor(action, email, password, idToken) {
    this.action = action;
    this.email = email;
    this.password = password;
    this.idToken = idToken;
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

  async SendEmailVerification() {
    return await API.sendEmailVerification(this.idToken);
  }

  async ResetPassword() {
    return await API.ResetPassword(this.email);
  }

  async DeleteAccount() {
    return await API.deleteAccount(this.idToken);
  }
}

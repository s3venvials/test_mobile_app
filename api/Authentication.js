import axios from "axios";
import { FIREBASE_API } from "@env";

export const emailPasswordSignup = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`,
      { email, password, returnSecureToken: true }
    );

    if (response.status !== 200) {
      throw new Error(
        "There was an issue processing your request. Please Try again."
      );
    }

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const emailPasswordLogin = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API}`,
      { email, password }
    );

    if (response.status === 401) {
      throw new Error("Username or password is invalid.");
    }

    if (response.status !== 200) {
      throw new Error(
        "There was an issue processing your request. Please Try again."
      );
    }

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

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

export const sendEmailVerification = async (idToken) => {
  try {
    const response = axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API}`,
      {
        requestType: "VERIFY_EMAIL",
        idToken,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const ResetPassword = async (email) => {
  try {
    const response = axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API}`,
      {
        requestType: "PASSWORD_RESET",
        email,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (idToken) => {
  try {
    const response = axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${FIREBASE_API}`,
      {
        idToken,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

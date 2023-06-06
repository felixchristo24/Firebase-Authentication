import axios from "axios";
import { getUserID } from "./Storage";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1/";
const API_Key = "YOUR_API_KEY";
const Register_URL = `accounts:signUp?key=${API_Key}`;
const Login_URL = `accounts:signInWithPassword?key=${API_Key}`;
const GetUser_URL = `accounts:lookup?key=${API_Key}`;
export const registerAPI = (input) => {
  let data = {
    displayName: input.name,
    email: input.email,
    password: input.password,
  };
  return axios.post(Register_URL, data);
};

export const LoginAPI = (input) => {
  let data = { email: input.email, password: input.password };
  return axios.post(Login_URL, data);
};

export const getUser = () => {
    let data = { idToken: getUserID() };
    return axios.post(GetUser_URL, data);
  };
  
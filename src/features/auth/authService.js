import axios from "axios";

const API = process.env.REACT_APP_API_URL;
// console.log(API);

//Register user
const register = async (userData) => {

  const response = await axios.post(`${API}auth/user/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }



  window.location.reload();
  // console.log(response);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API}auth/user/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  window.location.reload();

  return response.data;
};

const logout = () => {
  localStorage.clear();
  window.location.reload();
};
const authServices = {
  register,
  login,
  logout,
};
export default authServices;

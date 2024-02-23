import axios from "axios";

export const API_URL = "http://localhost:5001/api/goals/";
const API = process.env.REACT_APP_API_URL;

const getUserGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API}goal/goals`, config);
  return response.data;
};

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API}goal/goals`, goalData, config);
  // window.location.reload();
  return response.data;
};

const updateGoal = async (goalId, newTask, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + goalId, newTask, config );
  return response.data;
};

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API}goal/goals/${goalId}`, config);
  window.location.reload();
  return response.data;
};

const goalServices = { createGoal, getUserGoals, updateGoal, deleteGoal };
export default goalServices;

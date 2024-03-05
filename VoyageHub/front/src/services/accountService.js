import axios from "axios";

const apiEndpoint = "http://localhost:8000/account";

export const createAccount = async (userData) => {
  try {
    let response = await axios.post(`${apiEndpoint}/createAccount`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const accountService = {
  createAccount,
};

export default accountService;
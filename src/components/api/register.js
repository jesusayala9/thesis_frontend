import axios from "axios";

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/user/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error registrando usuario. Inténtalo de nuevo.");
  }
};

export { registerUser };

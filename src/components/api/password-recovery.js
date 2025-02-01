import axios from "axios";

const passwordRecorvey = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/user/recover-password",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error registrando usuario. Inténtalo de nuevo.");
  }
};

export { passwordRecorvey };

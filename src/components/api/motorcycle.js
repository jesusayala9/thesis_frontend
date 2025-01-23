import axios from "axios";

const motorcycle = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/motorcycle");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las motos.");
  }
};

export { motorcycle };

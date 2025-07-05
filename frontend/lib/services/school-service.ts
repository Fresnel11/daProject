import axios from "axios";
import { API_BASE_URL } from "../config/api-config";

export async function registerSchool(data: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/schools/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erreur lors de l'inscription");
    }
    throw new Error(error.message || "Erreur réseau");
  }
}

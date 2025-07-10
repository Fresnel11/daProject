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

export async function checkEmailExists(email: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/auth/check-email`, {
      params: { email },
    });
    return response.data.exists;
  } catch (error) {
    return false;
  }
}

export async function checkSchoolEmailExists(email: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/schools/check-email`, {
      params: { email },
    });
    return response.data.exists;
  } catch (error) {
    return false;
  }
}

export async function checkSchoolPhoneExists(phone: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/schools/check-phone`, {
      params: { phone },
    });
    return response.data.exists;
  } catch (error) {
    return false;
  }
}

export async function checkSchoolWebsiteExists(website: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/schools/check-website`, {
      params: { website },
    });
    return response.data.exists;
  } catch (error) {
    return false;
  }
}

export async function checkDirectorPhoneExists(phone: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/auth/check-director-phone`, {
      params: { phone },
    });
    return response.data.exists;
  } catch (error) {
    return false;
  }
}

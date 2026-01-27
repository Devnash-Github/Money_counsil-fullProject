import axios from "axios";

const API_BASE = "http://localhost:8080/api/v1";

export const analyzeFinances = async (data) => {
  try {
    // Transform data to match Java RequestDTO schema exactly
    const requestPayload = {
      income: data.income,
      expenses: data.expenses,
      debt: data.debt,
      risk: data.risk,
      userType: data.userType,
    };
    
    console.log("Sending payload:", JSON.stringify(requestPayload, null, 2));

    const response = await axios.post(
      `${API_BASE}/ai/analyse`,
       requestPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};


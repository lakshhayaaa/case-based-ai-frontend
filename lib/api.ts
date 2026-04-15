const API_URL = "http://localhost:8000";

export const apiFetch = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`, // 🔥 THIS CONNECTS FE → BE
      }),
      ...options.headers,
    },
  });
};
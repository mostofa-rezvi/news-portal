import axios from "axios";

const API_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const NewsService = {
  getAllNews: async () => {
    const response = await apiClient.get("/news?_sort=id&_order=desc");
    return response.data;
  },
  getNewsById: async (id) => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
  },
  createNews: async (data) => {
    const response = await apiClient.post("/news", data);
    return response.data;
  },
  updateNews: async (id, data) => {
    const response = await apiClient.patch(`/news/${id}`, data);
    return response.data;
  },
  deleteNews: async (id) => {
    const response = await apiClient.delete(`/news/${id}`);
    return response.data;
  },
};

export const UserService = {
  getAllUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },
};

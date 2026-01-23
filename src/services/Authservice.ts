import { api } from "./api";

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });

    const { token, refreshToken, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);

    return response;
  },

  register(name: string, email: string, password: string) {
    return api.post("/auth/register", { name, email, password });
  },

  refresh() {
    return api.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  }
};

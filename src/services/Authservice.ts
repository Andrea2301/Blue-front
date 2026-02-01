import { jwtDecode } from "jwt-decode";
import { api } from "./api";

export interface LoginResponse {
  UserId: string;
  Name: string;
  Email: string;
  Token: string;
}

interface JwtPayload {
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  [key: string]: any;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post("/auth/login", { Email: email, Password: password });

    const data = response.data;
    const token = data.Token || data.token;
    const userId = data.UserId || data.userId;
    const name = data.Name || data.name;
    const userEmail = data.Email || data.email;

    if (!token) {
      throw new Error("Token missing in response");
    }

    // Extract role from JWT since it's not in the DTO
    let role = "";
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
    } catch (e) {
      console.error("Failed to decode token", e);
    }

    localStorage.setItem("token", token);
    // Refresh token is missing in DTO, ignoring for now
    if (role) {
      localStorage.setItem("role", role);
    }

    // Return the DTO structure
    return {
      Token: token,
      UserId: userId,
      Name: name,
      Email: userEmail
    };
  },

  async register(name: string, email: string, password: string) {
    return api.post("/auth/register", { Name: name, Email: email, Password: password });
  },

  async refresh() {
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

import api from "./axios";

export const login = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const logout = (refreshToken: string) => {
  return api.post("/auth/logout", { refreshToken });
};

import api from "@/lib/api";

export const authService = {
  register: (payload: { name: string; email: string; password: string }) =>
    api.post("/auth/register", payload).then((res) => res.data),
  login: (payload: { email: string; password: string }) =>
    api.post("/auth/login", payload).then((res) => res.data),
  me: () => api.get("/auth/me").then((res) => res.data)
};

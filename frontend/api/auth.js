import { api } from "./api";

export const register = (name, phoneNumber, password) =>
  api("/auth/register", "POST", { name, phoneNumber, password });

export const login = (phoneNumber, password) =>
  api("/auth/login", "POST", { phoneNumber, password });

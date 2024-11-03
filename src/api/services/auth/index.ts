import { post } from "../../apiClient";

const signIn = (body: AuthRegisterBody) => {
  return post<unknown, AuthRegisterBody>("/api/v1/auth/register", body);
};

const login = (body: AuthLoginBody) => {
  return post("/api/v1/auth/login", body);
};

export { signIn, login };

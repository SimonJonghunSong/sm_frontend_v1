import { post } from "../../apiClient";

const signIn = (body: AuthRegisterBody) => {
  return post<unknown, AuthRegisterBody>("/api/v1/auth/register", body);
};

const login = (body: AuthLoginBody) => {
  return post("/api/v1/auth/login", body);
};

const findId = (body: AuthFindIdBody) => {
  return post("/api/v1/auth/find-id", body);
};

const findPassword = (body: AuthFindPassBody) => {
  return post("/api/v1/auth/find-pass", body);
};

// { endpoint: "/api/v1/auth/find-id"; method: "POST"; body: AuthFindIdBody }
// | {
//     endpoint: "/api/v1/auth/find-pass";
//     method: "POST";
//     body: AuthFindPassBody;
//   }

export { signIn, login };

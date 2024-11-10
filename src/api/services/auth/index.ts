import { get, post, put } from "../../apiClient";
import { CommonResponse } from "../common/type";

const login = (body: AuthLoginBody) => {
  return post<
    CommonResponse<{
      accessToken: string;
      email: string;
      refreshToken: string;
      role: string;
    }>,
    AuthLoginBody
  >("/api/v1/auth/login", body);
};

const findId = (body: AuthFindIdBody) => {
  return post("/api/v1/auth/find-id", body);
};

const findPassword = (body: AuthFindPassBody) => {
  return post("/api/v1/auth/find-pass", body);
};

const me = () => {
  return get<CommonResponse<{ user: UserResponse }>>("/api/v1/auth/my/account");
};

const modifyMyAccount = (body: AuthMyAccountUpdateBody) => {
  return put<
    {
      response: {
        code: number;
        reaseon: string;
      };
    },
    AuthMyAccountUpdateBody
  >("/api/v1/auth/my/account", body);
};

// { endpoint: "/api/v1/auth/find-id"; method: "POST"; body: AuthFindIdBody }
// | {
//     endpoint: "/api/v1/auth/find-pass";
//     method: "POST";
//     body: AuthFindPassBody;
//   }

export { login, findId, findPassword, me, modifyMyAccount };

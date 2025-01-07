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
  >("/api/v1/auth/login_scuti", body);
};

const logout = () => {
  return post("api/v1/auth/logout_scuti");
};

const findId = (body: AuthFindIdBody) => {
  return post<
    {
      reponse: { code: number; reason: string };
      parameter: { user_id: string };
    },
    AuthFindIdBody
  >("/api/v1/auth/find-id", body);
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

export { login, findId, findPassword, me, modifyMyAccount, logout };

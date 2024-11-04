// URL 타입 정의 (예: localhost:3000/api/v1/ 로 접근하는 경우)
type URLType = {
  sm_local_url: string;
};

// 인증 관련 타입
interface AuthSignupBody {
  userid: string;
  email: string;
  password: string;
  roles: string[];
}

interface AuthSigninBody {
  userid: string;
  password: string;
}

interface AuthRefreshTokenBody {
  refreshToken: string;
}

interface AuthRegisterBody {
  role: string;
  user_id: string;
  email: string;
  name: string;
  password: string;
  country: string;
  affiliation: string;
  department: string;
  tax_id: string;
  alias: string;
  nda_contract_path: string;
  nda_contract_contents: string;
  cmd_list: string[];
  profile: {
    model: string;
    fw_ver: string;
    file_name: string;
    file_contents: string;
  }[];
}

interface AuthLoginBody {
  country: string;
  user_id: string;
  password: string;
}

interface AuthFindIdBody {
  country: string;
  email: string;
}

interface AuthFindPassBody {
  country: string;
  email: string;
}

interface AuthMyAccountUpdateBody {
  email: string;
  name: string;
  password: string;
  country: string;
  affiliation: string;
  department: string;
  tax_id: string;
  alias: string;
  nda_contract_path: string;
  nda_contract_contents: string;
  cmd_list: string[];
  profile: {
    model: string;
    fw_ver: string;
    file_name: string;
    file_contents: string;
  }[];
}

// MQTT 서버 관련 타입
interface MqttServerBody {
  country: string;
  region: string;
  ip: string;
  port: string;
  name: string;
  description: string;
}

interface MqttServerDeleteBody {
  ip: string;
  port: string;
}

// 사용자 역할 정보 타입
interface RoleResponse {
  _id: string;
  name: string;
}

// TODO 사용자 프로필 타입 (미정)
interface ProfileResponse {
  model: string;
  fw_ver: string;
  file_name: string;
  file_contents: string;
}

// 사용자 정보 타입
interface UserResponse {
  _id: string;
  user_id: string;
  email: string;
  name: string;
  affiliation: string;
  alias: string;
  cmd_list: string[];
  country: string;
  department: string;
  nda_contract_path: string;
  nda_contract_contents: string;
  password: string;
  reg_date: string;
  role: RoleResponse;
  tax_id: string;
  profile: ProfileResponse[];
  __v: number;
}

// 타입 정의 예시
type AuthEndpoints =
  | { endpoint: "/api/v1/auth/signup"; method: "POST"; body: AuthSignupBody }
  | { endpoint: "/api/v1/auth/signin"; method: "POST"; body: AuthSigninBody }
  | {
      endpoint: "/api/v1/auth/refreshtoken";
      method: "POST";
      body: AuthRefreshTokenBody;
    }
  | {
      endpoint: "/api/v1/auth/register";
      method: "POST";
      body: AuthRegisterBody;
    }
  | { endpoint: "/api/v1/auth/login"; method: "POST"; body: AuthLoginBody }
  | { endpoint: "/api/v1/auth/find-id"; method: "POST"; body: AuthFindIdBody }
  | {
      endpoint: "/api/v1/auth/find-pass";
      method: "POST";
      body: AuthFindPassBody;
    }
  | {
      endpoint: "/api/v1/auth/my/account";
      method: "PUT";
      body: AuthMyAccountUpdateBody;
    }
  | { endpoint: "/api/v1/auth/my/account"; method: "GET"; params: URLType };

type MqttEndpoints =
  | { endpoint: "/api/v1/mqtt/servers"; method: "POST"; body: MqttServerBody }
  | { endpoint: "/api/v1/mqtt/servers"; method: "GET"; params: URLType }
  | {
      endpoint: "/api/v1/mqtt/servers";
      method: "DELETE";
      body: MqttServerDeleteBody;
    }
  | { endpoint: "/api/v1/mqtt/servers"; method: "PUT"; body: MqttServerBody };

// type ScutiEndpoints =
//   | { endpoint: "/api/v1/scuti/servers"; method: "POST"; body: ScutiServerBody }
//   | { endpoint: "/api/v1/scuti/servers"; method: "GET"; params: URLType }
//   | {
//       endpoint: "/api/v1/scuti/servers";
//       method: "DELETE";
//       body: ScutiServerDeleteBody;
//     }
//   | { endpoint: "/api/v1/scuti/servers"; method: "PUT"; body: ScutiServerBody };

// 통합 API 엔드포인트 타입
type APIEndpoints = AuthEndpoints | MqttEndpoints;

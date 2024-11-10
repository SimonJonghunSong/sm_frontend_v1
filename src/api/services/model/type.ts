// 모델 관련 타입
export interface Model {
  supported_network_type: string[];
  supported_features: string[];
  uid: string;
  image_file: string;
  image_file_small: string;
  dev_name: string;
  fw_ver: string;
  country: Country;
  setting_file: string;
  hide: boolean;
  reg_date: string;
  updated: string;
  model_pkg?: string;
}

export interface Country {
  name: string;
}

export interface AddModelBody {
  image_file: string;
  image_file_small: string;
  dev_name: string;
  fw_ver: string;
  country: string;
  supported_network_type: string[];
  supported_features: string[];
  setting_file: string;
  hide: boolean;
  model_pkg: string;
}

export interface EditModelBody
  extends Omit<AddModelBody, "dev_name" | "fw_ver"> {
  uid: string;
}

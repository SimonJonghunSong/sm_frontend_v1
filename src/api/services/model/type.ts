// 모델 관련 타입
export interface Model {
  supported_network_type: string[];
  supported_features: string[];
  uid: string;
  image_file: string;
  image_file_small: string;
  dev_name: string;
  target_country: string[];
  fw_ver: string;
  country: Country[];
  default_json: string;
  default_profile: string;
  default_csv: string;
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
  dev_name: string;
  fw_ver: string;
  country: string;
  supported_network_type: string[];
  supported_features: string[];
  setting_file: string;
  hide: boolean;
  model_pkg: string;
}

export interface PostModelPkgBody {
  uid_list: string[];
}

export interface EditModelBody
  extends Omit<AddModelBody, "dev_name" | "fw_ver"> {
  uid: string;
}

export interface ModelPkg {
  uid: string;
  dev_name: string;
  fw_ver: string;
  model_pkg: string;
}

export interface ModelConfig {
  no: number;
  Depth2: string;
  Depth3: string;
  TEXT_EN: string;
  TEXT_ES: string;
  TEXT_PT: string;
  UI_INPUT_TYPE?: string;
  DEFAULT_VALUE?: string;
  TEXT_EN_ITEM_CONTENT?: string;
  TEXT_ES_ITEM_CONTENT?: string;
  TEXT_PT_ITEM_CONTENT?: string;
  TEXT_EN_INFO?: string;
  TEXT_ES_INFO?: string;
  TEXT_PT_INFO?: string;
  JSON_ID?: string;
  DEFAULT_VAL_INDEX?: string;
  TEXT_EN_ERR?: string;
  TEXT_ES_ERR?: string;
  TEXT_PT_ERR?: string;
  required?: string;
  VALUE_MAX?: string;
  VALUE_MIN?: string;
  ONOFF_TOGGLE?: string;
  hdr?: string;
}

export interface ModelConfigWithData extends ModelConfig {
  value?: string;
}

export interface UserBody {
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

export interface User {
  affiliation: string;
  alias: string;
  cmd_list: string[];
  country: string;
  department: string;
  email: string;
  name: string;
  nda_contract_contents: string;
  nda_contract_path: string;
  profile: [];
  reg_date: string;
  role: { name: string };
  tax_id: string;
  user_id: string;
}

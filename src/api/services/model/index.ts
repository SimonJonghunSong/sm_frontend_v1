import {
  Model,
  ModelConfig,
  ModelPkg,
  PostModelPkgBody,
} from "@/src/api/services/model/type";
import { get, post, put, del } from "../../apiClient";

const getModels = () => {
  return get<{ count: number; records: Model[] }>("/api/v1/models");
};

const addModel = (body: FormData) => {
  return post("/api/v1/model", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const editModel = (body: FormData) => {
  return put("/api/v1/model", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const delModel = (uid_list: string[]) => {
  return del("/api/v1/models", { uid_list });
};

const getModelPkg = (body: PostModelPkgBody) => {
  return post<{ count: number; records: ModelPkg[] }, PostModelPkgBody>(
    "/api/v1/models_load_pkg",
    body
  );
};

const getModelConfig = () => {
  return post<
    {
      response: { code: string; reason: string };
      result: {
        records: ModelConfig[];
      };
    },
    { model_name: string; model_version: string }
  >("/api/v1/model_cfg_load_model", {
    model_name: "ST8300",
    model_version: "0.7",
  });
};
const getModelConfigMenuSectionList = () => {
  return post<
    {
      response: { code: string; reason: string };
      result: {
        menuSectionList: ModelConfig[];
      };
    },
    { model_name: string; model_version: string }
  >("/api/v1/model_cfg_menu_section_list", {
    model_name: "ST8300",
    model_version: "0.7",
  });
};
const getModelConfigMenuContents = (menu: string) => {
  return post("/api/v1/model_cfg_menu_contents", {
    model_name: "ST8300",
    model_version: "0.7",
    menu,
  });
};

export {
  getModels,
  addModel,
  editModel,
  delModel,
  getModelPkg,
  getModelConfig,
  getModelConfigMenuSectionList,
  getModelConfigMenuContents,
};

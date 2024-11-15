import {
  AddModelBody,
  EditModelBody,
  Model,
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

export { getModels, addModel, editModel, delModel, getModelPkg };

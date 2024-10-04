import { AxiosResponse } from "axios";
import httpInstance from "./axiosConfig";
/**
 *
 * @param url
 * @param params
 * @type T => Response Type
 * @type ParamsType => Params Type
 * @returns
 */
const get = <T, ParamsType>(url: string, params?: ParamsType) =>
  httpInstance.get<T, AxiosResponse<T>>(url, { params });
/**
 *
 * @param url
 * @param data
 * @type T => Response Type
 * @type RequestDataTypes => Reqeust Data Type
 * @returns
 */
const post = <T, RequestDataType>(url: string, data?: RequestDataType) =>
  httpInstance.post<T, AxiosResponse<T>, RequestDataType>(url, data);

/**
 *
 * @param url
 * @param data
 * @type T => Response Type
 * @type RequestDataTypes => Reqeust Data Type
 * @returns
 */
const put = <T, RequestDataType>(url: string, data?: RequestDataType) =>
  httpInstance.put<T, AxiosResponse<T>, RequestDataType>(url, data);

/**
 *
 * @param url
 * @param data
 * @type T => Response Type
 * @type RequestDataTypes => Reqeust Data Type
 * @returns
 */
const del = <T>(url: string) => httpInstance.delete<T, AxiosResponse<T>>(url);

export { get, post, put, del };

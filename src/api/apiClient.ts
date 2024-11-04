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
const get = <T, ParamsType extends {} = {}>(
  url: string,
  params?: ParamsType | void
) => httpInstance.get<T, AxiosResponse<T>>(url, { params });
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
const del = <T, RequestDataType>(url: string, data?: RequestDataType) =>
  httpInstance.delete<T, AxiosResponse<T>>(url, { data });

export { get, post, put, del };

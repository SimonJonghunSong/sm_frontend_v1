export interface CommonResponse<T> {
  paramter: T;
  response: {
    code: number;
    reason: string;
  };
}
export interface CommonGetResponse<T> {
  parameter: T;
  response: {
    code: number;
    reason: string;
  };
}

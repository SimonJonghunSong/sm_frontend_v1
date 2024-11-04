export interface CommonResponse<T> {
  paramter: T;
  response: {
    code: number;
    reason: string;
  };
}

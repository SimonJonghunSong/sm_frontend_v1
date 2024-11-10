export interface CommonResponse<T> {
  parameter: T;
  response: {
    code: number;
    reason: string;
  };
}

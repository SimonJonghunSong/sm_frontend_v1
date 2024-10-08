import { useState } from "react";
import { AxiosError } from "axios";

type ErrorHandler = (error: AxiosError) => void;

interface UseApiRequestOptions {
  onError?: ErrorHandler;
  shouldThrow?: boolean;
}

function useApiRequest(apiFunc: Function, options: UseApiRequestOptions = {}) {
  const { onError, shouldThrow = true } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);

      if (onError) onError(axiosError);
      if (shouldThrow) throw axiosError;
      throw axiosError;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}

export default useApiRequest;

/**
 * 사용법
 // GET 요청 
 * const { request: getRequest } = useApiRequest(() => axios.get<User>('/user/1'));
 * await getRequest(); // 별도의 인수가 필요 없음

 // POST 요청
 * const { request: postRequest } = useApiRequest((url: string, data: object) => axios.post<User>(url, data));
 * await postRequest('/user', { name: 'John' }); // 필요한 인수만 전달 가능
 */

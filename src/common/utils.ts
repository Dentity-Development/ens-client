import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

export const makeRequest = async <T, E>(payload: {
  url: string;
  method?: Method;
  configs?: Omit<AxiosRequestConfig<any>, 'url' | 'method'>;
}): Promise<[AxiosResponse<T> | null, AxiosError<E> | null]> => {
  try {
    const response = await axios.request({
      url: payload.url,
      method: payload.method || 'GET',
      ...payload.configs,
    });
    return [response, null];
  } catch (e) {
    return [null, e as AxiosError<E>];
  }
};

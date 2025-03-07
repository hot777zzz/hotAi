import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface RequestOptions extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

export class HttpService {
  private static baseUrl = "http://localhost:3000";
  private static instance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        timeout: 10000,
        withCredentials: true,
      });

      // 请求拦截器
      this.instance.interceptors.request.use(
        (config) => {
          const requiresAuth = (config as RequestOptions).requiresAuth ?? true;
          if (requiresAuth) {
            const token = localStorage.getItem("token");
            if (!token) {
              return Promise.reject(new Error("未登录或登录已过期"));
            }
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // 响应拦截器
      this.instance.interceptors.response.use(
        (response) => response.data,
        (error) => {
          if (error.response?.status === 401) {
            throw new Error("未登录或登录已过期");
          }
          throw new Error(error.response?.data?.message || "请求失败");
        }
      );
    }
    return this.instance;
  }

  static async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.getInstance().get(endpoint, options);
  }

  static async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.getInstance().post(endpoint, data, options);
  }
}

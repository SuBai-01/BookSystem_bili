//对URL请求的预先拦截处理

import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import { useRouter } from "next/navigation";   //next13+ 必须用下面这个不能是上面的
import {message as AntdMessage} from "antd"

interface AxiosInstanceType extends AxiosInstance {
    get<T = any>(url: string, config?:AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?:AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?:AxiosRequestConfig): Promise<T>;
    options<T = any>(url: string, config?:AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?:any, config?:AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?:any, config?:AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?:any, config?:AxiosRequestConfig): Promise<T>;
}


export const CreateAxiosInstance = (config?: AxiosRequestConfig): AxiosInstanceType => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
  });

  // 请求拦截
  instance.interceptors.request.use(
    function (config) {
      const userStorage = localStorage.getItem("user");
      const token = userStorage ? JSON.parse(userStorage).token : null;
      config.headers["Authorization"] = "Bearer " + token;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 响应拦截
  // instance.interceptors.response.use(
  //   (response) => {
  //     const { status, data } = response as any;
  //     if (status === 200) {
  //       return data;
  //     } else if (status === 401) {
  //       // 如果前端登录没权限，JWT验证后，用户信息存入cookie,若不一致则跳转登录页
  //       if (typeof window !== "undefined") {
  //         alert("登录已过期，请重新登录");
  //         window.location.href = "/login";
  //       }
  //     } else {
  //       AntdMessage.error(data?.message || "服务端异常");
  //     }
  //   },
  //   (error) => {
  //     if (error.response?.status === 500) {
  //       if (typeof window !== "undefined") {
  //         window.location.href = "/login";
  //       }
  //     }
  //     AntdMessage.error(error?.response?.data?.message || "服务端异常");
  //     return Promise.reject(error);
  //   }
  // );

  instance.interceptors.response.use(
    (response) => {
      const { status, data } = response as any;
      if (status === 200) {
        return data;
      }
      return Promise.reject(data);
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 401) {
        // 登录过期
        if (typeof window !== "undefined") {
          AntdMessage.warning("登录已过期，请重新登录");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      } else if (status === 500) {
        AntdMessage.error("服务器错误，请稍后再试");
      } else {
        AntdMessage.error(message || "请求出错");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default CreateAxiosInstance({});
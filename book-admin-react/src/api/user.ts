import qs from "qs";
import request from "@/utils/request";
import {UserType, UserQueryType} from "@/types/user";

// 搜索框搜索时会需要利用穿过来的参数values
export async function getUserList (params?: UserQueryType) {
    //https://mock.apifox.cn/m1/2398938-0-default/api/books?name=xxx&author=xxx&category=xxx
     return request.get(`/api/users?${qs.stringify(params)}`);
}

export async function getUserDetail(id: string) {
     return request.get(`/api/users/${id}`);
}

export async function userAdd(params?: UserType) {
     return request.post(`/api/users`, params);
}

export async function userDelete(id: string) {
     return request.delete(`/api/users/${id}`);
}

export async function userUpdate(id: string, params: UserType) {
     return request.put(`/api/users/${id}`, params);
}

//login function
export async function login(params: Pick<UserType, "name"|"password">) {
     return request.post(`/api/login`, params);
}

export async function logout() {
     return request.get(`/api/logout`);
}

import qs from "qs";
import request from "@/utils/request";
import {CategoryQueryType, CategoryType} from "@/types/category";

// 搜索框搜索时会需要利用穿过来的参数values
export async function getCategoryList (params?: CategoryQueryType) {
    //https://mock.apifox.cn/m1/2398938-0-default/api/books?name=xxx&author=xxx&category=xxx
     return request.get(`/api/categories?${qs.stringify(params)}`);
}

export async function categoryAdd(params?: CategoryType) {
     return request.post("/api/categories", params);
}

export async function categoryDelete(id: string) {
     return request.delete(`/api/categories/${id}`);
}


//这两个是后面node要用

//更新有参数是因为更新提交页面会附带一堆信息，不止是ID
export async function categoryUpdate(id: string , params: CategoryType) {
     return request.put(`/api/categories/${id}`, params);
}

export async function getCategoryDetail(id: string) {
     return request.get(`/api/categories/${id}`);
}
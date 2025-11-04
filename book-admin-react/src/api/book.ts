import qs from "qs";
import {BookQueryType, BookType} from "@/types/book";
import request from "@/utils/request";

// 搜索框搜索时会需要利用穿过来的参数values
export async function getBookList (params?: BookQueryType) {
    //https://mock.apifox.cn/m1/2398938-0-default/api/books?name=xxx&author=xxx&category=xxx
     return request.get(`/api/books?${qs.stringify(params)}`);
}

export async function bookAdd(params: BookType) {
     return request.post("/api/books", params);
}

export async function bookDelete(id: string) {
     return request.delete(`/api/books/${id}`);
}


//这两个是后面node要用

//更新有参数是因为更新提交页面会附带一堆信息，不止是ID
export async function bookUpdate(id: string , params: BookType) {
     return request.put(`/api/books/${id}`, params);
}

export async function getBookDetail(id: string) {
     return request.get(`/api/books/${id}`);
}

//.get  .put  .delete这些接口操作都是在node里面的book.ts里面写
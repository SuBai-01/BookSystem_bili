import qs from "qs";
import {BorrowQueryType, BorrowType} from "@/types/borrow";
import request from "@/utils/request";

// 搜索框搜索时会需要利用穿过来的参数values
export async function getBorrowList (params?: BorrowQueryType) {
    //https://mock.apifox.cn/m1/2398938-0-default/api/Borrows?name=xxx&author=xxx&category=xxx
     return request.get(`/api/borrows?${qs.stringify(params)}`);
}

export async function borrowAdd(params: BorrowType) {
     return request.post("/api/borrows", params);
}

export async function borrowDelete(id: string) {
     return request.delete(`/api/borrows/${id}`);
}

export async function getBorrowDetail(id: string) {
     return request.get(`/api/borrows/${id}`);
}

// export async function borrowUpdate(params: BorrowType) {
//      return request.put("/api/borrows", params);
// }
export async function borrowUpdate(id: string , params: BorrowType) {
     return request.put(`/api/books/${id}`, params);
}

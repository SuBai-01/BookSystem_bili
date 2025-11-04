import {USER_ROLE, USER_SEX, USER_STATUS} from "@/constants/user";

export interface UserQueryType {
    name?: string;
    status?: number;
    current?: number;
    pageSize?: number;
}

//分类添加属性
export interface UserType {
    name: string;
    password: string;
    level: 'on' | 'off';
    nickName: string;
    _id?: string;
    sex: USER_SEX,
    role: USER_ROLE,
    status: USER_STATUS,
}
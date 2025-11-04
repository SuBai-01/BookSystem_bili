//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import UserForm from "@/components/UserForm/page";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getUserDetail} from "@/api/user";

export default function UserAdd() {
  const params = useParams(); // ✅ 获取动态路由参数
  const [data, setData] = useState();
  useEffect(() => {
      if(params.id) {
          getUserDetail(params.id as string).then(res => {
              setData(res.data)
          });
      }
    }, [params.id]);
  return (
    //自定义组件，在book/add  & book/edit 共享    在components/BookForm里面定义
    <UserForm title="用户添加" editData={data}/>
  );
}


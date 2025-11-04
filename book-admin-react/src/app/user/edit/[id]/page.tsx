//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import { getUserDetail } from "@/api/user";
import UserForm from "@/components/UserForm/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserEdit() {
  const params = useParams(); 
    const id = params?.id as string;
  
    const [data, setData] = useState({});
    useEffect(() => {
      const fetch = async() => {
        if (id) {
          //获取列表
          const res = await getUserDetail(id);
          setData(res.data);
        }
      };
      fetch();
    }, [id]);
  return (
    //记住把editData传进去
    <UserForm title="用户编辑" editData={data}/>
  );
}

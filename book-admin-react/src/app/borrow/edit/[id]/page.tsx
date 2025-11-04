//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import BorrowForm from "@/components/BorrowForm/page";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getBorrowDetail} from "@/api/borrow";

export default function BorrowEdit() {
  const params = useParams(); // ✅ 获取动态路由参数
  const [data, setData] = useState();
  useEffect(() => {
      if(params?.id) {
          getBorrowDetail(params?.id as string).then(res => {
              setData(res.data)
          });
      }
    }, [params?.id]);
  return (
    <BorrowForm title="图书编辑" editData={data}/>
  );
}

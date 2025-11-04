//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import { getBookDetail } from "@/api/book";
import BookForm from "@/components/BookForm/page";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function BookEdit() {
  const params = useParams(); 
  const id = params?.id as string;

  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async() => {
      if (id) {
        //获取图书列表
        const res = await getBookDetail(id);
        setData(res.data);
      }
    };
    fetch();
  }, [id]);
  return (
    //自定义组件，在book/add  & book/edit 共享
    <BookForm title="图书编辑" data={data} />
  );
}

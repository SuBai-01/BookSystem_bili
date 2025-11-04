//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import { getCategoryDetail } from "@/api/category";
import CategoryForm from "@/components/CategoryForm/page";
import { CategoryType } from "@/types/category";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryEdit() {
  const params = useParams(); 
  const id = params?.id as string;

  // const [data, setData] = useState({});
  const [data, setData] = useState<CategoryType>({
    _id: '',
    name: '',
    level: 1,
    parent: undefined
  });
  useEffect(() => {
    const fetch = async() => {
      if (id) {
        //获取分类列表
        const res = await getCategoryDetail(id);
        setData(res.data);
      }
    };
    fetch();
  }, [id]);
  return (
    //自定义组件，在book/add  & book/edit 共享
    <CategoryForm title="分类编辑" data={data}/>
  );
}

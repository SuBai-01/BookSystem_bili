//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import CategoryForm from "@/components/CategoryForm/page";

export default function CategoryAdd() {
  return (
    //自定义组件，在book/add  & book/edit 共享    在components/BookForm里面定义
    <CategoryForm title="分类添加"/>
  );
}


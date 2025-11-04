//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import BookForm from "@/components/BookForm/page";

export default function BookAdd() {
  return (
    //自定义组件，在book/add  & book/edit 共享    在components/BookForm里面定义
    <BookForm title="图书添加"/>
  );
}


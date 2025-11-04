//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import BorrowForm from "@/components/BorrowForm/page";

export default function BorrowAdd() {
  return (
    //自定义组件，在book/add  & book/edit 共享    在components/BookForm里面定义
    <BorrowForm title="借阅添加"/>
  );
}


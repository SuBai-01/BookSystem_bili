//App Router 不会识别 /add/index.tsx，因为它只认 page.tsx
"use client";
import Content from "@/components/Content/page";
import {Button, Form, Input, message, Select} from "antd";
import styles from "@/components/BookForm/index.module.css";
import React, {useEffect, useState} from "react";
import {getUserList} from "@/api/user";
import {getBookList} from "@/api/book";
import {getBorrowList} from "@/api/borrow";
import {BorrowType} from "@/types/borrow";
import {borrowAdd, borrowUpdate} from "@/api/borrow";
import {useRouter} from "next/navigation";


export default function BorrowForm({title, editData}: {title: string, editData?: any}) {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);
  // const [borrowList, setBorrowList] = useState([]);
  const [stock, setStock] = useState(0);
  const router=useRouter()

  //borrow/edit 回传的是 editData
  // book/edit  回传的是 data
  useEffect(() => {
    if(editData?._id) {
      // data.category = data.category?._id;
      form.setFieldsValue({
        ...editData, 
        book: editData.book?._id,
        borrowUser: editData.borrowUser,
      });
    }
  }, [editData, form]);


  useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data);
    });
    getBookList().then((res)=> {
      setBookList(res.data);
    });
  }, []);

  const handleFinish= async (values: BorrowType) => {
    try {
      console.log("数据：", editData);
      if (editData?._id) {
        await borrowUpdate(editData?._id, values);
        message.success("编辑成功");
        alert("编辑成功");
      }else {
        await borrowAdd(values);
        message.success("创建成功");
        alert("创建成功");
      }
      message.success("创建成功");
      router.push("/borrow");
    }catch(error) {
      console.log(error);
    }
  };

  const handleBookChange = (value:any, option:any) => {
    setStock(option.stock);  //options 里面有从 bookList 拿到的数据
  };

  return <Content title={title}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item label="书籍名称"
                   name="book"
                   rules={[{
                    required: true,
                    message: "请输入名称",
                  }]}>
          <Select placeholder="请选择"
                  onChange={handleBookChange}
                  options={bookList.map(item => ({label: item.name, value: item._id, stock: item.stock}))}>
          </Select>
        </Form.Item>
        <Form.Item label="借阅用户" name="borrowUser" rules={[{
          required: true,
          message: "请输入作者",
        }]}>
          <Select placeholder="请选择" options={userList.map(item => ({label: item.name, value: item._id}))}>
          </Select>
        </Form.Item>
        <Form.Item label="书籍库存">
          {stock}
        </Form.Item>
        <Form.Item label="" colon={false}>
          <Button size="large" htmlType="submit"
                  type="primary"
                  disabled={!(stock>0)}
                  className={styles.btn}
          >
            创建
          </Button>
        </Form.Item>
      </Form>
  </Content>
}

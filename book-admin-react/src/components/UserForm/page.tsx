//表单布局定义
"use client";
import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, InputNumber, message, Radio, Select} from 'antd';
import { Image } from "antd";
import {bookAdd} from "@/api/book";
import {BookType} from "@/types/book";
import {useRouter} from "next/navigation";
import styles from "./index.module.css";
import Content from "../Content/page";
import {CategoryType} from "@/types/category";
import {getCategoryList} from "@/api/category";
import {UserType} from "@/types/user";
import {userAdd, userUpdate} from "@/api/user";
import {USER_ROLE, USER_SEX, USER_STATUS} from "@/constants/user";


export default function UserForm({
       title,
       editData = {
         sex: USER_SEX.MALE,
         role: USER_ROLE.USER,
         status: USER_STATUS.ON,
       },
}:{
  title: string;
  editData?: Partial<UserType>;
}) {
  const [preview, setPreview] = useState("")
  const [form]=Form.useForm()
  const [categoryList, setCategoryList]=useState<CategoryType[]>([])
  const router=useRouter()

  useEffect( () => {
        if(editData._id) {
          form.setFieldsValue(editData);
        }
    }, [editData, form]);

  const handleFinish = async (values: UserType) => {
    if(editData?._id) {
      await userUpdate(editData._id, values)
      message.success("更新成功");
      alert("更新成功");
    } else {
      await userAdd(values);
      message.success("创建成功");
      alert("创建成功");
    }
    router.push("/user");
  };

  useEffect( () => {
        getCategoryList({all: true}).then((res) => {
            setCategoryList(res.data);
        })
    }, []);

  return (
    <div className={styles.formCenter}>
    <Content title={title}>
      <Form
        form={form}
        initialValues={editData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item label="账号" name="name" rules={[{
          required: true,
          message: "请输入账号",
        }]}>
          <Input placeholder="请输入"/>
        </Form.Item>
        <Form.Item label="名称" name="nickName" rules={[{
          required: true,
          message: "请输入名称",
        }]}>
          <Input placeholder="请输入"/>
        </Form.Item>
        <Form.Item label="性别" name="sex" rules={[{
          required: true,
          message: "请选择性别",
        }]}>
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password placeholder="请输入"/>
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Radio.Group>
            <Radio value="on">启用</Radio>
            <Radio value="off">禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Radio.Group>
            <Radio value="user">用户</Radio>
            <Radio value="admin">管理员</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="" colon={false}>
          <Button size="large" htmlType="submit" type="primary" className={styles.btn}>
            {editData?._id ? "更新用户" : "创建用户"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
    </div>
  );
}


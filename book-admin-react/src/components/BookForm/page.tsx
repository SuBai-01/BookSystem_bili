//表单布局定义
"use client";
import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, InputNumber, message, Select} from 'antd';
import { Image } from "antd";
import {bookAdd, bookUpdate} from "@/api/book";
import {BookType} from "@/types/book";
import {useRouter} from "next/navigation";
import styles from "./index.module.css";
import dayjs from "dayjs";
import Content from "../Content/page";
import {CategoryType} from "@/types/category";
import {getCategoryList} from "@/api/category";

const { TextArea } = Input;

export default function BookForm({title, data}:{title: string; data?: BookType}) {
  const [preview, setPreview] = useState("")
  const [form]=Form.useForm()
  const [categoryList, setCategoryList]=useState<CategoryType[]>([])
  const router=useRouter()

  // book/edit  回传的是 data
  useEffect(() => {
    if(data?._id) {
      // data.category = data.category?._id;
      form.setFieldsValue({
        ...data, 
        publishAt: data.publishAt ? dayjs(data.publishAt) : null,
        category: data.category?._id || null,
      });
    }
  }, [data, form]);

  const handleFinish = async (values: BookType) => {
    if(values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf();
    }
    if(data?._id) {
      //更新图书逻辑待完成
      await bookUpdate(data?._id , values);
    }else {
      await bookAdd(values);
    }
    message.success("创建成功");
    router.push("/book");
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item label="名称" name="name" rules={[{
          required: true,
          message: "请输入名称",
        }]}>
          <Input placeholder="请输入"/>
        </Form.Item>
        <Form.Item label="作者" name="author" rules={[{
          required: true,
          message: "请输入作者",
        }]}>
          <Input placeholder="请输入"/>
        </Form.Item>

        {/* ToDo */}
        <Form.Item label="分类" name="category" rules={[{
          required: true,
          message: "请选择分类",
        }]}>
          <Select placeholder="请选择" options={categoryList.map(item => ({label: item.name, value: item._id}))}>
          </Select>
        </Form.Item>

        {/*这里重写unchange是因为Form.Item内含其他组件时，unchange不能正常触发*/}
        <Form.Item label="封面" name="cover">
          <Input.Group compact>
          <Input
              placeholder="请输入"
              style={{ width: "calc(100% - 63px)" }}
              onChange={(e) => {
                form.setFieldValue("cover",e.target.value);
              }}
          />
          <Button type="primary" onClick={(e) => {
                setPreview(form.getFieldValue("cover"));
              }}>预览</Button>
          </Input.Group>
        </Form.Item>
        { preview && (
        <Form.Item label=" " colon={false}>
          <Image src={preview} width={100} height={100} alt=""/>
        </Form.Item>
        )}
        <Form.Item label="出版日期" name="publishAt">
          <DatePicker placeholder="请选择"/>
        </Form.Item>
        <Form.Item label="库存" name="stock">
          <InputNumber placeholder="请输入"/>
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea rows={4} placeholder="请输入"/>
        </Form.Item>
        <Form.Item label="" colon={false}>
          <Button size="large" htmlType="submit" type="primary" className={styles.btn}>
            {data?._id ? "更新图书" : "创建图书" }
          </Button>
        </Form.Item>
      </Form>
    </Content>
    </div>
  );
}

function fetchData(arg0: any) {
  throw new Error('Function not implemented.');
}


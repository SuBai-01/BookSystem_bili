//表单布局定义
"use client";
import React, {useEffect, useMemo, useState} from 'react';
import {Button, Form, Input, Select} from 'antd';
import {useRouter} from "next/navigation";
import styles from "./index.module.css";
import Content from "../Content/page";
import {categoryAdd, categoryUpdate, getCategoryList} from "@/api/category";
import {CategoryType} from "@/types/category";


const LEVEL = {
    ONE: 1,
    TWO: 2,
};
const LEVEL_OPTIONS = [
    {label:"级别1", value:LEVEL.ONE},
    {label:"级别2", value:LEVEL.TWO},
];

export default function CategoryForm({title, data}:{title: string; data?: CategoryType}) {
  const [form]=Form.useForm()
  const [level, setLevel]=useState(1)
  const [levelOneList, setLevelOneList]=useState<CategoryType[]>([])
  const router=useRouter()

  //update or add
  const handleFinish = async (values: CategoryType) => {
    if(data?._id) {
      await categoryUpdate(data?._id, values);
      alert("更新成功");
    }else{
      await categoryAdd(values);
      // message.success("创建成功");
      alert("创建成功");
    }
    router.push("/category");
  };
  
  useEffect(() => {
    if(data?._id) {
      form.setFieldsValue({...data});
    }
  }, [data, form]);

  useEffect(() => {
    async function fetchData() {
      const res = await getCategoryList({ all:true, level:1});
      setLevelOneList(res.data);
    }
    fetchData();
  }, []);
  const levelOneOptions= useMemo( () => {
    return levelOneList.map((item) => ({
      value: item._id,
      label: item.name,
    }))
  }, [levelOneList]);

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
        <Form.Item label="级别" name="level" rules={[{
          required: true,
          message: "请选择级别",
        }]}>
          <Select
              onChange={(value) => {
                setLevel(value);
              }}
              disabled={!!data?._id}
              options={LEVEL_OPTIONS}
              placeholder="请选择">
          </Select>
        </Form.Item>
        {(level === 2 || data?.level === 2) && (
            <Form.Item label="所属级别" name="parent"
                       rules={[{
                        required: true,
                        message: "请选择所属级别",}]}>
              <Select options={levelOneOptions} placeholder="请选择">
              </Select>
            </Form.Item>
        )}

        <Form.Item label="" colon={false}>
          <Button size="large" htmlType="submit" type="primary" className={styles.btn}>
            {data?._id ? "更新分类" : "创建分类"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
    </div>
  );
}


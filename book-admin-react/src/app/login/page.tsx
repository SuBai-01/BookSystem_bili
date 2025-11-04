"use client";
import styles from "./index.module.css"

import {Button, Form, Input, message} from "antd";
import {login} from "@/api/user";
import {useRouter} from "next/navigation";


export default function Login() {
  const router = useRouter();
  const handleFinish= async (values: {name:string; password:string })=> {
      try {
        const res = await login(values);
        //axios遇到非2**开头的直接抛出异常
        if(res.success) {
          // 保存登录用户信息
          localStorage.setItem("user", JSON.stringify({info: res.data, token: res.token}));
          message.success("登录成功");
          alert("登录成功");
          router.push("/book");
        }
        // else {
        //   // 如果后端返回 success = false，但状态码是 200
        //   alert("登录失败");
        //   message.error(res.message || "登录失败");
        // }
      } catch (err: any) {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 501) {
            alert("用户已被禁用");
            message.error(data.message || "用户已被禁用");
          } else if (status === 500) {
            alert("用户名或密码错误");
            message.error(data.message || "用户名或密码错误");
          } 
          else {
            alert("未知错误，请稍后再试");
            message.error(data.message || "未知错误");
          }
        } 
      }
  };
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>HL图书管理系统</h2>
        <Form onFinish={handleFinish}>
            <Form.Item label="账号" name="name" rules={[{ required: true, message:"请输入账号"}]}>
                <Input placeholder="请输入账号"/>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message:"请输入密码"}]}>
                <Input.Password placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size="large" className={styles.btn}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}

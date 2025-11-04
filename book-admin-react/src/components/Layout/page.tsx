'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';  //头部右边下拉箭头
import { useRouter, usePathname } from "next/navigation";    //高版本要用这个而不是 next/router
import { Breadcrumb, Layout as AntdLayout, Menu, Dropdown, Space } from 'antd';

import styles from "./index.module.css"
import Link from "next/link";
import {logout} from "@/api/user";

const { Header, Content, Sider } = AntdLayout;


// 侧边栏分级设置
const ITEM: MenuProps['items'] = [
  {
    key: 'book',
    label: '图书管理',
    children: [
      { key: '/book', label: '图书列表' },
      { key: '/book/add', label: '图书添加' },
    ],
  },
  {
    key: 'borrow',
    label: '借阅设置',
    children: [
      { key: '/borrow', label: '借阅列表' },
      { key: '/borrow/add', label: '借阅添加' },
    ],
  },
  {
    key: 'category',
    label: '分类管理',
    children: [
      { key: '/category', label: '分类列表' },
      { key: '/category/add', label: '分类添加' },
    ],
  },
  {
    key: 'user',
    label: '用户管理',
    children: [
      { key: '/user', label: '用户列表' },
      { key: '/user/add', label: '用户添加' },
    ],
  },
];


export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ info?: { nickName?: string }; token?: string } | null>(null);
  const handleMenuClick: MenuProps["onClick"]= ({key})=> {
    router.push(key);
  };

  //Header右边身份下拉内容设置
  const USER_ITEMS: MenuProps['items'] = [
    {
      label: <Link href="/user">用户中心</Link>,
      key: '1',
    },
    {
      label: <span onClick={async () => {
        try {
          await logout();
          localStorage.removeItem("user");
          alert("登出成功");
          router.push("/login");
        } catch (err) {
          console.error(err);
          alert("登出失败");
        }
      }}>登出</span>,
      key: '2',
    }
  ];

  const activeMenu=usePathname();

  //区分客户端和服务端
  useEffect(() => {
    if(typeof window !== 'undefined') {
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
          setUser(JSON.parse(userStorage));
      }
    }
  }, []);


  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      {/* 顶部 Header */}
      <Header style={{ display: 'flex', alignItems: 'center' }} className={styles.header}>
              <Image src="/logo1.jpg" width={45} height={45} alt="logo" className={styles.logo}/>
              HL图书管理系统
        <span className={styles.user}>
            <Dropdown menu={{ items: USER_ITEMS }}>
              <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {user?.info?.nickName ? user?.info?.nickName : "用户名"}
                    <DownOutlined />
                  </Space>
              </a>
            </Dropdown>
        </span>
      </Header>

      {/* 主体布局：Sider + Content */}
      <AntdLayout className={styles.sectionInner}>
        <Sider width={200}>
          <Menu mode="inline" selectedKeys={[activeMenu]} defaultSelectedKeys={['/book']} defaultOpenKeys={['book']} style={{ height: '100%', paddingTop: 35}} items={ITEM} onClick={handleMenuClick} />
        </Sider>

        <Content className={styles.sectionContent} >
          {/*  页面路径提示，辅助导航 */}
          <Breadcrumb style={{ margin: '0 0 16px 0' }} />
          <div className={styles.content}>
            {children}
          </div>
        </Content>
      </AntdLayout>

    </AntdLayout>
  );
}

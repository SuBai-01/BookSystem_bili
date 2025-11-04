"use client";

import "./globals.css";
import "antd/dist/reset.css"
import {Layout} from "@/components/Layout/page";
import { usePathname } from "next/navigation";


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname();
    return (
        //如果是登录路由，不用渲染外层layout布局，直接显示login下面的界面
        <html lang="zh-CN">
          <body>
            {pathname === "/login" ? children : <Layout>{children}</Layout>}
          </body>
        </html>
    )

}



// <html lang="zh-CN">
//       <head>
//         {/* 这里可以放一些全局 meta、link、script */}
//       </head>
//       <body>
//         {/* 页面内容 */}
//         <main>{children}</main>
//       </body>
// </html>
"use client";
import {
    Button,
    Col,
    Form,
    Input,
    message,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    TablePaginationConfig,
    Tag,
} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import styles from "./index.module.css"
import dayjs from "dayjs";
import {userDelete, getUserList, userUpdate} from "@/api/user";
import {UserQueryType} from "@/types/page";
import Content from "@/components/Content/page";

const STATUS = {
    ON: "on",
    OFF: "off",
};
const STATUS_OPTIONS = [
    {label:"正常", value:STATUS.ON},
    {label:"禁用", value:STATUS.OFF},
];


// 表格标题
const COLUMNS = [
  {
    title: '账号',
    dataIndex: 'name',
    key: 'name',
    width: 180
  },
  {
    title: '用户名',
    dataIndex: 'nickName',
    key: 'nickName',
    width: 180
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render:(text: string) => {
        return text === STATUS.ON ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag>;
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD')
  },
];


export default function User() {
    const [form] = Form.useForm()  //有中括号是因为要对返回结果进行解构赋值
    const router=useRouter()
    // 分页变量值定义
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current:1,
        pageSize:20,
        showSizeChanger:true,
        total:0
    })
    //替换成mock数据
    const [data, setData] = useState([])
    //刷新请求数据
    async function fetchData(values?: UserQueryType)
    {
        const res = await getUserList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...values, //搜索栏框里的数据
        })
        const {data} = res
        setData(data)
        setPagination({...pagination, total:res.total})
    }
    // useEffect是当浏览器页面渲染结束后执行
    useEffect( () => {
        fetchData();
    }, []);

    //点击搜索时应该要拿到表单里的值
    const handleSearchFinish = async (values: UserQueryType) => {
        // console.log(values)
        const res = await getUserList({...values, current:1, pageSize:pagination.pageSize})
        setData(res.data)
        setPagination({...pagination, current: 1,pageSize: pagination.pageSize})
    }
    // 搜索框重置
    const handleSearchReset =() => {
        form.resetFields()
    }
    // 表单每行的编辑按钮跳转界面
    const handleUserEdit =(id: string) => {
        router.push(`/user/edit/${id}`)
    }
    // 分页情况改变时触发
    const handleTableChange=(pagination: TablePaginationConfig) => {
        setPagination(pagination)
        const query = form.getFieldsValue()
        getUserList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...query
        })
    }
    //禁用、启用用户状态
    const handleStatusChange = async (row: any) => {
        const status = row.status === STATUS.ON ? STATUS.OFF : STATUS.ON;
        await userUpdate(row._id, {
            ...row,
            status,
        });
        fetchData(form.getFieldsValue());
    }

    // 表单最后增加一列删除、编辑的操作
    const columns = [...COLUMNS,
    {
        title:'操作',key:"action",render:( _: any, row : any) => {
            return <>
                <Button type="link" onClick={() => {
                    handleUserEdit(row._id)
                }}>编辑</Button>

                <Button type="link"
                        danger = {row.status === STATUS.ON ? true : false}
                        onClick={() => {handleStatusChange(row)}}>
                    {row.status === STATUS.ON ? "禁用":"启用"}
                </Button>

                <Popconfirm
                    title="确认删除？"
                    onConfirm={async () => {
                        await userDelete(row._id);
                        message.success("删除成功");
                        alert("删除成功");               // 弹出浏览器提示
                        fetchData(form.getFieldsValue());
                    }}
                    okText="确定"
                    cancelText="取消"
                    okButtonProps={{ danger: true, type: 'primary', size: 'middle' }}
                    cancelButtonProps={{ size: 'middle' }}
                    placement="topRight"
                >
                    <Button type="link" danger>
                        删除
                    </Button>
                </Popconfirm>
            </>
        }
    }
    ]
    return (
    <Content
        title="用户列表"
        operation={
            <Button type="primary" onClick={ ()=> {
                router.push("/user/add");
            }}>
                添加
            </Button>
        }
    >
        <Form
          className={styles.formcss}
          name="search"
          layout="inline"
          form={form}
          onFinish={handleSearchFinish}
          initialValues={{
            name:'', status:''
          }}
        >
        {/* 为了伸缩自适应 */}
        <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="name" label="名称" >
                <Input placeholder="请输入" allowClear/>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="status" label="状态" >
                <Select
                    placeholder="请选择"
                    allowClear
                    showSearch
                    style={{width: 200}}
                    options={STATUS_OPTIONS}/>
              </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                          搜索
                        </Button>
                          <Button htmlType="submit" onClick={handleSearchReset}>
                          清空
                        </Button>
                    </Space>
                </Form.Item>
            </Col>
        </Row>
        </Form>

        <div className={styles.tablewrap}>
        <Table
            dataSource={data}
            columns={columns}
            scroll={{ y: 500 }}  // 表格主体固定高度，超过就出现滚动条
            rowKey="_id"
            onChange={handleTableChange}
            pagination={{...pagination, showTotal:() => `共 ${pagination.total} 条`  }}
        />
        </div>

    </Content>
    )
}

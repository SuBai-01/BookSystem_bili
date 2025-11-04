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
    Tooltip
} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import styles from "./index.module.css"
import dayjs from "dayjs";
import Image from "next/image";
import {bookDelete, getBookList} from "@/api/book";
import {BookQueryType, CategoryType} from "@/types/page";
import Content from "@/components/Content/page";
import {getCategoryList} from "@/api/category";


// 表格标题
const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 180
  },
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    render:(cover:string) => {
        return <Image
            width={150}
            height={150}
            src={
              cover
                ? cover
                : 'https://pic.huitu.com/pic/20221109/2769273_20221109184825653211_0.jpg'
            }
            // src="https://pic.huitu.com/pic/20221109/2769273_20221109184825653211_0.jpg"
            alt="封面"
        />
    }
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 100
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    // render: (category: any) => {
    //   console.log('category text:', category);
    //   return category?.name;
    // }
    render: (category: any) => category?.name || '-'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    width: 200,
    render: (text: string) => {
        return <Tooltip title={text} placement="topLeft">
            {text}
        </Tooltip>
    }
  },
    {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD')
  },
];


export default function Book() {
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
    //搜索框的分类下拉
    const [categoryList, setCategoryList] = useState<CategoryType[]>([])

    //刷新请求数据
    async function fetchData(search?: BookQueryType)
    {
        const res = await getBookList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...search, //搜索栏框里的数据
        })
        const {data} = res
        setData(data)
        setPagination({...pagination, total:res.total})
    }
    // useEffect是当浏览器页面渲染结束后执行
    useEffect( () => {
        fetchData();
        getCategoryList({all: true}).then((res) => {
            setCategoryList(res.data);
        })
    }, []);

    //点击搜索时应该要拿到表单里的值
    const handleSearchFinish = async (values: BookQueryType) => {
        // console.log(values)
        const res = await getBookList({...values, current:1, pageSize:pagination.pageSize})
        setData(res.data)
        // 这里total也要更新，因为搜索结果可能会变化，否则影响下面共多少页的显示
        setPagination({...pagination, current: 1,pageSize: pagination.pageSize, total: res.total})
    }
    // 搜索框重置
    const handleSearchReset =() => {
        form.resetFields()
    }
    // 表单每行的编辑按钮跳转界面   
    const handleBookEdit =(id: string) => {
        if (id) {
          router.push(`/book/edit/${id}`);
        }
    }
    // 分页情况改变时触发
    const handleTableChange=async (pagination: TablePaginationConfig) => {
        setPagination(pagination)
        const query = form.getFieldsValue()
        const res = await getBookList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...query
        })
        setData(res.data);
    }
    // 表单最后增加一列删除、编辑的操作
    const columns = [...COLUMNS,
    {
        title:'操作',key:"action",render:( _: any, row : any) => {
            return <>
                <Button type="link" onClick={() => {
                    handleBookEdit(row._id)
                }}>编辑</Button>
                <Popconfirm
                    title="确认删除？"
                    onConfirm={async () => {
                        await bookDelete(row._id);
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
        title="图书列表"
        operation={
            <Button type="primary" onClick={ ()=> {
                router.push("/book/add");
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
            name:'', author:'', category:'', 
          }}
        >
        {/* 为了伸缩自适应 */}
        <Row gutter={24}>
            <Col span={7}>
              <Form.Item name="name" label="名称" >
                <Input placeholder="请输入" allowClear/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="author" label="作者" >
                <Input placeholder="请输入" allowClear/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="category" label="分类" >
                <Select
                    placeholder="请选择"
                    allowClear
                    showSearch
                    style={{width: 200}}
                    options={categoryList.map(item => ({label: item.name, value: item._id,}))}/>
              </Form.Item>
            </Col>
            <Col span={3}>
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
            // scroll={{ y: 'calc(100vh - 150px)' }}
            rowKey="_id"
            onChange={handleTableChange}
            pagination={{...pagination, showTotal:() => `共 ${pagination.total} 条`  }}
        />
        </div>

    </Content>
    )
}

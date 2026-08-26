import React from 'react';
import { ClusterOutlined, DeploymentUnitOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';
import Link from 'antd/es/typography/Link';

//layout chính
const { Header, Content, Footer, Sider } = Layout;
//thanh menu ngang trên cùng
const items1: MenuProps['items'] = [
  {
    key: '1',

    label: <Link href="/trang-chu">Trang chủ</Link>,
  },
  {
    key: '2',
    label: <Link href="/quan-ly">Quản Lý</Link>,
  },
  {
    key: '3',
    label: <Link href="/bao-cao">Báo Cáo</Link>,
  },
];
interface MainLayoutProps {
  children?: React.ReactNode;
}


<div></div>
const items2: MenuProps['items'] = [
  {

    key: 'a1',
    icon: <UserOutlined />,
    label: 'Quản Lý Sinh Viên',
  },
  {
    key: 'a2',
    icon: <ClusterOutlined />,
    label: 'Quản Lý Giảng Viên',
    // children: [
    //   {
    //     key: '1',
    //     label: 'Danh sách giảng viên',
    //   },
    // ]
  },
  {
    key: 'a3',
    icon: <SolutionOutlined />,
    label: 'Quản Lý Tài Khoản',
    // children: [
    //   {
    //     key: '1',
    //     label: 'Danh sách giảng viên',
    //   },
    // ]
  },
  {
    key: 'a4',
    icon: <DeploymentUnitOutlined />,
    label: 'Phân Quyền',
    // children: [
    //   {
    //     key: '1',
    //     label: 'Danh sách giảng viên',
    //   },
    // ]
  },

]


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const currentYear = new Date().getFullYear();

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight: 50,              // 1. Chiều cao cố định giúp các dòng BẰNG NHAU HOÀN TOÀN
            itemColor: '#1c642c',         // 2. Màu chữ/icon mặc định
            itemSelectedBg: '#73bee0',    // 3. Màu nền dòng đang chọn (ví dụ: xanh nhạt)
            itemSelectedColor: '#051422', // 4. Màu chữ/icon dòng đang chọn
            itemHoverBg: '#b6d7ed',       // 5. Màu nền khi di chuột vào (Hover)
          },
        },
      }}
    >

      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <div style={{ padding: '0 48px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}

          />
          <Layout
            style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}> {children}</Content>
          </Layout>
        </div>
        <Footer style={{ textAlign: 'center' }}>        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
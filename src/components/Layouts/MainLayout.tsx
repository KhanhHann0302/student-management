import React from 'react';
import { ClusterOutlined, DeploymentUnitOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

//layout chính
const { Header, Content, Footer, Sider } = Layout;;
const items1: MenuProps['items'] = [
  {
    key: '1',
    label: 'Trang chủ',
  },
  {
    key: '2',
    label: 'Quản Lý',

  },
  {
    key: '3',
    label: 'Báo Cáo',
  },
];
interface MainLayoutProps {
  children?: React.ReactNode;
}
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
  },
  {
    key: 'a4',
    icon: <DeploymentUnitOutlined />,
    label: 'Phân Quyền',
  },
]
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  //khai báo các Hook điều hướng (Hook là các hàm đặc biệt bắt đầu bằng "use" cho phép móc các tính năng vào vòng đời component mà ko cần viết React Class Component)
  const navigate = useNavigate(); //chuyển hướng trang này sang trang khác mà ko cần tải lại
  const location = useLocation(); //lấy thông tin đường dẫn URL
  const isQuanLy = location.pathname === '/quan-ly'; //kiểm tra link có ko
  const handleMenuClick = ({ key }: { key: string }) => { //xử lý khi bấm menu
    if (key === '1') {
      navigate('/trang-chu');
    }
    if (key === '2') {
      navigate('/quan-ly');
    }
    if (key === '3') {
      navigate('/bao-cao');
    }
  };
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
        <Header style={{ display: 'flex', alignItems: 'center', width: '100%', minWidth: 200, }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items1}
            style={{ flex: 1, minWidth: 100, width: '100%' }}
            onClick={handleMenuClick}
          />
        </Header>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: '100vh', width: '100vw' }}
        >
          {isQuanLy && (
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
          )}
          <Content style={{ padding: '0 24px', minHeight: 280 }}> {children}</Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </ConfigProvider>
  );
};
export default MainLayout;
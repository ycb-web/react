import { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./index.css";
const { Header, Sider, Content } = Layout;

export const Home: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [currentSelectedKeys, setCurrentSelectedKeys] = useState<string[]>([
    useLocation().pathname,
  ]);
  const Navigate = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    setCurrentSelectedKeys([key]);
    Navigate(key);
  };
  return (
    <>
      <Layout className="home-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={handleMenuClick}
            selectedKeys={currentSelectedKeys}
            items={[
              {
                key: "/leaflet",
                icon: <UserOutlined />,
                label: "leaflet",
              },
              {
                key: "/openLayers",
                icon: <VideoCameraOutlined />,
                label: "openLayers",
              },
              // {
              //   key: "3",
              //   icon: <UploadOutlined />,
              //   label: "nav 3",
              // },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;

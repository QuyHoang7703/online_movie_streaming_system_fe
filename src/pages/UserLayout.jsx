import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "@styles/styles.css";
import LoadingComponent from "@context/LoadingComponent";
import UserMenu from "@components/layout/UserMenu";
import { useAuth } from "@context/AuthContext";

const { Header, Sider, Content } = Layout;

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <Layout className="min-h-screen">
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
          >
            <div className="logo p-4 text-xl font-bold text-white">
              {collapsed ? "MS" : "Movie Stream"}
            </div>
            <UserMenu />
          </Sider>
          <Layout>
            <Header className="flex items-center justify-end bg-white p-4 shadow-md">
              <div className="flex items-center gap-2">
                <span>Xin chào, {user?.email || "Người dùng"}</span>
              </div>
            </Header>
            <Content className="m-4 min-h-[280px] bg-white p-4">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Suspense>
    </div>
  );
};

export default UserLayout;

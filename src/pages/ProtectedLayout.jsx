/* eslint-disable no-unused-vars */

import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Spin } from "antd";
import { useState } from "react";
import AdminSidebar from "@components/layout/AdminSidebar";
import AdminHeader from "@components/layout/AdminHeader";
import "@styles/styles.css";
import LoadingComponent from "@context/LoadingComponent";
import { useAuth } from "@context/AuthContext";

const { Content } = Layout;
const ProtectedLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAuthenticated, hasRole, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!isLoading && !isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Kiểm tra quyền admin
    if (!isLoading && !hasRole("ADMIN")) {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, hasRole, navigate, isLoading]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <Layout className="min-h-screen">
          <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout>
            <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Suspense>
    </div>
  );
};
export default ProtectedLayout;

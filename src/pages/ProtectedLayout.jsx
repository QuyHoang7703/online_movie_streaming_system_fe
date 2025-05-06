/* eslint-disable no-unused-vars */

import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Spin } from "antd";

import AdminSidebar from "@components/layout/AdminSidebar";
import AdminHeader from "@components/layout/AdminHeader";
import "@styles/styles.css";
import LoadingComponent from "@context/LoadingComponent";
import { LoadingProvider } from "@context/LoadingContext";
import { useAuth } from "@context/AuthContext";

const { Content } = Layout;
const ProtectedLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const navigate = useNavigate();
  // const { isLoading, hasRole, isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isLoading, isAuthenticated, navigate]);

  // useEffect(() => {
  //   if (!isLoading && !hasRole("ADMIN")) {
  //     navigate("/unauthorized");
  //   }
  // }, [isLoading, hasRole, navigate]);

  // if (isLoading) {
  //   return <LoadingComponent />;
  // }

  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        {/* <LoadingProvider> */}
        <Layout className="min-h-screen">
          <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout>
            <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
        {/* </LoadingProvider> */}
      </Suspense>
    </div>
  );
};
export default ProtectedLayout;

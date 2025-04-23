/* eslint-disable no-unused-vars */
import { saveUserInfo } from "@redux/slides/authSlice";
import { useGetAuthUserQuery } from "@service/rootApi";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Spin } from "antd";

import AdminSidebar from "@components/layout/AdminSidebar";
import AdminHeader from "@components/layout/AdminHeader";
import "@styles/styles.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingComponent from "@context/LoadingComponent";
const { Content } = Layout;
const ProtectedLayout = () => {
  // const navigate = useNavigate();
  // const response = useGetAuthUserQuery();
  // const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  // useEffect(() => {
  //   if (response.error) {
  //     window.location.href = "/login";
  //   }
  //   if (response.isSuccess) {
  //     dispatch(saveUserInfo(response.data.data));
  //   }
  // }, [response, navigate, dispatch]);

  // if (response.isLoading || response.isFetching) {
  //   return <div>Loading...</div>;
  // }
  // <DotLottieReact src="/animation-loading.lottie" loop autoplay />
  // <Spin tip="Loading" size="large" fullscreen="true"></Spin>

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

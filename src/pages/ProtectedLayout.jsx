/* eslint-disable no-unused-vars */
import { saveUserInfo } from "@redux/slides/authSlice";
import { useGetAuthUserQuery } from "@service/rootApi";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";

import AdminSidebar from "@components/layout/AdminSidebar";
import AdminHeader from "@components/layout/AdminHeader";
import "@styles/styles.css";
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

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
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

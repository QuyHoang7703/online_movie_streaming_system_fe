import ScrollToTop from "@components/common/ScrollToTop ";
import UserHeader from "@components/user/layout/UserHeader";
import UserFooter from "@components/user/layout/UserFooter";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const UserLayout = () => {
  return (
    <Layout className="min-h-screen bg-dark-400">
      <ScrollToTop />
      <UserHeader />
      <Content>
        <Outlet />
      </Content>
      <UserFooter />
    </Layout>
  );
};
export default UserLayout;

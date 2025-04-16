import { useGetAuthUserQuery } from "@service/rootApi";
import { Button } from "antd";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { data, isLoading, isFetching } = useGetAuthUserQuery();

  const email = data?.data?.email;

  if (isLoading || isFetching) {
    return <div>Loading...</div>; // hoặc spinner
  }

  if (!email) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1>Home Page</h1>
      <Button className="bg-mainColor">Login</Button>
      <div className="font-bold">Hello, Tailwind!</div>
    </div>
  );
};
export default HomePage;

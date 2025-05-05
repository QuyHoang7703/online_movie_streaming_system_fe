import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useGetAuthUserQuery } from "@service/rootApi";

// Tạo context
export const AuthContext = createContext();

// Hook để sử dụng context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: authData, isLoading } = useGetAuthUserQuery();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    } else if (authData?.data?.userInfo) {
      setUser(authData.data.userInfo);
    }
  }, [userInfo, authData]);

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // Giá trị được cung cấp thông qua context
  const value = {
    user,
    isAuthenticated,
    hasRole,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// HOC bảo vệ route dựa trên quyền
export const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// HOC bảo vệ route dựa trên role
export const RequireRole = ({ children, allowedRoles }) => {
  const { hasRole, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasRole(allowedRoles)) {
    // Redirect đến trang không có quyền truy cập
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

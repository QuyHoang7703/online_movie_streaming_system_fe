import { useGetAuthUserQuery } from "@service/rootApi";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: authData, isLoading } = useGetAuthUserQuery();
  const [user, setUser] = useState(null);

  // Set userInfo
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    } else {
      setUser(authData?.userInfo);
    }
  }, [userInfo, authData, setUser]);

  const isAuthenticated = () => {
    if (!user) {
      return false;
    }
    return true;
  };

  // Kiểm tra user hiện tại có role nằm trong required roles không
  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return requiredRole === user.role;
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Tạo HOC để check đã authentication chưa
export const RequireAuth = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Tạo HOC để check permission của Role
export const RequireRole = ({ children, allowedRoles }) => {
  const { hasRole, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading....</div>;
  }

  // Nếu user không tồn tại (logout), redirect về login thay vì unauthorized
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return children;
};

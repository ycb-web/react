import React, { FC, useState } from "react";
import { Link, useNavigate, NavLink, Navigate } from "react-router-dom";
const routerFC: FC = () => {
  const NavigateFun = useNavigate();
  const goHome = () => {
    NavigateFun("/home?id=123");
  };
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <div>router page</div>
      {/* 声明路由 */}
      <Link to="/home">go to home page</Link>
      <NavLink to="openlayers">openlayers</NavLink>
      <div>-----------------</div>
      {/* 命令式跳转 */}
      <button onClick={goHome}>go to home page</button>
      {/* 只要看到这个组件，就执行跳转 */}
      <div>-----------------</div>
      {!isLogin ? <Navigate to="/login" /> : 'login success'}
    </>
  );
};

export default routerFC;

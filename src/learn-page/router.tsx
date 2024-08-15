import React, { FC } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
const routerFC: FC = () => {
  const Navigate = useNavigate();
  const goHome = () => {
    Navigate("/home?id=123");
  };
  return (
    <>
      <div>router page</div>
      {/* 声明路由 */}
      <Link to="/home">go to home page</Link>
      <NavLink to="openlayers">openlayers</NavLink>
      <div>-----------------</div>
      {/* 命令式跳转 */}
      <button onClick={goHome}>go to home page</button>
    </>
  );
};

export default routerFC;

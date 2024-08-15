import {
  Navigate,
  Router,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import RouterPage from "../learn-page/router";
import UseMemoPage from "../learn-page/useMemo";
import UseReducer from "../learn-page/useReducer";
import Memo from "../learn-page/memo";
import OpenLayersPage from "../pages/openlayers";
import LeafletPage from "../pages/leaflet";
import ForwardRef from "../learn-page/forwardRef";
import UseImperativeHandle from "../learn-page/useImperativeHandle";
import HelloWorldClassComponents from "../learn-page/classComponents";
const routes = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to="leaflet" replace />,
      },
      {
        index: true,
        path: "leaflet",
        element: <LeafletPage />,
      },
      {
        // 默认二级路由
        path: "openLayers",
        element: <OpenLayersPage />,
      },
      {
        // 默认二级路由
        path: "helloWorldClassComponents",
        element: <HelloWorldClassComponents />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/routerPage",
    element: <RouterPage />,
  },
  {
    path: "/useMemo",
    element: <UseMemoPage />,
  },
  {
    path: "/UseReducer",
    element: <UseReducer />,
  },
  {
    path: "/Memo",
    element: <Memo />,
  },
  {
    path: "/forwardRef",
    element: <ForwardRef />,
  },
  {
    path: "/useImperativeHandle",
    element: <UseImperativeHandle />,
  },

  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default routes;

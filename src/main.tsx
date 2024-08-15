import { Provider } from "react-redux";
import { store } from "./store";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.js";
import "./assets/normal.css";
import "leaflet/dist/leaflet.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> 检测代码是否规范
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
);

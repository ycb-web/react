/*
 * React Toolkit和React Redux同根同源，可以看做是React Redux的一个打包升级版。它包含了redux-thunk，immer，reselect等包，目的为了解决：
 *   "配置一个 Redux store 过于复杂"
 *   "做任何 Redux 的事情我都需要添加很多包"
 *   "Redux 需要太多的样板代码"
 * */
/*
 * Redux Toolkit的核心API主要是如下几个:
 * configureStore: 包装createStore以提供简化的配置选项和良好的默认值。
 *   它可以自动组合你的 slice reducer，添加你提供 的任何 Redux 中间件，redux-thunk默认包含，并启用 Redux DevTools Extension。
 * createSlice: 接受reducer函数的对象、切片名称和初始状态值，并自动生成切片reducer，并带有相应的actions。
 * createAsyncThunk: 接受一个动作类型字符串和一个返回承诺的函数，并生成一个pending/fulfilled/rejected基于该承诺分 派动作类型的 thunk
 * */
import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// 引入每一个reducer
import appReducer from "./modules/appReducer";

/*
 * configureStore用于创建store对象
 * reducer: 将slice中的reducer可以组成一个对象传入此处;
 * middleware: 可以使用参数，传入其他的中间件(自行了解);
 * devTools: 是否配置devTools工具，默认为true;
 * */
export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  // 配置中间件
  // RTk已经默认使用了redux-thunk,这里不需要额外引入了
  // 如果需要一些自定义的中间件,可以通过调用 getDefaultMiddleware
  // 并将结果包含在返回的中间件数组中
  // 案例中使用了日志的中间件,可以追踪到哪个页面在哪个时候使用了该reducer
  // 并且可以显示调用前的数据状态和调用后的数据状态
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(logger),
  // 例如可以关闭redux-devtool
  devTools: true,
});

// 全局定义 dispatch 和 state 的类型,并导出
// 后面使用过程中直接从该文件中引入,而不需要冲react-redux包中引入
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 主要解决在每次使用 useSelector 和 useDispatch 都要去重新定义 TS 类型的问题
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

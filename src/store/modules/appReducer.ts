import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface ITestSliceData {
  counter: number;
  channelList: any[];
}

const initialState: ITestSliceData = {
  counter: 0,
  channelList: [],
};

/*
 * createSlice主要包含如下几个参数:
 * name:用户标记slice的名词 在之后的redux-devtool中会显示对应的名词;
 * initialState:初始化值 第一次初始化时的值;
 * reducers:相当于之前的reducer函数
 *   对象类型，对象中可以添加很多的函数;
 *   函数类似于redux原来reducer中的一个case语句;
 *   函数的参数:
 *     参数一: state, 当前的state状态
 *     参数二: 传递的actions参数, actions有两个属性, 一个是自动生成的type, 另一个是传递的参数放在payload中;
 * createSlice返回值是一个对象，包含所有的actions;
 * */
// 定义一个切片
const appReducer = createSlice({
  name: "app",
  initialState,
  // 一个包含了action的对象，每一个key都会生成一个actions（相当于原生redux的Switch Case写法）
  reducers: {
    // 定义一个数字递增的actions action.type为 上面的定义的name/和该对象的方法名
    //   即action.type=count/increment
    // 在这里一般都是使用同步的reducer
    // toolkit内部调用了immer包，我们可以直接对state对象做修改，不用解构旧的state
    changeCount: (state, action) => {
      state.counter += action.payload;
    },
    changeChannelList: (state, action) => {
      state.channelList = action.payload;
    },
  },
});

// 导出该action
// 调用切片对象的actions属性可以获得所有在reducers里定义的actions
export const { changeCount, changeChannelList } = appReducer.actions;

export const getChannelList = () => {
  return async (dispatch: any) => {
    const res = await axios.get("https://geek.itheima.net/v1_0/channels");
    dispatch(changeChannelList(res.data.data.channels));
  };
};

// 导出的是 reducer, 用于在 index.js 中对 reducer 进行组合
export default appReducer.reducer;

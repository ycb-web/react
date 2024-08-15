import React, { useState, memo, FC, useMemo, useCallback } from "react";

const MemSon: FC<{ nums: number[]; onHandleClick: () => void }> = memo(
  ({ nums, onHandleClick }) => {
    console.log("MemSon --->>> render ");
    return (
      <div onClick={onHandleClick}>child fc ---&gt;&gt;&gt; Count: {nums}</div>
    );
  }
);

// 1. 传递一个简单类型的prop prop变化时组件重新渲染

// 2. 传递一个复杂类型的prop 比较的是新值和旧的引用是否相等 当父组件的函数重新执行时，实际上形成的应用变了

// 3.保证引用的稳定 使用useMemo缓存值，使用useCallback缓存函数引用
function App() {
  const [count, setCount] = useState(0);
  console.log("App --->>> render");

  // 子组件不会重新渲染
  const nums = useMemo(() => [1, 2, 3], []);

  // 子组件会重新渲染
  //   const nums = [1, 2, 3];

  // 子组件不会重新渲染
  const handleClick = useCallback(() => {
    console.log("App --- >> props --->>> handleClick");
  }, []);

  return (
    <div>
      <MemSon nums={nums} onHandleClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment{count}</button>
    </div>
  );
}

export default App;

import { useState, useMemo } from "react";

// 计算斐波那契数列之和
function fib(n: number): number {
  console.log("计算函数执行了");
  if (n < 3) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
}

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  console.log("组件重新渲染了");

  // 使用 useMemo 来缓存 fib 计算结果
  const memoizedFib = useMemo(() => fib(count1), [count1]);

  return (
    <div className="App">
      this is app
      <button onClick={() => setCount1(count1 + 1)}>
        change count1: {count1} (Fib: {memoizedFib})
      </button>
      <button onClick={() => setCount2(count2 + 1)}>
        change count2: {count2}
      </button>
    </div>
  );
}

export default App;

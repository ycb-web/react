// 父组件获取到子组件的内部元素的ref
import React, { useRef, forwardRef, RefObject } from "react";

// 定义一个使用 forwardRef 的子组件
const FancyInput = forwardRef<
  // 第一个参数是返回值的类型，第二个参数是 ref 的类型
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <>
      <input ref={ref} className="fancy-input" {...props} />
    </>
  );
});

FancyInput.displayName = "FancyInput";

const App: React.FC = () => {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const focusInput = () => {
    // 使用 ref 来聚焦输入框
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="App">
      <FancyInput ref={inputRef} placeholder="Type something..." />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
};

export default App;

// 父组件调用子组件内部暴露出来的方法
import React, { useRef, forwardRef, useImperativeHandle, Ref } from "react";

interface FancyInputHandle {
  focusInput: () => void;
}

const FancyInput = forwardRef<
  FancyInputHandle,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (otherInputRef.current) {
      otherInputRef.current.focus();
    }
  };

  useImperativeHandle(ref, () => ({
    focusInput,
  }));

  return (
    <>
      <input ref={inputRef} className="fancy-input" {...props} />
      <input ref={otherInputRef} />
    </>
  );
});

FancyInput.displayName = "FancyInput";

const App: React.FC = () => {
  const fancyInputRef = useRef<FancyInputHandle>(null);

  const handleFocusInput = () => {
    if (fancyInputRef.current) {
      fancyInputRef.current.focusInput();
    }
  };

  return (
    <div className="App">
      <FancyInput ref={fancyInputRef} placeholder="Type something..." />
      <button onClick={handleFocusInput}>Focus the other input</button>
    </div>
  );
};

export default App;

import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { changeCount, getChannelList } from "./store/modules/appReducer";

export const ReduxFC: FC = () => {
  // get
  const { counter, channelList } = useAppSelector((state) => state.app);

  // set
  const dispatch = useAppDispatch();
  const handleChangeCount = (val: number) => {
    dispatch(changeCount(val));
  };

  useEffect(() => {
    dispatch(getChannelList());
  }, []);

  return (
    <div className="test">
      <h1>-----------</h1>
      <div>{counter}</div>
      <h1>-----------</h1>
      <button onClick={() => handleChangeCount(5)}>加5</button>
      <h1>-----------</h1>
      <button onClick={() => handleChangeCount(10)}>加10</button>
      <ul>
        {channelList.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReduxFC;

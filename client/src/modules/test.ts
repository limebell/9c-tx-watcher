import { Dispatch } from "redux";
const INCREASE = "counter/INCREASE" as const; // 추론 방식이 바뀜
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});
// 여러 actions을 한번에 처리할 수 있다.
export const someAction = () => (dispatch: Dispatch) => {
  dispatch({ type: INCREASE });
};

type CounterState = Readonly<{
  count: number;
}>;

// Set app types of actions
// ReturnType<typeof actions>
type Increase = ReturnType<typeof increase>;
type Decrease = ReturnType<typeof decrease>;
type IncreaseBy = ReturnType<typeof increaseBy>;
type CounterActions = Increase | Decrease | IncreaseBy;

const initialState: CounterState = {
  count: 0,
};

// reducer
function counter(
  state: CounterState = initialState,
  action: CounterActions
): CounterState {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + (action as IncreaseBy).payload };
    default:
      return state;
  }
}

export default counter;

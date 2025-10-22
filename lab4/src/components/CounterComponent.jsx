import React, { useReducer } from "react";
import { Card, Button } from "react-bootstrap";

// 1) Trạng thái khởi tạo là một số (đặt trong object để dễ mở rộng)
const initialState = { count: 0 };

// 2) Hàm reducer: increment / decrement / reset
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

// 3) Component sử dụng useReducer để quản lý trạng thái
export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => dispatch({ type: "increment" });
  const decrement = () => dispatch({ type: "decrement" });
  const reset = () => dispatch({ type: "reset" });

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <Card className="p-4 my-3">
      <h4>Bộ Đếm Đa Năng (useReducer)</h4>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>
        Giá trị hiện tại: {state.count}
      </p>

      <div>
        <Button
          onClick={increment}
          style={{ ...buttonStyle }}
          variant="primary"
          className="me-2"
        >
          Tăng (+1)
        </Button>

        <Button
          onClick={decrement}
          style={{ ...buttonStyle }}
          variant="warning"
          className="me-2"
        >
          Giảm (-1)
        </Button>

        <Button onClick={reset} style={{ ...buttonStyle }} variant="danger">
          Reset
        </Button>
      </div>
    </Card>
  );
}

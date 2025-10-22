import React, { useReducer } from "react";
import { Card, Button } from "react-bootstrap";

const initialState = { on: false };

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { on: !state.on };
    case "TURN_ON":
      return { on: true };
    case "TURN_OFF":
      return { on: false };
    default:
      return state;
  }
}

export default function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="p-4 my-3">
      <h4>Toggle (useReducer)</h4>
      <p className="mb-3">Trạng thái hiện tại: <b>{state.on ? "ON" : "OFF"}</b></p>
      <div>
        <Button className="me-2" onClick={() => dispatch({ type: "TOGGLE" })}>Toggle</Button>
        <Button className="me-2" variant="success" onClick={() => dispatch({ type: "TURN_ON" })}>Bật</Button>
        <Button variant="secondary" onClick={() => dispatch({ type: "TURN_OFF" })}>Tắt</Button>
      </div>
    </Card>
  );
}

import React, { useReducer } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";

const initialState = {
  email: "",
  password: "",
  remember: false,
  submitting: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.field]: action.value, error: "" };
    case "SUBMIT":
      return { ...state, submitting: true, error: "" };
    case "SUCCESS":
      return { ...state, submitting: false };
    case "ERROR":
      return { ...state, submitting: false, error: action.message };
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, remember, submitting, error } = state;

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    dispatch({ type: "FIELD", field: name, value: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    if (!email.trim() || !password.trim()) return "Email và mật khẩu là bắt buộc.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Email không hợp lệ.";
    if (password.length < 6) return "Mật khẩu tối thiểu 6 ký tự.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return dispatch({ type: "ERROR", message: msg });

    dispatch({ type: "SUBMIT" });
    // Giả lập gọi API
    setTimeout(() => {
      // Demo: nếu email chứa "fail" => lỗi
      if (email.includes("fail")) {
        dispatch({ type: "ERROR", message: "Đăng nhập thất bại (demo)." });
      } else {
        dispatch({ type: "SUCCESS" });
        alert(`Đăng nhập thành công!\nEmail: ${email}\nRemember: ${remember}`);
      }
    }, 600);
  };

  return (
    <Card className="p-4 my-3">
      <h4>Login (useReducer)</h4>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={email} onChange={onChange} placeholder="you@example.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={password} onChange={onChange} />
        </Form.Group>
        <Form.Check className="mb-3" label="Ghi nhớ đăng nhập" name="remember" checked={remember} onChange={onChange} />
        <Button type="submit" disabled={submitting}>{submitting ? "Đang xử lý..." : "Đăng nhập"}</Button>
      </Form>
    </Card>
  );
}

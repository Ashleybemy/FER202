import React, { useReducer } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirm: "",
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

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, username, password, confirm, submitting, error } = state;

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "FIELD", field: name, value });
  };

  const validate = () => {
    if (!email.trim() || !username.trim() || !password.trim() || !confirm.trim())
      return "Vui lòng điền đầy đủ thông tin.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Email không hợp lệ.";
    if (username.length < 3) return "Username tối thiểu 3 ký tự.";
    if (password.length < 6) return "Mật khẩu tối thiểu 6 ký tự.";
    if (password !== confirm) return "Xác nhận mật khẩu không khớp.";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return dispatch({ type: "ERROR", message: msg });

    dispatch({ type: "SUBMIT" });
    // Giả lập gọi API
    setTimeout(() => {
      dispatch({ type: "SUCCESS" });
      alert(`Đăng ký thành công!\nEmail: ${email}\nUsername: ${username}`);
    }, 600);
  };

  return (
    <Card className="p-4 my-3">
      <h4>Sign Up (useReducer)</h4>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={email} onChange={onChange} placeholder="you@example.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" value={username} onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control name="password" type="password" value={password} onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control name="confirm" type="password" value={confirm} onChange={onChange} />
        </Form.Group>
        <Button type="submit" disabled={submitting}>{submitting ? "Đang xử lý..." : "Đăng ký"}</Button>
      </Form>
    </Card>
  );
}

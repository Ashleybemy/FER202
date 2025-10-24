import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  marginRight: 12,
  textDecoration: "none",
  fontWeight: isActive ? "700" : "400",
  borderBottom: isActive ? "2px solid currentColor" : "none",
});

export default function Navbar() {
  return (
    <nav style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle}>Trang chủ</NavLink>
      <NavLink to="/san-pham" style={linkStyle}>Sản phẩm</NavLink>
      <NavLink to="/lien-he" style={linkStyle}>Liên hệ</NavLink>
    </nav>
  );
}

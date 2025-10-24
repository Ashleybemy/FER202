import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

const linkStyle = ({ isActive }) => ({
  marginRight: 12,
  textDecoration: "none",
  fontWeight: isActive ? "700" : "400",
  borderBottom: isActive ? "2px solid currentColor" : "none",
});

export default function App() {
  console.log("Render App.js (with Router)");
  return (
    <BrowserRouter>
      <nav style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
        <NavLink to="/" style={linkStyle}>Trang chủ</NavLink>
        <NavLink to="/san-pham" style={linkStyle}>Sản phẩm</NavLink>
        <NavLink to="/lien-he" style={linkStyle}>Liên hệ</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/lien-he" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

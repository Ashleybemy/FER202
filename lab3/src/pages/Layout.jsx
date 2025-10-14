// src/pages/Layout.jsx
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import AppNavBar from '../components/NavBar/AppNavBar';
import MyFooter from '../components/Footer/MyFooter';

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavBar />

      <Container className="container-narrow mt-4 flex-grow-1">
        <Outlet /> {/* Nơi render các page con */}
      </Container>

      {/* Footer xuất hiện ở mọi trang */}
      <MyFooter
        author="QuanVM"
        email="quanvuong22122005@gmail.com"
        linkGithub={{ url: "https://github.com/Ashleybemy", label: "Movie Management Project" }}
      />
    </div>
  );
}

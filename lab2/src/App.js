import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import BookTable from "./components/BookTable";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main className="bg-page-dark pb-5">
        <div className="container pt-4">
          <Menu />
          {/* bọc riêng để text trắng nếu muốn */}
          <section className="text-white">
            <BookTable />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}


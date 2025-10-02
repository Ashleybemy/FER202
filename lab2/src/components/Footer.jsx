export default function Footer() {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-3 d-flex flex-column flex-sm-row justify-content-between small">
        <span>© {new Date().getFullYear()} Pizza House</span>
        <div className="d-flex gap-3">
          <a className="link-light text-decoration-none" href="#">Privacy</a>
          <a className="link-light text-decoration-none" href="#">Terms</a>
          <a className="link-light text-decoration-none" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

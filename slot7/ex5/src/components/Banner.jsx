export default function Banner() {
  return (
    <header className="bg-brand-orange text-light sticky-top border-bottom border-2 border-warning-subtle">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-2 gap-2">
        <div className="d-flex align-items-center gap-3">
          <img src="/fpt-logo.png" alt="FPT University" style={{ height: 28 }} />
          <nav className="small d-none d-sm-flex gap-3">
            <a className="link-light text-decoration-none" href="#">Trang chủ (English)</a>
            <a className="link-light text-decoration-none" href="#">Tuyển sinh</a>
            <a className="link-light text-decoration-none" href="#">Sinh viên</a>
          </nav>
        </div>

        <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
          <input className="form-control form-control-sm rounded-pill" type="search" placeholder="Search" />
        </form>
      </div>
    </header>
  );
}

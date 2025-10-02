export default function Header() {
  return (
    <header className="bg-dark navbar-dark sticky-top">
      <nav className="container navbar navbar-expand-md">
        <a className="navbar-brand fw-semibold" href="/">Pizza House</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>

          {/* Search + button */}
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input className="form-control form-control-sm me-2" type="search" placeholder="Search" />
            <button className="btn btn-danger btn-sm">🔍</button>
          </form>
        </div>
      </nav>
    </header>
  );
}

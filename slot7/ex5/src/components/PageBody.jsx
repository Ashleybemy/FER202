export default function PageBody() {
  const students = [
    { photo: '/s1.jpg', code: 'DE190740', name: 'Nguyễn Phước Thiện', province: 'Đà Nẵng' },
    { photo: '/s2.jpg', code: 'DE190747', name: 'Nguyễn Thanh Tân',   province: 'Đà Nẵng' },
    { photo: '/s3.jpg', code: 'DE190516', name: 'Võ Nhật Duy',        province: 'Đà Nẵng' },
    { photo: '/s4.jpg', code: 'DE190584', name: 'Trương Quốc Trường', province: 'Đà Nẵng' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-orange py-4">
        <div className="container">
          <div className="hero-wrap rounded-4 overflow-hidden shadow-soft position-relative">
            <img src="/hero.jpg" alt="Hero" className="w-100 hero-img" />
            <div className="hero-overlay"></div>
            <div className="position-absolute bottom-0 start-0 p-3 p-md-4 text-white">
              <h1 className="h4 h3-md mb-0">Students</h1>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small bg-body-tertiary px-3 py-2 rounded-3 border">
            <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Students</li>
          </ol>
        </nav>
      </div>

      {/* GRID */}
      <div className="container">
        <h2 className="h4 text-center fw-bold mb-4">Students Detail</h2>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {students.map(s => <StudentCard key={s.code} {...s} />)}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-brand-orange text-light mt-5 pt-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <h6 className="fw-bold">Our Address</h6>
              <div className="small opacity-90">
                Km29, đại lộ Thăng Long<br />
                024.7300.1866<br />
                edu@fpt.edu.vn
              </div>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <h6 className="fw-bold">Follow us</h6>
              <div className="small d-flex gap-3 justify-content-md-end">
                <a className="link-light text-decoration-none" href="#">Google</a>
                <span className="opacity-50">•</span>
                <a className="link-light text-decoration-none" href="#">Facebook</a>
                <span className="opacity-50">•</span>
                <a className="link-light text-decoration-none" href="#">LinkedIn</a>
                <span className="opacity-50">•</span>
                <a className="link-light text-decoration-none" href="#">Email</a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-brand-orange-weak text-center text-light small py-2 mt-3">
          © Copyright 2023
        </div>
      </footer>
    </>
  );
}

/* ---- component phụ trong cùng file để khỏi import ---- */
function StudentCard({ photo, code, name, province }) {
  const groupName = `att_${code}`;
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
        <div className="ratio ratio-16x9">
          <img src={photo} alt={name} className="w-100 h-100 object-fit-cover" />
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between small text-secondary">
            <span>{code}</span>
            <span>{province}</span>
          </div>
          <div className="fw-semibold mt-1">{name}</div>

          <div className="d-flex align-items-center gap-4 mt-3 small">
            <label className="d-flex align-items-center gap-2">
              <input type="radio" name={groupName} className="form-check-input" /> Absent
            </label>
            <label className="d-flex align-items-center gap-2">
              <input type="radio" name={groupName} className="form-check-input" defaultChecked /> Present
            </label>
          </div>
        </div>

        <div className="card-footer bg-white border-0 pt-0 pb-4 px-4">
          <button className="btn btn-warning btn-sm rounded-pill px-4">Submit</button>
        </div>
      </div>
    </div>
  );
}

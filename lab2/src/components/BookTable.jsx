export default function BookTable() {
  return (
    <section id="book" className="py-4">
      {/* thêm h4 + fw-bold + text-center; giữ class section-title */}
      <h2 className="h4 fw-bold text-center section-title">Book Your Table</h2>

      <form className="row g-3">
        <div className="col-md-4">
          <label className="visually-hidden">Your Name</label>
          <input type="text" className="form-control form-control-sm" placeholder="Your Name *" required />
        </div>
        <div className="col-md-4">
          <label className="visually-hidden">Your Email</label>
          <input type="email" className="form-control form-control-sm" placeholder="Your Email *" required />
        </div>
        <div className="col-md-4">
          <label className="visually-hidden">Select a Service</label>
          <select className="form-select form-select-sm" defaultValue="">
            <option value="" disabled>Select a Service</option>
            <option>Dine-in</option>
            <option>Birthday</option>
            <option>Corporate</option>
          </select>
        </div>

        <div className="col-12">
          <textarea className="form-control" rows="5" placeholder="Please write your comment"></textarea>
        </div>

        <div className="col-12">
          <button className="btn btn-warning px-4">Send Message</button>
        </div>
      </form>
    </section>
  );
}

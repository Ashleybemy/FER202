const ITEMS = [
  { id: 1, name: "Margherita Pizza", img: "/margherita.jpg", price: 40, sale: 25, badge: "SALE" },
  { id: 2, name: "Mushroom Pizza",   img: "/mushroom.jpg",   price: 25, sale: null, badge: "" },
  { id: 3, name: "Hawaiian Pizza",   img: "/hawaiian.jpg",   price: 10, sale: null, badge: "NEW" },
  { id: 4, name: "Pesto Pizza",      img: "/pesto.jpg",      price: 60, sale: 49, badge: "SALE" },
];

function Price({ price, sale }) {
  return sale ? (
    <div className="small">
      <span className="text-decoration-line-through text-secondary me-1">${price.toFixed(2)}</span>
      <span className="text-warning fw-semibold">${sale.toFixed(2)}</span>
    </div>
  ) : (
    <div className="small text-secondary">${price.toFixed(2)}</div>
  );
}

function Card({ item }) {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm">
        {/* KHUNG TƯƠNG ĐỐI */}
        <div className="position-relative">
          {/* ẢNH là con trực tiếp của .ratio (đúng luật BS) */}
          <div className="ratio ratio-4x3">
            <img
              src={item.img}
              alt={item.name}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* NHÃN đặt ngoài .ratio => không còn bị ép full-size */}
          {item.badge && (
            <span
              className={`promo-badge ${
                item.badge === "NEW" ? "promo-new" : "promo-sale"
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>

        <div className="card-body">
          <h3 className="h6 mb-1 text-dark">{item.name}</h3>
          <Price price={item.price} sale={item.sale} />
        </div>
        <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
          <button className="btn btn-dark w-100 py-1">Buy</button>
        </div>
      </div>
    </div>
  );
}


export default function Menu() {
  return (
    <section id="menu" className="mb-5">
      <h2 className="h4 fw-bold mb-3">Our Menu</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {ITEMS.map(i => <Card key={i.id} item={i} />)}
      </div>
    </section>
  );
}

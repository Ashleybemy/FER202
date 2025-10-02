export default function Hero() {
  return (
    <section className="border-bottom">
      <div className="container-fluid px-0">
        <div className="hero-container">  {/* <-- thêm class này */}
          <img src="/hero.jpg" alt="Neapolitan Pizza"
               className="w-100 hero-img" style={{ objectFit:"cover" }} />
          <div className="hero-gradient"></div>
          <div className="hero-caption text-center">
            <h2 className="h4 text-white mb-1">Neapolitan Pizza</h2>
            <p className="text-white-50 small mb-0">
              If you are looking for traditional Italian pizza, the Neapolitan is the best option!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

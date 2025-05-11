import { Link } from 'react-router-dom';
import '../styles/Home.module.css';

const Home = () => {
  return (
    <div className="video-background-container">
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/video.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="video-overlay"></div>

      <div className="content-over-video container">
        <section className="hero-section text-white text-center py-5 animate-fade-in">
          <h1 className="display-4 fw-bold mb-3">Добро пожаловать в РадиоМаркет!</h1>
          <p className="lead mb-4">Лучший выбор радиоэлектроники и компонентов</p>
          <hr className="my-4 w-25 mx-auto border-light" />
          <p className="mb-4">У нас вы найдете всё для ваших электронных проектов и хобби.</p>
          <Link to="/products" className="btn btn-outline-light btn-lg px-5 rounded-pill shadow-sm hover-grow">
            Смотреть товары
          </Link>
        </section>

        <section className="features-section row g-4 justify-content-center mt-5">
          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0 rounded-4 hover-card">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold">Широкий ассортимент</h5>
                <p className="card-text mt-2 text-muted">
                  Более 10 000 наименований товаров для радиолюбителей и профессионалов.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0 rounded-4 hover-card">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold">Быстрая доставка</h5>
                <p className="card-text mt-2 text-muted">
                  Доставка по всей России от 1 дня. Самовывоз из нашего магазина в Москве.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0 rounded-4 hover-card">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold">Гарантия качества</h5>
                <p className="card-text mt-2 text-muted">
                  Все товары проходят тщательную проверку перед отправкой.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="promo-section my-5">
          <div className="card bg-gradient-primary text-black text-center shadow-lg rounded-4 border-0">
            <div className="card-body py-5">
              <h2 className="fw-bold mb-3">🔥 Специальное предложение!</h2>
              <p className="lead mb-4">При заказе от 5000 ₽ — бесплатная доставка по всей России!</p>
              <Link to="/products" className="btn btn-light btn-lg px-5 rounded-pill shadow-sm">
                Получить выгоду
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
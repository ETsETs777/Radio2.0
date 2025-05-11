const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>О нас</h5>
            <p>РадиоМаркет - лучший магазин радиоэлектроники с 2016 года.</p>
          </div>
          <div className="col-md-4">
            <h5>Контакты</h5>
            <p>Email: Kripost@Gmail.com</p>
            <p>Телефон: 79998778787 </p>
          </div>
          <div className="col-md-4">
            <h5>Адрес</h5>
            <p>Поляковское 5/4</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>
            &copy; {new Date().getFullYear()} РадиоМаркет. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

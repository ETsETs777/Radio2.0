import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!response.ok) throw new Error("Товар не найден");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center my-5">Загрузка...</div>;
  }

  if (!product) {
    return <div className="text-center my-5">Товар не найден</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src={product.image || "https://via.placeholder.com/400x400 "}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="lead">{product.description}</p>
          <h4 className="text-primary">{product.price.toLocaleString()} ₽</h4>
          <p><strong>Категория:</strong> {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
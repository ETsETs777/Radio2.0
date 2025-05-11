import { useState, useEffect } from 'react';
import AddProductForm from '../components/AddProductForm';

const AdminPage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:3001/api/products');
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Панель администратора</h2>
            
            <AddProductForm onProductAdded={fetchProducts} />
            
            <h4 className="mt-5">Список товаров ({products.length})</h4>
            <ul className="list-group">
                {products.map((product) => (
                    <li key={product.id} className="list-group-item">
                        {product.name} - {product.price} ₽
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
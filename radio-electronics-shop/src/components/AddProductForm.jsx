import { useState } from 'react';

const AddProductForm = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Отправка...');

        try {
            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price) 
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage('✅ Товар успешно добавлен!');
                onProductAdded?.(); 
                setFormData({ name: '', description: '', price: '', category: '', image: '' });
            } else {
                setMessage('❌ Ошибка: ' + (result.error || 'Неизвестная ошибка'));
            }
        } catch (error) {
            setMessage('❌ Ошибка сети: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="card p-4 mb-4">
            <h3>Добавить новый товар</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Название</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Описание</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Цена (₽)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Категория</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ссылка на изображение (необязательно)</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Добавить товар
                </button>

                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </form>
        </div>
    );
};

export default AddProductForm;
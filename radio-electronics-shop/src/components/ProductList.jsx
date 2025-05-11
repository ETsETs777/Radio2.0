import ProductCard from './ProductCard'

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {products.map(product => (
        <div key={product.id} className="col">
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
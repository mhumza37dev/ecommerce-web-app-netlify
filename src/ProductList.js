// src/ProductList.js
import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import Notification from './Notification'; // Import the Notification component
import Footer from './Footer';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null); // State for notification
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('./products.json') // Ensure this path is correct
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Call the addToCart function
    setNotification(`Added ${product.name} to cart!`); // Set the notification message

    // Automatically hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Product List</h1>
      <p style={ 
        { color: 'purple',
          fontSize: '24px',
          textAlign: 'center'
         }
    
        }
       > Shop form the very best of quality leather bags </p>
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} /> // Render notification if exists
      )}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer /> {/* Add Footer here */}

    </div>
  );
};

export default ProductList;

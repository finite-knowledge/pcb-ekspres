import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    rating: 0,
    ratingCount: 0,
    stock: 0,
    category: "",
    isOnSale: false,
    salePrice: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    setIsLoading(true);
    try {
      await axios.put(`/api/products/${id}`, updatedProduct);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/products", newProduct);
      setNewProduct({
        name: "",
        price: 0,
        rating: 0,
        ratingCount: 0,
        stock: 0,
        category: "",
        isOnSale: false,
        salePrice: 0,
        description: "",
        image: "",
      });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => updateProduct(product.id, product)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProduct();
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleNewProductChange}
          />
        </label>
        {/* Add similar input fields for other product properties */}
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";

function EditProduct() {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);

    // Lấy thông tin sản phẩm từ API
    const fetchProduct = async () => {
        try {
            const response = await axiosConfig.get(`/api/v1/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            console.error("Error fetching product:", err);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosConfig.put(`/api/v1/products/${id}`, product);
            alert("Product updated successfully!");
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProduct;

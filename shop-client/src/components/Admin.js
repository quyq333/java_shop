import React, { useState } from 'react';

function Admin({ products, setProducts }) {
    const [isEditing, setIsEditing] = useState(null); // Lưu id của sản phẩm đang được chỉnh sửa
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', poster: '' });

    // Thêm sản phẩm mới
    const handleAddProduct = () => {
        if (newProduct.title && newProduct.description && newProduct.price && newProduct.poster) {
            setProducts([{ ...newProduct, id: Date.now(), quantity: 1 }, ...products]);
            setNewProduct({ title: '', description: '', price: '', poster: '' });
        }
    };
    // Cập nhật sản phẩm
    const handleUpdateProduct = (product) => {
        setProducts(products.map((p) =>
            p.id === product.id ? { ...product } : p
        ));
        setIsEditing(null); // Đặt lại trạng thái chỉnh sửa sau khi lưu
    };

    // Xóa sản phẩm
    const handleRemoveProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Cập nhật thông tin sản phẩm khi chỉnh sửa
    const handleInputChange = (e, field) => {
        const updatedProduct = { ...currentProduct, [field]: e.target.value };
        setCurrentProduct(updatedProduct);
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>

            {/* Form thêm sản phẩm */}
            <div className="mb-4">
                <h2>Add New Product</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Product Title"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Product Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.poster}
                        onChange={(e) => setNewProduct({ ...newProduct, poster: e.target.value })}
                    />
                </div>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {/* Danh sách sản phẩm */}
            <h2>Product List</h2>
            <div className="row">
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={product.poster} alt={product.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {isEditing === product.id ? (
                                            <input
                                                type="text"
                                                value={currentProduct?.title || product.title}
                                                onChange={(e) => handleInputChange(e, 'title')}
                                            />
                                        ) : (
                                            product.title
                                        )}
                                    </h5>
                                    <p className="card-text">
                                        {isEditing === product.id ? (
                                            <input
                                                type="text"
                                                value={currentProduct?.description || product.description}
                                                onChange={(e) => handleInputChange(e, 'description')}
                                            />
                                        ) : (
                                            product.description
                                        )}
                                    </p>
                                    <p className="card-text">
                                        <strong>
                                            {isEditing === product.id ? (
                                                <input
                                                    type="number"
                                                    value={currentProduct?.price || product.price}
                                                    onChange={(e) => handleInputChange(e, 'price')}
                                                />
                                            ) : (
                                                product.price
                                            )} VND
                                        </strong>
                                    </p>

                                    {/* Nút Edit và Save */}
                                    <div className="d-flex justify-content-between">
                                        {isEditing === product.id ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleUpdateProduct(currentProduct)}
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-info"
                                                onClick={() => {
                                                    setIsEditing(product.id);
                                                    setCurrentProduct(product); // Lưu sản phẩm đang sửa
                                                }}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRemoveProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Admin;

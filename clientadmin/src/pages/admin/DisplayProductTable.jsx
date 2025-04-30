import React, { useState, useEffect, toast } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/admin-api-service/AdminService";
import EditableImageGallery from "./EditableImageGallery";

const ProductTable = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const { EditProduct, handleToggleProduct, getProductData } = AdminService();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/product");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch products");
  //       }
  //       const data = await response.json();

  //       setProducts(data.data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(editedProduct, "editedProduct");

  const fetchProducts = async () => {
    try {
      const response = await getProductData();

      console.log(response, "response");
      

      setProducts(response.products);
    } catch (error) {}
  };

  const handleEdit = (product) => {
    setEditProductId(product._id); // or product.id depending on your backend
  
    setEditedProduct({
      _id: product._id,                      // Keeping ID for future use
      name: product.name || "",              // Name
      category: product.category?.name || "", // Category name (from nested object)
      price: product.product_price || 0,     // Mapping product_price to price
      salePrice: product.sale_price || 0,    // Mapping sale_price to salePrice
      stock: product.stock || 0,             // Stock
      images: product.images || [],          // Images array
      status: product.isActive || false,     // isActive to status
    });
  
    setIsModalOpen(true);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category submission (Add or Edit)
  const handleSave = async () => {
    try {
      const response = await EditProduct(editedProduct._id, editedProduct);
      setProducts(response.categories);
      setEditProductId(null);
      setIsModalOpen(false);

      //       if (editingCategory) {

      //         const response = await EditCategory(editingCategory._id,categoryData);
      //         setCategories(response.categories)
      //         clearState()

      //       } else {

      //         const response = await AddCategory(categoryData);

      // setCategories(response.categories);
      // clearState();

      //       }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // const handleSave = () => {
  //   setProducts(products.map((product) => (product.id === editProductId ? editedProduct : product)));
  //   setEditProductId(null);
  //   setIsModalOpen(false);
  // };

  const toggleBlock = () => {
    setIsBlocked((prev) => !prev);
  };

  const handleToggle = async (productId) => {
    try {
      console.log();
      
      const response = await handleToggleProduct(productId);
      console.log(response, "response from toggle product");
      setProducts(response?.product);
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border rounded shadow">
            Export
          </button>
          <button className="px-4 py-2 bg-white border rounded shadow">
            Import
          </button>
        </div>
        <Link to="/add-product">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            + Add Product
          </button>
        </Link>
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 shadow rounded">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Sale Price</th>
              <th className="p-3 text-center">Stock</th>
              {/* <th className="p-3 text-center">Status</th> */}
              <th className="p-3 text-center">Actions</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2 text-center">{product?.category?.name}</td>
                  <td className="p-2 text-center">₹{product?.product_price}</td>
                  <td className="p-2 text-center">₹{product?.sale_price}</td>
                  <td className="p-2 text-center">{product?.stock}</td>
                  {/* <td className="p-2 text-center">
                      <span className="px-2 py-1 text-sm bg-green-200 text-green-800 rounded">
                        {product.status}
                      </span>
                    </td> */}
                  <td className="p-2 text-center">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    {/* <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(product.id)}>Delete</button> */}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleToggle(product._id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        product.isActive
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {product.isActive ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-y-auto relative">
      
      {/* Title & Close */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Update Product</h2>
        <button
          className="text-purple-500 text-xl"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">

        

        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="border p-3 w-full rounded text-gray-700"
            placeholder="Product name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            className="border p-3 w-full rounded text-gray-700"
            placeholder="Product category"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="border p-3 w-full rounded text-gray-700"
            placeholder="Product price"
          />
        </div>

        {/* Sale Price */}
        <div>
          <label className="block font-medium">Sale Price</label>
          <input
            type="number"
            name="salePrice"
            value={editedProduct.salePrice}
            onChange={handleChange}
            className="border p-3 w-full rounded text-gray-700"
            placeholder="Discounted price"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={editedProduct.stock}
            onChange={handleChange}
            className="border p-3 w-full rounded text-gray-700"
            placeholder="Available stock"
          />
        </div>

        {/* Product Images */}
        <div>
          <label className="block font-medium">Product Images</label>
          <EditableImageGallery
            images={editedProduct.images}
            onEdit={(index, newFile) => {
              const updatedImages = [...editedProduct.images];
              updatedImages[index] = newFile;
              setEditedProduct((prev) => ({
                ...prev,
                images: updatedImages,
              }));
            }}
            onDelete={(index) => {
              const updatedImages = editedProduct.images.filter((_, i) => i !== index);
              setEditedProduct((prev) => ({
                ...prev,
                images: updatedImages,
              }));
            }}
          />
        </div>

        {/* Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={editedProduct.status || false}
            onChange={(e) =>
              setEditedProduct((prev) => ({
                ...prev,
                status: e.target.checked,
              }))
            }
            className="mr-2"
          />

          



          <label htmlFor="status" className="text-gray-700">
            Published
          </label>
        </div>

      </div>

      

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSave}
        >
          Update Product
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductTable;

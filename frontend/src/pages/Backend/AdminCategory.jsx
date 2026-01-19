import React, { useEffect, useState } from "react";
import Backend from "../../layouts/Backend";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminCategory() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    // API Configuration
    const API_URL = "http://localhost:5000/api/categories";
    const token = localStorage.getItem("token");

    // Headers helper for JWT authentication
    const getHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    });

    // Load data on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(API_URL, { headers: getHeaders() });
            const data = await res.json();

            if (res.ok) {
                setCategories(Array.isArray(data) ? data : []);
            } else {
                toast.error(data.message || "Failed to fetch categories");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Network error: Could not connect to server");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return toast.warning("Category name cannot be empty");

        try {
            if (editingCategoryId === null) {
                // --- ADD NEW CATEGORY ---
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify({ name: categoryName }),
                });
                const result = await res.json();

                if (res.ok) {
                    setCategories([...categories, result]);
                    setCategoryName("");
                    toast.success("New category added!");
                } else {
                    toast.error(result.message || "Error adding category");
                }
            } else {
                // --- UPDATE EXISTING CATEGORY ---
                const res = await fetch(`${API_URL}/${editingCategoryId}`, {
                    method: "PUT",
                    headers: getHeaders(),
                    body: JSON.stringify({ name: categoryName }),
                });
                const updatedCat = await res.json();

                if (res.ok) {
                    setCategories(categories.map((c) => (c._id === updatedCat._id ? updatedCat : c)));
                    setEditingCategoryId(null);
                    setCategoryName("");
                    toast.info("Category updated successfully");
                } else {
                    toast.error(updatedCat.message || "Error updating category");
                }
            }
        } catch (error) {
            toast.error("Server error. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: getHeaders(),
            });

            if (res.ok) {
                setCategories(categories.filter((c) => c._id !== id));
                toast.error("Category removed"); // Using error style for deletion
            } else {
                const result = await res.json();
                toast.error(result.message || "Delete failed");
            }
        } catch (error) {
            toast.error("Error deleting category");
        }
    };

    const handleEditClick = (category) => {
        setCategoryName(category.name);
        setEditingCategoryId(category._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cancelEdit = () => {
        setEditingCategoryId(null);
        setCategoryName("");
    };

    return (
        <Backend>
            <div className="container shadow p-4 border rounded bg-white">
                <h4 className="fw-bold mb-4 text-center">
                    {editingCategoryId ? "Update Category" : "Manage Categories"}
                </h4>

                {/* Form Section */}
                <form className="d-flex mb-4 justify-content-center" onSubmit={handleSubmit}>
                    <input
                        className="form-control w-50 me-3"
                        placeholder="Enter category name..."
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="btn btn-primary px-4">
                        {editingCategoryId ? "Update" : "Add Category"}
                    </button>
                    {editingCategoryId && (
                        <button
                            type="button"
                            className="btn btn-outline-secondary ms-2"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <hr />

                {/* Table Section */}
                <div className="col-lg-8 mx-auto mt-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle border">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: "70%" }}>Category Name</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEditClick(c)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(c._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center text-muted p-4">
                                            No categories found. Start by adding one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Backend>
    );
}

export default AdminCategory;

import React, { useEffect, useState } from "react";
import Backend from "../../layouts/Backend";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminPost() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Form States
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);

    // Image preview modal
    const [previewImage, setPreviewImage] = useState(null);

    const API_URL = "http://localhost:5000/api/posts";
    const CATEGORY_API = "http://localhost:5000/api/categories";
    const token = localStorage.getItem("token");

    const getHeaders = () => ({
        Authorization: `Bearer ${token}`,
    });

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch(API_URL, { headers: getHeaders() });
            const data = await res.json();
            if (res.ok) setPosts(data);
        } catch {
            toast.error("Failed to load posts");
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(CATEGORY_API, { headers: getHeaders() });
            const data = await res.json();
            if (res.ok) setCategories(data);
        } catch {
            toast.error("Failed to load categories");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim() || !selectedCategory) {
            return toast.warning("Please fill in all required fields");
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", selectedCategory._id);
            if (image) formData.append("image", image);

            const res = await fetch(editingPostId ? `${API_URL}/${editingPostId}` : API_URL, {
                method: editingPostId ? "PUT" : "POST",
                headers: getHeaders(),
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                if (!editingPostId) {
                    setPosts([result, ...posts]);
                    toast.success("Post Published Successfully!");
                } else {
                    setPosts(posts.map((p) => (p._id === result._id ? result : p)));
                    toast.info("Post Updated Successfully!");
                    setEditingPostId(null);
                }

                // Reset Form
                setTitle("");
                setContent("");
                setSelectedCategory(null);
                setImage(null);
                if (document.getElementById("postImage")) document.getElementById("postImage").value = "";
            } else {
                toast.error(result.message || "Operation failed");
            }
        } catch {
            toast.error("Server connection error");
        }
    };

    const handleDeletePost = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: getHeaders(),
            });

            if (res.ok) {
                setPosts(posts.filter((p) => p._id !== id));
                toast.error("Post Deleted");
            } else {
                const result = await res.json();
                toast.error(result.message || "Failed to delete post");
            }
        } catch {
            toast.error("Error deleting post");
        }
    };

    const handleEditClick = (post) => {
        setTitle(post.title);
        setContent(post.content);
        const cat = categories.find((c) => c._id === (post.category?._id || post.category));
        setSelectedCategory(cat || null);
        setEditingPostId(post._id);
        setImage(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/400x250?text=No+Image";
        return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
    };

    return (
        <Backend>
            <div className="container py-4">
                {/* --- Form Section --- */}
                <div className="card shadow-sm border-0 rounded-4 mb-5 bg-light">
                    <div className="card-body p-4">
                        <h4 className="fw-bold mb-4">{editingPostId ? "Edit Post" : "Create New Post"}</h4>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-8">
                                <label className="form-label fw-bold">Post Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Headline..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-bold">Category</label>
                                <select
                                    className="form-select"
                                    value={selectedCategory?._id || ""}
                                    onChange={(e) => setSelectedCategory(categories.find(c => c._id === e.target.value))}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-bold">Post Content</label>
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Write your content..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Featured Image</label>
                                <input
                                    type="file"
                                    id="postImage"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <div className="col-md-6 d-flex align-items-end gap-2">
                                <button type="submit" className="btn btn-primary flex-grow-1">
                                    {editingPostId ? "Update Post" : "Publish Post"}
                                </button>
                                {editingPostId && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setEditingPostId(null);
                                            setTitle("");
                                            setContent("");
                                            setSelectedCategory(null);
                                            setImage(null);
                                            if (document.getElementById("postImage")) document.getElementById("postImage").value = "";
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- Posts Grid Section --- */}
                <h4 className="fw-bold mb-4">Posts</h4>
                <div className="row g-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className="col-md-6 col-lg-4" key={post._id}>
                                <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                    <div className="overflow-hidden" style={{ height: "220px" }}>
                                        {/* Clickable Image opens Modal */}
                                        <img
                                            src={getImageUrl(post.image)}
                                            alt={post.title}
                                            className="card-img-top w-100 h-100"
                                            style={{ objectFit: "cover", transition: "transform 0.3s", cursor: "pointer" }}
                                            onClick={() => setPreviewImage(getImageUrl(post.image))}
                                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                        />
                                        <div className="position-absolute top-0 start-0 m-2">
                                            <span className="badge bg-primary shadow-sm">{post.category?.name || "News"}</span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-truncate">{post.title}</h5>
                                        <p className="card-text text-muted small" style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            height: "4.5em"
                                        }}>{post.content}</p>
                                    </div>
                                    <div className="card-footer bg-white border-0 d-flex gap-2 pb-3">
                                        <button className="btn btn-warning btn-sm flex-grow-1" onClick={() => handleEditClick(post)}>Edit</button>
                                        <button className="btn btn-danger btn-sm flex-grow-1" onClick={() => handleDeletePost(post._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center text-muted py-5">
                            <h5>No posts available.</h5>
                        </div>
                    )}
                </div>

                {/* --- Image Preview Modal --- */}
                {previewImage && (
                    <div
                        className="modal show fade d-block"
                        tabIndex="-1"
                        onClick={() => setPreviewImage(null)}
                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="img-fluid rounded"
                                />
                            </div>
                        </div>
                    </div>
                )}

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
            </div>
        </Backend>
    );
}

export default AdminPost;

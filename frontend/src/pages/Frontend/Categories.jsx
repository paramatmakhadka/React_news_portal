import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link
import Frontend from '../../layouts/Frontend';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categories = () => {
    const { cid } = useParams();
    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:5000/api/posts";
    const CATEGORY_API = `http://localhost:5000/api/categories/${cid}`;

    useEffect(() => {
        fetchCategoryData();
    }, [cid]);

    const fetchCategoryData = async () => {
        try {
            setLoading(true);
            // 1. Fetch Posts filtered by category
            const res = await fetch(`${API_URL}?category=${cid}`);
            const postData = await res.json();

            if (res.ok) {
                setPosts(postData);
                // Set name from first post if available
                if (postData.length > 0 && postData[0].category) {
                    setCategoryName(postData[0].category.name);
                }
            }

            // 2. Fetch category details (to get name even if 0 posts)
            const catRes = await fetch(CATEGORY_API);
            if (catRes.ok) {
                const catData = await catRes.json();
                if (catData.name) setCategoryName(catData.name);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Could not load category information");
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/400x250?text=No+Image";
        return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
    };

    const editorsPick = posts.slice(0, 5);

    return (
        <Frontend>
            <div className="container my-4">
                <div className="row">
                    {/* LEFT CONTENT: Category Feed */}
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-end border-bottom border-dark border-2 mb-4 pb-1">
                            <h3 className="fw-bold m-0 text-uppercase" style={{ letterSpacing: '1px' }}>
                                {categoryName || "Category Feed"}
                            </h3>
                            <span className="text-muted small">{posts.length} Articles</span>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-secondary" role="status"></div>
                            </div>
                        ) : posts.length > 0 ? (
                            <div className="row g-4">
                                {posts.map((post) => (
                                    <div className="col-12" key={post._id}>
                                        <div className="row align-items-start g-3 border-bottom pb-4 mb-2">
                                            <div className="col-md-4">
                                                <Link to={`/post/${post._id}`}>
                                                    <img
                                                        src={getImageUrl(post.image)}
                                                        alt={post.title}
                                                        className="img-fluid rounded shadow-sm w-100"
                                                        style={{ height: '180px', objectFit: 'cover' }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="col-md-8">
                                                <Link to={`/post/${post._id}`} className="text-decoration-none text-dark">
                                                    <h4 className="fw-bold mb-2 hover-title">{post.title}</h4>
                                                </Link>
                                                <p className="text-muted" style={{
                                                    fontSize: '0.9rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: '3',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {post.content}
                                                </p>
                                                <Link to={`/post/${post._id}`} className="btn btn-sm btn-link p-0 text-primary fw-bold text-decoration-none">
                                                    READ FULL STORY →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5 bg-light rounded border">
                                <h5 className="text-muted">No articles found in this category.</h5>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="col-lg-4">
                        <div className="ps-lg-4" style={{ position: "sticky", top: "20px" }}>
                            <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase">
                                • Recommended
                            </h6>
                            {editorsPick.map((post) => (
                                <div className="d-flex gap-3 mb-4 align-items-start" key={post._id}>
                                    <Link to={`/post/${post._id}`}>
                                        <img
                                            src={getImageUrl(post.image)}
                                            alt={post.title}
                                            className="img-fluid rounded"
                                            style={{ width: "80px", height: "60px", objectFit: "cover" }}
                                        />
                                    </Link>
                                    <Link to={`/post/${post._id}`} className="text-decoration-none text-dark">
                                        <p className="small fw-bold mb-0 hover-title" style={{ lineHeight: '1.3' }}>
                                            {post.title}
                                        </p>
                                    </Link>
                                </div>
                            ))}

                            <div className="bg-dark p-4 text-white text-center rounded mt-5 shadow">
                                <h6 className="fw-bold mb-2">Newsletter</h6>
                                <p className="small mb-3 text-light-50">Stay updated with the latest in {categoryName}.</p>
                                <input type="email" className="form-control form-control-sm mb-2" placeholder="Email Address" />
                                <button className="btn btn-primary btn-sm w-100 fw-bold">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .hover-title:hover { color: #0056b3 !important; transition: 0.2s; cursor: pointer; }
            `}</style>
        </Frontend>
    );
};

export default Categories;
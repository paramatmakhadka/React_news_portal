import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Frontend from "../../layouts/Frontend";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:5000/api/posts";

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (res.ok) {
                setPosts(data);
            } else {
                toast.error("Failed to load posts");
            }
        } catch (error) {
            toast.error("Server error: Could not fetch posts");
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/400x250?text=No+Image";
        return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
    };

    // Logic for Layout sections
    const featuredPost = posts[0];
    const secondaryPosts = posts.slice(1, 5);
    const kathmanduMain = posts.find(p => p.category?.name?.toLowerCase() === 'kathmandu') || posts[5];
    const kathmanduList = posts.filter(p => p.category?.name?.toLowerCase() === 'kathmandu').slice(1, 5);
    const editorsPick = posts.slice(0, 5);

    if (loading) {
        return (
            <Frontend>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            </Frontend>
        );
    }

    return (
        <Frontend>
            <div className="container my-4">
                <div className="row">

                    {/* LEFT CONTENT COLUMN */}
                    <div className="col-lg-8">

                        {/* --- TOP FEATURED SECTION --- */}
                        {featuredPost && (
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <Link to={`/post/${featuredPost._id}`}>
                                        <img
                                            src={getImageUrl(featuredPost.image)}
                                            alt={featuredPost.title}
                                            className="img-fluid w-100 rounded shadow-sm"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                    </Link>
                                </div>
                                <div className="col-md-6 d-flex flex-column justify-content-center">
                                    <Link to={`/post/${featuredPost._id}`} className="text-decoration-none text-dark">
                                        <h2 className="fw-bold hover-title">{featuredPost.title}</h2>
                                    </Link>
                                    <p className="text-muted small">
                                        {featuredPost.content.substring(0, 180)}...
                                    </p>
                                    <Link to={`/post/${featuredPost._id}`} className="btn btn-sm btn-outline-dark align-self-start">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        )}

                        <hr />

                        {/* --- SECONDARY POSTS GRID --- */}
                        <div className="row g-4 mb-5">
                            {secondaryPosts.map((post) => (
                                <div className="col-md-6" key={post._id}>
                                    <div className="d-flex gap-3 align-items-center">
                                        <Link to={`/post/${post._id}`}>
                                            <img
                                                src={getImageUrl(post.image)}
                                                alt={post.title}
                                                className="rounded"
                                                style={{ width: "120px", height: "80px", objectFit: "cover" }}
                                            />
                                        </Link>
                                        <div>
                                            <Link to={`/post/${post._id}`} className="text-decoration-none text-dark">
                                                <h6 className="fw-bold mb-1 line-clamp-2">{post.title}</h6>
                                            </Link>
                                            <small className="text-muted">{post.category?.name}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- KATHMANDU SECTION --- */}
                        <div className="category-section mt-5">
                            <div className="d-flex justify-content-between align-items-end border-bottom border-dark border-2 mb-3 pb-1">
                                <h4 className="fw-bold m-0" style={{ borderBottom: "4px solid #8B8000", marginBottom: "-2px" }}>
                                    Kathmandu
                                </h4>
                                <Link to="/category/kathmandu-id-here" className="btn btn-outline-secondary btn-sm text-uppercase fw-bold" style={{ fontSize: '10px' }}>
                                    More Articles
                                </Link>
                            </div>

                            <div className="row">
                                <div className="col-md-7 border-end">
                                    {kathmanduMain && (
                                        <div className="pe-md-3">
                                            <Link to={`/post/${kathmanduMain._id}`}>
                                                <img
                                                    src={getImageUrl(kathmanduMain.image)}
                                                    className="img-fluid w-100 mb-3 rounded"
                                                    alt="main"
                                                />
                                            </Link>
                                            <Link to={`/post/${kathmanduMain._id}`} className="text-decoration-none text-dark">
                                                <h3 className="fw-bold mb-2">{kathmanduMain.title}</h3>
                                            </Link>
                                            <p className="text-muted small">
                                                {kathmanduMain.content.slice(0, 150)}...
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-5">
                                    <div className="ps-md-2">
                                        {kathmanduList.map((post, index) => (
                                            <div key={post._id} className={`d-flex gap-3 pb-3 mb-3 ${index !== kathmanduList.length - 1 ? 'border-bottom' : ''}`}>
                                                <Link to={`/post/${post._id}`}>
                                                    <img
                                                        src={getImageUrl(post.image)}
                                                        style={{ width: '100px', height: '70px', objectFit: 'cover' }}
                                                        alt="thumb"
                                                        className="rounded"
                                                    />
                                                </Link>
                                                <div>
                                                    <Link to={`/post/${post._id}`} className="text-decoration-none text-dark">
                                                        <h6 className="fw-bold mb-1 small-title">{post.title}</h6>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="col-lg-4">
                        <div className="ps-lg-4" style={{ position: "sticky", top: "20px" }}>
                            <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>
                                • Editor's Pick
                            </h6>
                            {editorsPick.map((post) => (
                                <div className="d-flex gap-3 mb-4 align-items-start" key={post._id}>
                                    <Link to={`/post/${post._id}`}>
                                        <img
                                            src={getImageUrl(post.image)}
                                            alt={post.title}
                                            className="img-fluid rounded"
                                            style={{ width: "90px", height: "65px", objectFit: "cover" }}
                                        />
                                    </Link>
                                    <Link to={`/post/${post._id}`} className="text-decoration-none text-dark flex-grow-1">
                                        <p className="small fw-bold mb-0 lh-sm">
                                            {post.title}
                                        </p>
                                    </Link>
                                </div>
                            ))}

                            <div className="bg-light p-3 mt-5 text-center border">
                                <span className="text-muted small">ADVERTISEMENT</span>
                                <div style={{ height: '250px' }} className="d-flex align-items-center justify-content-center text-muted">
                                    Space for Ad
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CSS for hover effects */}
            <style>{`
                .hover-title:hover { color: #8B8000; transition: 0.3s; }
                .small-title { font-size: 0.85rem; line-height: 1.2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            `}</style>
        </Frontend>
    );
};

export default Homepage;
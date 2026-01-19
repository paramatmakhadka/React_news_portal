import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Frontend from '../../layouts/Frontend';
import { toast } from 'react-toastify';

const Post = () => {
    const { id } = useParams(); // Get ID from URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = `http://localhost:5000/api/posts/${id}`;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                if (res.ok) {
                    setPost(data);
                } else {
                    toast.error("Post not found");
                }
            } catch (err) {
                toast.error("Error fetching post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/800x450";
        return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
    };

    if (loading) return <Frontend><div className="text-center my-5"><div className="spinner-border"></div></div></Frontend>;
    if (!post) return <Frontend><div className="text-center my-5">Post not found.</div></Frontend>;

    return (
        <Frontend>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Category & Date */}
                        <div className="mb-3">
                            <span className="badge bg-primary text-uppercase me-2">{post.category?.name}</span>
                            <small className="text-muted">{new Date(post.createdAt).toLocaleDateString()}</small>
                        </div>

                        {/* Title */}
                        <h1 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>{post.title}</h1>

                        {/* Featured Image */}
                        <img
                            src={getImageUrl(post.image)}
                            alt={post.title}
                            className="img-fluid rounded mb-4 w-100"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />

                        {/* Author Info */}
                        <div className="d-flex align-items-center mb-4 border-bottom pb-3">
                            <div className="fw-bold">By {post.author?.name || "The Himalayan Times"}</div>
                        </div>

                        {/* Content */}
                        <div className="post-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                            {post.content}
                        </div>
                    </div>
                </div>
            </div>
        </Frontend>
    );
};

export default Post;
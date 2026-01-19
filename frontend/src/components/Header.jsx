import React, { useEffect, useState } from "react";
import {
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    FaInstagram,
    FaWhatsapp,
    FaLinkedinIn,
    FaTelegram,
    FaMagnifyingGlass,
    FaBars,
    FaClock
} from "react-icons/fa6";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const CATEGORY_API = "http://localhost:5000/api/categories";

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(CATEGORY_API);
            const data = await res.json();
            if (res.ok) setCategories(data);
            else toast.error("Failed to load categories");
        } catch {
            toast.error("Server error: Could not fetch categories");
        }
    };

    return (
        <>
            <header className="border-bottom">

                {/* Top Utility Bar */}
                <div className="container-fluid py-2 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">

                        {/* Left */}
                        <div className="d-flex align-items-center gap-3">
                            <FaBars />
                            <span className="fw-semibold">MORE</span>
                            <FaClock className="ms-3" />
                            <span>Friday, 16 January 2026</span>
                        </div>

                        {/* Right */}
                        <div className="d-flex align-items-center gap-3">
                            <FaFacebookF />
                            <FaXTwitter />
                            <FaYoutube />
                            <FaInstagram />
                            <FaWhatsapp />
                            <FaLinkedinIn />
                            <FaTelegram />
                            <FaMagnifyingGlass className="ms-3" />
                            <span className="fw-semibold">SEARCH</span>
                        </div>

                    </div>
                </div>

                {/* Logo */}
                <div className="container text-center py-3">
                    <img
                        src="https://www.thehimalayantimes.com/theme_himalayantimes/images/logo.png"
                        alt="Logo"
                        className="w-20"
                    />
                </div>

                {/* Navigation */}
                <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
                    <div className="container">

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mainNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mainNav">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                                {/* Home Link */}
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-3 text-white fw-semibold"
                                        style={{ backgroundColor: "#6a1b9a" }}
                                        href="/"
                                    >
                                        HOME
                                    </a>
                                </li>

                                {/* Dynamic Categories from API */}
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <li className="nav-item" key={cat._id}>
                                            <a
                                                className="nav-link px-3 fw-semibold"
                                                href={`/category/${cat._id}`} // Optional: route to category page
                                            >
                                                {cat.name.toUpperCase()}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li className="nav-item">
                                        <span className="nav-link px-3 fw-semibold text-muted">
                                            Loading categories...
                                        </span>
                                    </li>
                                )}

                            </ul>
                        </div>

                    </div>
                </nav>

            </header>

            <main className="container my-4">
                {children}
            </main>
        </>
    );
};

export default Header;

import React from "react";
import {
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    FaInstagram
} from "react-icons/fa6";

const Footer = ({ children }) => {
    const iconBoxStyle = {
        width: "40px",
        height: "40px",
        border: "1px solid #000",
        transform: "rotate(45deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const iconStyle = {
        transform: "rotate(-45deg)",
        cursor: "pointer"
    };

    return (
        <footer className="border-top mt-5">
            <div className="container text-center py-4">

                {/* Top Links */}
                <ul className="list-inline mb-4">
                    {[
                        "ABOUT US",
                        "PRIVACY POLICY",
                        "ADVERTISE WITH US",
                        "ARCHIVES",
                        "CONTACT US",
                        "E-PAPER"
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="list-inline-item mx-2 fw-semibold"
                            style={{ cursor: "pointer" }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Social Icons */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                    <div style={iconBoxStyle}>
                        <FaFacebookF style={iconStyle} />
                    </div>
                    <div style={iconBoxStyle}>
                        <FaXTwitter style={iconStyle} />
                    </div>
                    <div style={iconBoxStyle}>
                        <FaYoutube style={iconStyle} />
                    </div>
                    <div style={iconBoxStyle}>
                        <FaInstagram style={iconStyle} />
                    </div>
                </div>

                {/* Copyright */}
                <p className="mb-0 fw-semibold">
                    © 2021 The Himalayan Times
                </p>

            </div>
        </footer>
    );
};

export default Footer;

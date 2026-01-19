import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async (data) => {
        setSuccessMsg("");
        setErrorMsg("");

        try {
            // FIX 1: Updated URL to match your server.js route configuration
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // FIX 2: Check if the user is actually an admin
            if (result.role !== "admin") {
                throw new Error("Access denied. You are not an admin.");
            }

            // Save token and user info
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result));

            setSuccessMsg("Admin login successful! Redirecting...");

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1500);

        } catch (error) {
            setErrorMsg(error.message || "Server error. Please try again later.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-5 mx-auto my-5 p-4 shadow bg-white rounded">
                    <h4 className="mb-4 text-center text-primary">Admin Portal</h4>

                    {successMsg && <div className="alert alert-success">{successMsg}</div>}
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Admin Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="form-control"
                                placeholder="admin@example.com"
                                autoFocus
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className="form-control"
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className="btn btn-dark w-100">
                            Enter Dashboard
                        </button>

                        <div className="text-center mt-3">
                            <Link to="/" className="text-decoration-none text-secondary">
                                <small>← Back to Homepage</small>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;
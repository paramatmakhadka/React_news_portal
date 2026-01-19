import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Backend({ children }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate("/admin")
    }

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                {/* Sidebar */}
                <aside className="col-auto p-0">
                    <div
                        className="d-flex flex-column p-3 text-white bg-dark h-100"
                        style={{ width: 280 }}
                    >
                        <span className="fs-4 mb-3">Dashboard</span>
                        <hr />

                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/admin/dashboard">Home</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/admin/category">Category</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/admin/post">Post</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" onClick={handleLogout} to="/admin">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Main content */}
                <main className="col p-4">
                    {children}
                </main>

            </div >
        </div >
    )
}

export default Backend

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Backend from '../../layouts/Backend'

function Dashboard() {

    return (
        <Backend>
            <div className="container px-4 py-5" id="custom-cards">
                <h2 className="pb-2 border-bottom">Welcome to Dashboard</h2>
                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    <div className="col-lg-6">
                        <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: 'url("unsplash-photo-2.jpg")' }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 className="pt-5 mb-4 display-6 lh-1 fw-bold">Manage Categories</h2>
                                <p>Add, edit, or delete categories for your news website.</p>
                                <ul className=" list-unstyled mx-auto">
                                    <li className="mx-auto">
                                        <Link class="btn btn-primary" to="/admin/category" role="button">Categories</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: 'url("unsplash-photo-2.jpg")' }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 className="pt-5 mb-4 display-6 lh-1 fw-bold mx-auto">Manage Posts</h2>
                                <p>Publish or manage your latest news articles easily.</p>
                                <ul className=" list-unstyled mx-auto">
                                    <li className="mx-auto">
                                        <Link class="btn btn-primary" to="/admin/post" role="button">Post</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Backend>
    )
}

export default Dashboard
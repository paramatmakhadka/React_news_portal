import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Frontend Pages
import Home from './pages/Frontend/Homepage'
import Categories from './pages/Frontend/Categories'

// Backend / Admin Pages
import Login from './pages/Backend/Admin'
import AdminRoute from './pages/Backend/AdminRoute'
import Dashboard from './pages/Backend/Dashboard'
import AdminCategory from './pages/Backend/AdminCategory'
import AdminPost from './pages/Backend/AdminPost'
import Post from './pages/Frontend/Post'

function App() {
  return (
    <>
      <Routes>
        {/* Public Frontend Routes */}
        <Route path="/" element={<Home />} />
        {/* This matches the :cid parameter used in your Categories.jsx */}
        <Route path="/category/:cid" element={<Categories />} />

        {/* Admin Login */}
        <Route path="/admin" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path='/admin/dashboard' element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />

        <Route path="/admin/category" element={
          <AdminRoute>
            <AdminCategory />
          </AdminRoute>
        } />

        <Route path="/admin/post" element={
          <AdminRoute>
            <AdminPost />
          </AdminRoute>
        } />

        { /* post route */}
        <Route path="/post/:id" element={<Post />} />

        {/* Fallback for 404 - Optional */}
        <Route path="*" element={<div className="text-center py-5"><h1>404</h1><p>Page Not Found</p></div>} />
      </Routes>
    </>
  )
}

export default App
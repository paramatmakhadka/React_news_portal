import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"


function Frontend({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Frontend
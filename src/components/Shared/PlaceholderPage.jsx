import React from 'react'

const PlaceholderPage = ({ title, description }) => (
    <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-[#9db0b9]">{description}</p>
    </div>
);


export default PlaceholderPage

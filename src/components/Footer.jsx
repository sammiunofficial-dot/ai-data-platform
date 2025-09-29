import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-[#161c1e] border-t border-solid border-t-[#283339]">
        <div className="container mx-auto px-6 py-8 text-center text-[#9db0b9]">
            <p>&copy; {new Date().getFullYear()} CMLRE Data Platform. All rights reserved.</p>
            <p className="text-sm mt-2">A conceptual design for advanced marine data analysis.</p>
        </div>
    </footer>
    </>
  )
}

export default Footer;



import React, { useState } from 'react';
import LogoIcon from '../components/Icons/LogoIcon';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; // Hamburger icons

const Header = ({ setRoute, openRequestModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navLinks = [
    { name: 'Explore Data', route: 'explore' },
    { name: 'Demo', route: 'demo' },
    { name: 'Publications', route: 'publications' },
    { name: 'Fisheries', route: 'fisheries' },
    { name: 'Ocean', route: 'ocean' },
    { name: 'Taxonomy', route: 'taxonomy' },
    { name: 'Otoliths', route: 'otoliths' },
    { name: 'eDNA', route: 'edna' },
    { name: 'Futuretrends', route: 'futuretrends' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#111618]/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4 border-b border-b-[#283339]">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setRoute('home')}>
            <LogoIcon />
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              CMLRE Data Platform
            </h2>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.route}
                className="text-sm font-medium leading-normal hover:text-[#1193d4] transition-colors cursor-pointer"
                onClick={() => setRoute(link.route)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:flex flex min-w-[84px] max-w-[480px] items-center justify-center rounded-md h-10 px-4 bg-[#1193d4] text-white text-sm font-bold hover:bg-opacity-90 transition-all"
              onClick={openRequestModal} // open modal
            >
              Request Access
            </button>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl">
                {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111618]/95 backdrop-blur-md flex flex-col gap-4 py-4">
            {navLinks.map(link => (
              <a
                key={link.route}
                className="text-sm font-medium leading-normal hover:text-[#1193d4] transition-colors cursor-pointer px-4"
                onClick={() => {
                  setRoute(link.route);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
            <button
              className="flex min-w-[84px] max-w-[480px] mx-4 items-center justify-center rounded-md h-10 px-4 bg-[#1193d4] text-white text-sm font-bold hover:bg-opacity-90 transition-all"
              onClick={openRequestModal} // open modal on mobile
            >
              Request Access
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;




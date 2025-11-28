// src/component/layout/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CozyClips from "../../assets/navbar/CozyClips.png"
import MoneyIcon from "../../assets/navbar/moneyIcon.png"
import Profile from "../../assets/navbar/Profile.png"
import { useCoins } from '../../context/CoinsContext.jsx';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const { coins } = useCoins();
    const [open, setOpen] = useState(false);
    return (
        <>
        <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#870022] text-white shadow-lg">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <a href="#">
                        <img src={CozyClips} alt="Brand Logo" className="h-10 sm:h-12 w-auto max-w-full" />
                    </a>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <a
                        href="#"
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors"
                    >
                        Library
                    </a>
                    <a
                        href="#"
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors"
                    >
                        Challenges
                    </a>
                    <button
                        type="button"
                        aria-label="Shop"
                        onClick={() => navigate('/shop')}
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors"
                    >
                        Shop
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center">
                    <button
                        type="button"
                        aria-label="Open menu"
                        className="p-2 rounded-md hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Money Icon with count */}
                    <button
                        type="button"
                        aria-label="Wallet"
                        className="flex items-center space-x-1 px-2 py-1 rounded-md text-white hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98]"
                        onClick={() => navigate('/shop?tab=coins')}
                    >
                        <img src={MoneyIcon} alt="Money" className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
                        <span className="font-medium">{coins.toLocaleString()}</span>
                    </button>

                    {/* Profile Icon (clickable) */}
                    <button
                        type="button"
                        aria-label="Profile"
                        className="flex items-center rounded-full p-0 focus:outline-none focus:ring-2 focus:ring-white/60 hover:opacity-90 active:scale-[0.98]"
                        onClick={() => navigate('/settings/reading-experiences')}
                    >
                        <img src={Profile} alt="Profile" className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover" />
                    </button>
                </div>

            </div>
            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden ${open ? 'block' : 'hidden'} border-t border-white/10`}>
                <div className="px-4 py-2 space-y-1">
                    <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors">Home</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors">Library</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors">Challenges</a>
                    <button
                        type="button"
                        onClick={() => { setOpen(false); navigate('/shop'); }}
                        className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors"
                    >
                        Shop
                    </button>
                </div>
            </div>
        </nav>
        {/* Spacer to offset fixed navbar height */}
        <div className="h-16" aria-hidden="true" />
        </>
    );
}

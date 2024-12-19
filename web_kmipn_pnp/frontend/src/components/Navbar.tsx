'use client';

import { useState } from 'react';
import { Menu, X, Home, MessageSquare, Calendar, List } from 'lucide-react';
import Link from 'next/link';
import { MenuItem } from './navigation/types';
import MobileMenu from './navigation/MobileMenu';
import DesktopMenu from './navigation/DesktopMenu';
import LoginButton from './navigation/LoginButton';

const menuItems: MenuItem[] = [
    {
        href: '/#home',
        label: 'Home',
        icon: <Home className="w-4 h-4" /> // Ikon untuk halaman utama 
    },
    {
        href: '/#sambutan',
        label: 'Sambutan',
        icon: <MessageSquare className="w-4 h-4" /> // Ikon untuk sambutan (pesan atau ucapan) 
    },
    {
        href: '/#timeline',
        label: 'Timeline',
        icon: <Calendar className="w-4 h-4" /> // Ikon untuk timeline (jadwal atau urutan waktu) 
    },
    {
        href: '/#kategori',
        label: 'Kategori',
        icon: <List className="w-4 h-4" /> // Ikon untuk kategori (daftar kategori kompetisi) 
    },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-screen top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                KMIPN VII
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <DesktopMenu menuItems={menuItems} />
                        <div className="ml-4">
                            <LoginButton />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <LoginButton />
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 
                hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileMenu
                isOpen={isOpen}
                menuItems={menuItems}
                onItemClick={() => setIsOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
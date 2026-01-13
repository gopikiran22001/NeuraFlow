import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import { HiMenu, HiX } from 'react-icons/hi';


const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10 bg-[#0f172a]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/favicon.png" alt="NeuraFlow" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-2xl font-bold gradient-text">NeuraFlow</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/analyze" className="hover:text-primary transition-colors font-medium">Analyze</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="hover:text-primary transition-colors font-medium">Dashboard</Link>
                                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                    <span className="text-sm opacity-60">Hi, {user.name}</span>
                                    <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-b border-primary/10 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <Link
                            to="/analyze"
                            className="block px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Analyze
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="block px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <div className="pt-4 border-t border-white/10">
                                    <p className="px-3 text-sm opacity-60 mb-2 font-medium">Hi, {user.name}</p>
                                    <Button className="w-full" variant="outline" onClick={handleLogout}>Logout</Button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-3 pt-2">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                                    <Button variant="ghost" className="w-full">Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block">
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

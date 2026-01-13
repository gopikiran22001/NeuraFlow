import React from 'react';
import { Link } from 'react-router-dom';
import NeuraFlowIcon from './NeuraFlowIcon';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <NeuraFlowIcon className="w-8 h-8" />
                            <span className="text-xl font-bold gradient-text">NeuraFlow</span>
                        </Link>
                        <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                            Elevate your career with AI-powered interview preparation.
                            Get deep insights into your resume and dominate your next interview.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full glass border border-white/10 hover:bg-primary/20 transition-all text-slate-400 hover:text-primary">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass border border-white/10 hover:bg-primary/20 transition-all text-slate-400 hover:text-primary">
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass border border-white/10 hover:bg-primary/20 transition-all text-slate-400 hover:text-primary">
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-slate-200">Product</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link to="/analyze" className="hover:text-primary transition-colors">Analyze</Link></li>
                            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-slate-200">Company</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>© 2026 NeuraFlow AI. All rights reserved.</p>
                    <p>Built with ❤️ by the NeuraFlow Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

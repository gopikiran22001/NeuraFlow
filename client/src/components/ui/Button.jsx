import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
    const variants = {
        primary: 'bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] text-white hover:from-[#06b6d4] hover:to-[#2563eb] shadow-lg shadow-cyan-500/30 [&>*]:text-white',
        secondary: 'bg-gradient-to-r from-[#818cf8] to-[#a855f7] text-white hover:from-[#6366f1] hover:to-[#9333ea] shadow-lg shadow-indigo-500/30 [&>*]:text-white',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10',
        ghost: 'text-primary hover:bg-primary/10',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 [&>*]:text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-2.5',
        lg: 'px-8 py-3.5 text-lg',
    };

    return (
        <button
            className={twMerge(
                'rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

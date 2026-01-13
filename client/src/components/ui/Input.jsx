import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ className, label, error, ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium mb-1.5 text-slate-700">{label}</label>}
            <input
                className={twMerge(
                    'w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-slate-400 text-slate-700',
                    error && 'border-red-500 focus:ring-red-500/50',
                    className
                )}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default Input;

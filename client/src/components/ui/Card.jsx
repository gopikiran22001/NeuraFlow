import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={twMerge(
                'glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border border-white/10',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;

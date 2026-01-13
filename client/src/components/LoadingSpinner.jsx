import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
    const sizes = {
        sm: 'w-5 h-5 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div className="flex justify-center items-center py-4">
            <div
                className={`${sizes[size]} rounded-full animate-spin`}
                style={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderTopColor: '#ffffff',
                }}
            />
        </div>
    );
};

export default LoadingSpinner;

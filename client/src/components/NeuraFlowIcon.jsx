import React from 'react';

const NeuraFlowIcon = ({ className = "w-8 h-8" }) => {
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Bottom left node */}
            <circle cx="50" cy="150" r="15" fill="#3B82F6"/>
            {/* Top left node */}
            <circle cx="60" cy="70" r="15" fill="#0EA5E9"/>
            {/* Center node */}
            <circle cx="100" cy="110" r="12" fill="#22D3EE"/>
            {/* Top center node */}
            <circle cx="120" cy="50" r="15" fill="#22D3EE"/>
            {/* Top right node */}
            <circle cx="150" cy="60" r="15" fill="#818CF8"/>
            {/* Bottom center node */}
            <circle cx="110" cy="140" r="12" fill="#60A5FA"/>
            {/* Bottom right node */}
            <circle cx="140" cy="150" r="15" fill="#A78BFA"/>
            
            {/* Connecting lines */}
            <path d="M 60 70 Q 80 90 100 110" stroke="#0EA5E9" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 100 110 Q 110 80 120 50" stroke="#22D3EE" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 120 50 L 150 60" stroke="#60A5FA" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 50 150 Q 75 130 100 110" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 100 110 Q 105 125 110 140" stroke="#22D3EE" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 110 140 L 140 150" stroke="#818CF8" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 50 150 Q 80 145 110 140" stroke="#818CF8" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 110 140 Q 125 145 140 150" stroke="#A78BFA" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 150 60 Q 130 105 110 140" stroke="#A78BFA" strokeWidth="6" fill="none" strokeLinecap="round"/>
            
            {/* Bottom wave */}
            <path d="M 70 170 Q 100 180 130 170" stroke="#22D3EE" strokeWidth="8" fill="none" strokeLinecap="round"/>
        </svg>
    );
};

export default NeuraFlowIcon;

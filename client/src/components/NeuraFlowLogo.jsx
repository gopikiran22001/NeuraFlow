import React from 'react';
import NeuraFlowIcon from './NeuraFlowIcon';

const NeuraFlowLogo = ({ showTagline = false, className = "" }) => {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex items-center gap-3">
                <NeuraFlowIcon className="w-16 h-16" />
                <div className="flex flex-col">
                    <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-[#1e293b]">Neura</span>
                        <span className="text-4xl font-bold text-[#22d3ee]">Flow</span>
                    </div>
                    {showTagline && (
                        <span className="text-sm font-medium text-[#818cf8] tracking-wider uppercase">
                            Where Intelligence Flows
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NeuraFlowLogo;

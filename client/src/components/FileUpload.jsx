import React, { useCallback, useState } from 'react';
import { LuCloudUpload, LuFileText, LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

const FileUpload = ({ onFileSelect, selectedFile, onClear }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelect]);

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    if (selectedFile) {
        return (
            <div className="flex items-center gap-4 p-4 glass border border-cyan/30 rounded-xl bg-gradient-to-r from-cyan/10 to-accent/5">
                <div className="p-3 bg-gradient-to-br from-cyan/20 to-accent/20 rounded-lg text-cyan">
                    <LuFileText size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs opacity-50">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                    onClick={onClear}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-full transition-colors"
                >
                    <LuX size={20} />
                </button>
            </div>
        );
    }

    return (
        <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={twMerge(
                "relative border-2 border-dashed border-cyan/20 rounded-2xl p-10 transition-all duration-300 text-center group cursor-pointer",
                isDragging
                    ? "border-cyan bg-cyan/10 scale-[1.02]"
                    : "hover:border-cyan/40 hover:bg-cyan/5"
            )}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
            />

            <div className="p-4 bg-gradient-to-br from-cyan/20 to-accent/10 rounded-2xl w-fit mx-auto mb-4 text-cyan group-hover:scale-110 group-hover:from-cyan/30 group-hover:to-accent/20 transition-all">
                <LuCloudUpload size={32} />
            </div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan transition-colors">Upload Resume</h3>
            <p className="text-sm opacity-50 mb-4 max-w-xs mx-auto">
                Drag and drop your resume file here or click to browse (PDF or DOCX max 10MB)
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-cyan/30 rounded-xl text-sm font-medium text-cyan group-hover:bg-cyan/10 transition-colors">
                Choose File
            </div>
        </div>
    );
};

export default FileUpload;

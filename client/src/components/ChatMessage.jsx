import React from 'react';
import ReactMarkdown from 'react-markdown';
import { LuUser, LuBot } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

const ChatMessage = ({ message, isAI }) => {
    return (
        <div className={twMerge(
            "flex gap-5 p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300",
            isAI ? "glass border border-primary/10" : "bg-white/5 border border-white/5"
        )}>
            <div className={twMerge(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
                isAI
                    ? "bg-gradient-to-br from-[#22d3ee] to-[#3b82f6] text-white"
                    : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300"
            )}>
                {isAI ? <LuBot size={24} /> : <LuUser size={24} />}
            </div>

            <div className="flex-1 overflow-hidden">
                {isAI ? (
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => (
                                <h1 className="text-2xl font-bold text-slate-100 mb-6 mt-0 pb-3 border-b-2 border-primary/20" {...props} />
                            ),
                            h2: ({node, ...props}) => (
                                <h2 className="text-xl font-bold text-slate-200 mb-4 mt-8 first:mt-0 flex items-center gap-2 pb-2 border-b border-white/10" {...props} />
                            ),
                            h3: ({node, ...props}) => (
                                <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6" {...props} />
                            ),
                            h4: ({node, ...props}) => (
                                <h4 className="text-base font-semibold text-slate-300 mb-2 mt-4" {...props} />
                            ),
                            p: ({node, ...props}) => (
                                <p className="text-slate-300 leading-relaxed mb-4 text-[15px]" {...props} />
                            ),
                            ul: ({node, ...props}) => (
                                <ul className="space-y-2 mb-5 ml-1" {...props} />
                            ),
                            ol: ({node, ...props}) => (
                                <ul className="space-y-2 mb-5 ml-1" {...props} />
                            ),
                            li: ({node, ...props}) => (
                                <li className="text-slate-300 text-[15px] leading-relaxed pl-2 relative before:content-['•'] before:absolute before:left-[-12px] before:text-primary before:font-bold" {...props} />
                            ),
                            strong: ({node, ...props}) => (
                                <strong className="font-semibold text-slate-100" {...props} />
                            ),
                            em: ({node, ...props}) => (
                                <em className="italic text-slate-400" {...props} />
                            ),
                            code: ({node, inline, ...props}) => 
                                inline ? (
                                    <code className="text-primary bg-primary/10 px-2 py-0.5 rounded text-sm font-mono border border-primary/20" {...props} />
                                ) : (
                                    <code className="block bg-black/30 p-4 rounded-lg text-sm overflow-x-auto font-mono border border-white/10 my-4" {...props} />
                                ),
                            blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-slate-400" {...props} />
                            ),
                            hr: ({node, ...props}) => (
                                <hr className="my-6 border-white/10" {...props} />
                            ),
                        }}
                    >
                        {message}
                    </ReactMarkdown>
                ) : (
                    <p className="whitespace-pre-wrap text-slate-300 text-[15px] leading-relaxed">{message}</p>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;

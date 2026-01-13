import React from 'react';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import { LuHistory } from 'react-icons/lu';

const ChatHistory = ({ history }) => {
    if (!history || history.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((chat) => (
                <Link key={chat._id} to={`/chat/${chat._id}`}>
                    <Card className="group border border-cyan/10 hover:border-cyan/30 h-full flex flex-col card-hover-gradient transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-gradient-to-br from-cyan/10 to-accent/10 rounded-lg text-cyan group-hover:from-cyan group-hover:to-accent group-hover:text-white transition-all">
                                <LuHistory size={20} />
                            </div>
                            <span className="text-xs opacity-40">
                                {new Date(chat.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 className="font-bold mb-2 line-clamp-2 min-h-[3rem] group-hover:text-cyan transition-colors">
                            {chat.title || 'Untitled Session'}
                        </h3>
                        <p className="text-sm opacity-50 line-clamp-2 mb-6 flex-1">
                            {chat.lastMessage || 'No messages yet...'}
                        </p>
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                            <span className="opacity-40 group-hover:text-cyan group-hover:opacity-100 transition-all">View Details</span>
                            <div className="w-8 h-8 rounded-full border border-cyan/20 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-cyan/20 group-hover:border-cyan/40 transition-all text-cyan">
                                →
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default ChatHistory;

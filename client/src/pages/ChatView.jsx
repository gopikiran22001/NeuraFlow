import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { chatAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { LuChevronLeft, LuTrash2, LuFileText, LuMessageSquare, LuSend } from 'react-icons/lu';

const ChatView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [followUp, setFollowUp] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await chatAPI.getChat(id);
                setChat(response.data);
            } catch (error) {
                console.error('Failed to fetch chat:', error);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchChat();
    }, [id, navigate]);

    const handleFollowUp = async (e) => {
        e.preventDefault();
        if (!followUp.trim() || sending) return;

        const userMessage = followUp;
        setFollowUp('');
        setSending(true);

        // Add pending message to UI
        setChat(prev => ({
            ...prev,
            messages: [...prev.messages, { role: 'user', content: userMessage }]
        }));

        try {
            const formData = new FormData();
            formData.append('resume_text', chat.resume_text || '');
            formData.append('job_description', chat.job_description || '');
            formData.append('previous_output', chat.messages[chat.messages.length - 1]?.content || '');

            const response = await chatAPI.analyze(formData);
            const aiOutput = response.data.ai_output;

            // Update local state with new messages
            const newMessages = [...chat.messages, { role: 'user', content: userMessage }, { role: 'assistant', content: aiOutput }];
            setChat(prev => ({ ...prev, messages: newMessages }));

            // Auto-save to backend
            await chatAPI.save({ chatId: id, messages: newMessages });
        } catch (error) {
            console.error('Follow-up failed:', error);
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async () => {
        alert('Delete functionality not implemented in backend yet.');
    };

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center">
            <LoadingSpinner size="lg" />
        </div>
    );

    return (
        <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto relative">
            {/* Background decoration */}
            <div className="absolute top-40 left-0 w-64 h-64 bg-cyan/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-80 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10" />

            <div className="flex items-center justify-between mb-8">
                <Link to="/dashboard" className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 hover:text-cyan transition-all">
                    <LuChevronLeft size={20} /> Back to Dashboard
                </Link>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Chat"
                >
                    <LuTrash2 size={20} />
                </button>
            </div>

            <div className="mb-12">
                <h1 className="text-3xl font-bold mb-4">{chat.title || 'Analysis Session'}</h1>
                <div className="flex flex-wrap gap-4">
                    <Card className="flex-1 min-w-[300px] p-4 bg-gradient-to-br from-cyan/5 to-transparent flex gap-4 items-center border border-cyan/10">
                        <div className="p-2 bg-gradient-to-br from-cyan/20 to-accent/10 rounded-lg text-cyan">
                            <LuFileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs opacity-50 uppercase font-bold tracking-wider">Source Resume</p>
                            <p className="text-sm font-medium truncate">{chat.resume_text ? 'Resume Provided' : 'Pasted Text'}</p>
                        </div>
                    </Card>
                    <Card className="flex-1 min-w-[300px] p-4 bg-gradient-to-br from-secondary/5 to-transparent flex gap-4 items-center border border-secondary/10">
                        <div className="p-2 bg-gradient-to-br from-secondary/20 to-violet-dark/10 rounded-lg text-secondary">
                            <LuMessageSquare size={20} />
                        </div>
                        <div>
                            <p className="text-xs opacity-50 uppercase font-bold tracking-wider">Date Analyzed</p>
                            <p className="text-sm font-medium">{new Date(chat.createdAt).toLocaleDateString()}</p>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="space-y-8 mb-12">
                {chat.messages?.map((msg, i) => (
                    <ChatMessage key={i} message={msg.content} isAI={msg.role === 'assistant'} />
                ))}
                {sending && (
                    <div className="flex justify-start">
                        <div className="glass p-6 rounded-2xl border border-cyan/10 flex items-center gap-4">
                            <LoadingSpinner size="sm" />
                            <span className="opacity-60 text-sm animate-pulse text-cyan">AI is thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleFollowUp} className="relative sticky bottom-8">
                <textarea
                    className="w-full glass border border-cyan/20 rounded-2xl py-4 pl-4 pr-16 outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan min-h-[80px] shadow-2xl backdrop-blur-xl placeholder:text-cyan/30"
                    placeholder="Continue the conversation..."
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleFollowUp(e)}
                />
                <button
                    type="submit"
                    disabled={sending || !followUp.trim()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-cyan to-accent rounded-xl text-white shadow-lg shadow-cyan/30 hover:shadow-cyan/50 transition-all active:scale-95 disabled:opacity-50"
                >
                    <LuSend size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatView;

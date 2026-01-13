import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { chatAPI } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import FileUpload from '../components/FileUpload';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { LuFileText, LuClipboardList, LuSend, LuSave, LuRefreshCw } from 'react-icons/lu';

const Analyze = () => {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('upload');
    const [file, setFile] = useState(null);
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [followUp, setFollowUp] = useState('');
    const [chatId, setChatId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].type === 'ai') {
            const lastMessage = chatHistory[chatHistory.length - 1].text;
            setIsTyping(true);
            setDisplayedText('');
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < lastMessage.length) {
                    setDisplayedText(lastMessage.slice(0, index + 1));
                    index++;
                    
                    requestAnimationFrame(() => {
                        chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    });
                } else {
                    setIsTyping(false);
                    clearInterval(interval);
                }
            }, 3);
            
            return () => clearInterval(interval);
        }
    }, [chatHistory]);

    const handleAnalyze = async () => {
        if ((activeTab === 'upload' && !file) || (activeTab === 'text' && !resumeText)) return;
        if (!jobDescription) return;

        setLoading(true);
        const formData = new FormData();
        if (activeTab === 'upload') {
            formData.append('resume_file', file);
        } else {
            formData.append('resume_text', resumeText);
        }
        formData.append('job_description', jobDescription);

        try {
            const response = await chatAPI.analyze(formData);
            const aiResponse = response.data.ai_output;
            const newHistory = [{ type: 'ai', text: aiResponse }];
            setChatHistory(newHistory);
            
            if (isAuthenticated) {
                try {
                    const saveResponse = await chatAPI.save({
                        messages: [{ role: 'assistant', content: aiResponse }],
                        resume_text: activeTab === 'text' ? resumeText : 'Uploaded File',
                        job_description: jobDescription,
                        title: `Analysis: ${jobDescription.substring(0, 30)}...`
                    });
                    setChatId(saveResponse.data._id);
                    setIsSaved(true);
                } catch (saveError) {
                    console.error('Auto-save failed:', saveError);
                }
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFollowUp = async (e) => {
        e.preventDefault();
        if (!followUp.trim() || loading) return;

        const userMessage = followUp;
        const lastAIResponse = chatHistory[chatHistory.length - 1]?.text;

        setFollowUp('');
        setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('resume_text', activeTab === 'text' ? resumeText : 'Resume uploaded');
            formData.append('job_description', userMessage);
            formData.append('previous_output', lastAIResponse);

            const response = await chatAPI.analyze(formData);
            const newHistory = [...chatHistory, { type: 'user', text: userMessage }, { type: 'ai', text: response.data.ai_output }];
            setChatHistory(newHistory);
            
            if (isAuthenticated) {
                try {
                    const formattedMessages = newHistory.map(msg => ({
                        role: msg.type === 'ai' ? 'assistant' : 'user',
                        content: msg.text
                    }));
                    await chatAPI.save({
                        chatId,
                        messages: formattedMessages,
                        resume_text: activeTab === 'text' ? resumeText : 'Uploaded File',
                        job_description: jobDescription
                    });
                    setIsSaved(true);
                } catch (saveError) {
                    console.error('Auto-save failed:', saveError);
                }
            }
        } catch (error) {
            console.error('Follow-up failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!isAuthenticated) return alert('Please login to save chats');

        const formattedMessages = chatHistory.map(msg => ({
            role: msg.type === 'ai' ? 'assistant' : 'user',
            content: msg.text
        }));

        try {
            await chatAPI.save({
                chatId,
                messages: formattedMessages,
                resume_text: activeTab === 'text' ? resumeText : 'Uploaded File',
                job_description: jobDescription,
                title: `Analysis: ${jobDescription.substring(0, 30)}...`
            });
            setIsSaved(true);
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    const reset = () => {
        setFile(null);
        setResumeText('');
        setJobDescription('');
        setChatHistory([]);
        setChatId(null);
        setIsSaved(false);
    };

    return (
        <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto relative">
            <div className="absolute top-40 left-0 w-72 h-72 bg-cyan/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-60 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                    Analyze Your <span className="gradient-text">Application</span>
                </h1>
                <p className="opacity-60">Get AI-powered insights and prepare for your interview.</p>
            </div>

            {!chatHistory.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="flex flex-col gap-6 border border-cyan/10 hover:border-cyan/20">
                        <div className="flex bg-cyan/5 p-1 rounded-xl border border-cyan/10 relative">
                            <div 
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-cyan to-accent rounded-lg transition-all duration-300 ease-out ${
                                    activeTab === 'upload' 
                                        ? 'left-1 shadow-[4px_0_12px_rgba(34,211,238,0.3)]' 
                                        : 'left-[calc(50%+3px)] shadow-[-4px_0_12px_rgba(34,211,238,0.3)]'
                                }`}
                            />
                            <button
                                onClick={() => setActiveTab('upload')}
                                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-300 ${
                                    activeTab === 'upload'
                                        ? 'text-white'
                                        : 'opacity-50 hover:opacity-100'
                                }`}
                            >
                                <LuFileText size={18} />
                                Upload PDF
                            </button>
                            <button
                                onClick={() => setActiveTab('text')}
                                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-300 ${
                                    activeTab === 'text'
                                        ? 'text-white'
                                        : 'opacity-50 hover:opacity-100'
                                }`}
                            >
                                <LuClipboardList size={18} />
                                Paste Text
                            </button>
                        </div>

                        {activeTab === 'upload' ? (
                            <FileUpload
                                selectedFile={file}
                                onFileSelect={setFile}
                                onClear={() => setFile(null)}
                            />
                        ) : (
                            <div className="flex-1 min-h-[250px] relative">
                                <textarea
                                    className="w-full h-full bg-cyan/5 border border-cyan/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan resize-none transition-all placeholder:text-cyan/30"
                                    placeholder="Paste your resume text here..."
                                    value={resumeText}
                                    onChange={(e) => setResumeText(e.target.value)}
                                />
                                <div className="absolute bottom-4 right-4 text-xs opacity-40">
                                    {resumeText.length}/10000 characters
                                </div>
                            </div>
                        )}
                    </Card>

                    <Card className="flex flex-col gap-6 border border-cyan/10 hover:border-cyan/20">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <LuClipboardList className="text-cyan" />
                            Job Description
                        </h3>
                        <div className="flex-1 min-h-[300px] relative">
                            <textarea
                                className="w-full h-full bg-cyan/5 border border-cyan/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan resize-none transition-all placeholder:text-cyan/30"
                                placeholder="Paste the job description you are applying for..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <div className="absolute bottom-4 right-4 text-xs opacity-40">
                                {jobDescription.length}/10000 characters
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full glow-primary !text-white"
                            disabled={loading || (!file && !resumeText) || !jobDescription}
                            onClick={handleAnalyze}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <LoadingSpinner size="sm" /> Analyzing...
                                </span>
                            ) : (
                                'Analyze Interview Potential'
                            )}
                        </Button>
                    </Card>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center glass p-4 rounded-2xl border border-cyan/10">
                        <div className="flex gap-4">
                            <Button variant="outline" size="sm" onClick={reset} className="flex items-center gap-2">
                                <LuRefreshCw size={16} /> New Analysis
                            </Button>
                            {isAuthenticated && isSaved && (
                                <span className="text-cyan flex items-center gap-2 text-sm font-medium">
                                    ✓ Auto-saved to History
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {chatHistory.slice(0, -1).map((msg, i) => (
                            <div key={i} className="opacity-100 transition-opacity duration-500">
                                <ChatMessage message={msg.text} isAI={msg.type === 'ai'} />
                            </div>
                        ))}
                        {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].type === 'ai' && (
                            <div className="opacity-100 transition-opacity duration-500">
                                <ChatMessage message={displayedText} isAI={true} />
                            </div>
                        )}
                        {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].type === 'user' && (
                            <div className="opacity-100 transition-opacity duration-500">
                                <ChatMessage message={chatHistory[chatHistory.length - 1].text} isAI={false} />
                            </div>
                        )}
                        {loading && (
                            <div className="flex justify-start animate-in fade-in duration-500">
                                <div className="glass p-6 rounded-2xl border border-cyan/10 flex items-center gap-4">
                                    <LoadingSpinner size="sm" />
                                    <span className="opacity-60 text-sm animate-pulse text-cyan">AI is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="mt-8 mb-8">
                        <form onSubmit={handleFollowUp} className="relative">
                            <textarea
                                className="w-full bg-[#0f172a]/60 border border-cyan/30 rounded-2xl py-4 pl-4 pr-16 outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan min-h-[70px] shadow-2xl backdrop-blur-xl placeholder:text-cyan/40 transition-all resize-none text-slate-200"
                                placeholder="Ask a follow-up question..."
                                value={followUp}
                                onChange={(e) => setFollowUp(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleFollowUp(e)}
                            />
                            <button
                                type="submit"
                                disabled={loading || !followUp.trim()}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-cyan to-accent rounded-xl shadow-lg shadow-cyan/30 hover:shadow-cyan/50 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ color: '#ffffff' }}
                            >
                                <LuSend size={20} style={{ color: '#ffffff' }} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyze;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ChatHistory from '../components/ChatHistory';
import { LuPlus, LuLayoutDashboard, LuMessageSquare, LuCalendar } from 'react-icons/lu';

const Dashboard = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, lastActivity: 'None' });

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await chatAPI.getHistory();
                const chats = response.data || [];
                setHistory(chats);

                // Calculate stats
                setStats({
                    total: chats.length,
                    lastActivity: chats.length > 0
                        ? new Date(chats[0].createdAt).toLocaleDateString()
                        : 'None'
                });
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto relative">
            {/* Background decoration */}
            <div className="absolute top-32 left-0 w-64 h-64 bg-cyan/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-64 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, <span className="gradient-text">{user?.name}</span>!
                    </h1>
                    <p className="opacity-60 flex items-center gap-2">
                        <LuLayoutDashboard size={16} className="text-cyan" />
                        Overview of your interview preparations
                    </p>
                </div>
                <Link to="/analyze">
                    <Button className="flex items-center gap-2 glow-primary">
                        <LuPlus size={20} /> Start New Analysis
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="flex items-center gap-4 bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/10 hover:border-cyan/20">
                    <div className="p-3 bg-gradient-to-br from-cyan/30 to-accent/20 rounded-xl text-cyan">
                        <LuMessageSquare size={24} />
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Total Chats</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/10 hover:border-secondary/20">
                    <div className="p-3 bg-gradient-to-br from-secondary/30 to-violet-dark/20 rounded-xl text-secondary">
                        <LuCalendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Last Activity</p>
                        <p className="text-2xl font-bold">{stats.lastActivity}</p>
                    </div>
                </Card>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold">Recent <span className="gradient-text">History</span></h2>
                <div className="h-px flex-1 bg-gradient-to-r from-cyan/20 to-transparent mx-4" />
            </div>

            {loading ? (
                <LoadingSpinner size="lg" />
            ) : history.length > 0 ? (
                <ChatHistory history={history} />
            ) : (
                <Card className="text-center py-20 border-dashed border-2 border-cyan/10 hover:border-cyan/20 transition-colors">
                    <div className="p-4 bg-gradient-to-br from-cyan/10 to-secondary/10 rounded-2xl w-fit mx-auto mb-6">
                        <LuMessageSquare size={48} className="text-cyan/50" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No history yet</h3>
                    <p className="opacity-60 mb-8 max-w-xs mx-auto">
                        Start your first analysis to see your history and tracked progress here.
                    </p>
                    <Link to="/analyze">
                        <Button variant="outline">Start Your First Analysis</Button>
                    </Link>
                </Card>
            )}
        </div>
    );
};

export default Dashboard;

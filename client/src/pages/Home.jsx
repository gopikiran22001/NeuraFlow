import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { LuScanSearch, LuMessageSquare, LuTrophy, LuZap } from 'react-icons/lu';
import { motion } from 'framer-motion';
import NeuraFlowLogo from '../components/NeuraFlowLogo';

const Home = () => {
    const features = [
        {
            icon: <LuScanSearch className="w-8 h-8" />,
            title: "AI Analysis",
            description: "Deep scan of your resume against job requirements using advanced AI models."
        },
        {
            icon: <LuZap className="w-8 h-8" />,
            title: "Skill Gap Detection",
            description: "Identify exactly what's missing in your profile and get actionable tips to improve."
        },
        {
            icon: <LuMessageSquare className="w-8 h-8" />,
            title: "Mock Interview",
            description: "Interactive AI chat to practice follow-up questions tailored to your experience."
        },
        {
            icon: <LuTrophy className="w-8 h-8" />,
            title: "Success Optimization",
            description: "Optimize for ATS and human recruiters to maximize your interview chances."
        }
    ];

    return (
        <div className="relative overflow-hidden font-sans">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 hover:border-primary/40 transition-colors">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">New: AI Interview Simulation</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-slate-100">
                            Master Your Next <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">Interview with AI</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                            Upload your resume and the job description. Our AI analyzes gaps,
                            predicts questions, and helps you prepare like a pro.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/analyze">
                                <Button size="lg" className="w-full sm:w-auto h-16 text-lg px-10">
                                    Analyze Resume Now
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 text-lg px-10 border-2">
                                    Sign Up for Free
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">
                            Why Choose <span className="text-primary">NeuraFlow</span>?
                        </h2>
                        <p className="text-slate-400 text-lg">Engineered to give you the competitive edge in today's job market.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full group hover:border-primary/30 transition-all glass border-white/10">
                                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl w-fit mb-6 text-primary group-hover:scale-110 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-slate-100">{feature.title}</h3>
                                    <p className="text-slate-300 leading-relaxed text-sm">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 px-4 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-8 text-slate-100">
                                How <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">It Works</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Upload & Paste", desc: "Upload your resume (PDF/DOCX) and paste the job description you're applying for." },
                                    { step: "02", title: "AI Analysis", desc: "Our engine performs a multi-layered analysis of skills, experience match, and keywords." },
                                    { step: "03", title: "Receive Insights", desc: "Get a comprehensive breakdown of your match score and specific improvement areas." },
                                    { step: "04", title: "Interactive Prep", desc: "Chat with the AI to practice answering hard questions specific to your application." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="text-4xl font-black text-primary/40 group-hover:text-primary transition-all">{item.step}</span>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-slate-100">{item.title}</h4>
                                            <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square glass rounded-3xl p-8 flex flex-col justify-center items-center text-center overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
                                {/* Decorative gradient background */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 -z-10" />

                                {/* NeuraFlow Logo */}
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse scale-150"></div>
                                    <NeuraFlowLogo showTagline={true} className="relative" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-slate-100">Ready to Start?</h3>
                                <p className="text-slate-300 mb-8">No registration required for your first analysis.</p>
                                <Link to="/analyze">
                                    <Button size="lg">Get Started Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 text-center">
                <Card className="max-w-4xl mx-auto py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20 backdrop-blur-3xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-neura-gradient"></div>
                    <h2 className="text-4xl font-bold mb-6 text-slate-100">
                        Experience the future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">interview prep</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto font-light">
                        Join thousands of successful candidates who used NeuraFlow to land their dream jobs.
                    </p>
                    <Link to="/register">
                        <Button size="lg" className="px-12 h-16 text-lg">Create Free Account</Button>
                    </Link>
                </Card>
            </section>
        </div>
    );
};

export default Home;

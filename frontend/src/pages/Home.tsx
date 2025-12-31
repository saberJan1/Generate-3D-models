import { Link } from 'react-router-dom';
import { ArrowRight, Box, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
    return (
        <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '5vh' }}>
            <section style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #00f0ff, #7000ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(0, 240, 255, 0.3)'
                    }}>
                        Future of <br />3D Generation
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem' }}
                >
                    Transform your text descriptions and images into stunning, production-ready 3D assets in seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link to="/generator" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--color-primary)',
                        color: '#000',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
                        transition: 'transform 0.2s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Start Generating <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                    { title: "AI-Powered", icon: <Zap color="#00f0ff" size={40} />, desc: "Generates high-quality meshes with optimized topology automatically." },
                    { title: "Real-time Preview", icon: <Box color="#7000ff" size={40} />, desc: "View your models directly in the browser with PBR rendering." },
                    { title: "Export Ready", icon: <ArrowRight color="#00f0ff" size={40} />, desc: "Download in GLB, OBJ, or FBX formats ready for your game engine." }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        style={{
                            padding: '2rem',
                            background: 'var(--color-bg-glass)',
                            borderRadius: '1rem',
                            border: '1px solid var(--color-border)',
                            backdropFilter: 'blur(5px)'
                        }}>
                        <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

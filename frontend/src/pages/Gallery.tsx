import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const MOCK_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Cyber Artifact #${i + 1}`,
    author: `User_${Math.floor(Math.random() * 1000)}`,
    likes: Math.floor(Math.random() * 500)
}));

export const Gallery = () => {
    return (
        <div style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', marginTop: '5vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', margin: 0 }}>Community Gallery</h1>
                <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search models..."
                        style={{
                            padding: '0.8rem 1rem 0.8rem 3rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-border)',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            width: '300px',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {MOCK_ITEMS.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -10 }}
                        style={{
                            background: 'var(--color-bg-glass)',
                            borderRadius: '1rem',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            backdropFilter: 'blur(10px)',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ height: '200px', background: `linear-gradient(${Math.random() * 360}deg, #1a1a1a, #2a2a2a)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Placeholder for 3D Thumbnail */}
                            <span style={{ color: 'var(--color-text-secondary)' }}>Thumbnail {item.id + 1}</span>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{item.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                <span>by {item.author}</span>
                                <span>{item.likes} ❤️</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

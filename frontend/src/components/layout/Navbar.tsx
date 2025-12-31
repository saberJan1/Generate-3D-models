import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';
// styles removed

// Using inline styles for speed now, but could use modules.
// Let's stick to inline/global vars for now as requested "Vanilla CSS".
// Actually, inline styles with var() is quick.

export const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: 'var(--color-bg-glass)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--color-border)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            height: '70px'
        }}>
            <Link to="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--color-primary)',
                textDecoration: 'none'
            }}>
                <Box size={28} />
                <span style={{ color: 'var(--color-text-primary)' }}>3D GEN</span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {['Home', 'Generator', 'Gallery'].map((item) => (
                    <Link
                        key={item}
                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        style={{
                            color: 'var(--color-text-primary)',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

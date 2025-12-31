import { useState, useEffect } from 'react';
import { Upload, Send, Layers, Loader2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { generatorService } from '../services/generatorService';

export const Generator = () => {
    const [prompt, setPrompt] = useState('');
    const [styles, setStyles] = useState<string[]>([]);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const styleList = await generatorService.getStyles();
                setStyles(styleList || []);
                if (styleList && styleList.length > 0) setSelectedStyle(styleList[0]);
            } catch (err) {
                console.error("Failed to fetch styles", err);
                // Fallback mock styles if backend is not ready
                setStyles(['Realistic', 'Cartoon', 'Low Poly', 'Voxel']);
                setSelectedStyle('Realistic');
            }
        };
        fetchStyles();
    }, []);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        try {
            await generatorService.generate({
                text: prompt,
                length: 1, width: 1, height: 1, // Defaults
                style: selectedStyle
            });
            // Show result handling logic here (e.g. polling or callback)
            // For now just simulate delay
            setTimeout(() => setIsGenerating(false), 2000);
        } catch (err) {
            console.error("Generation failed", err);
            setIsGenerating(false);
        }
    };

    return (
        <div style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', height: 'calc(100vh - 100px)', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' }}>
            {/* Sidebar / Controls */}
            <div style={{
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                height: '100%'
            }}>
                <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}><Layers size={20} color="var(--color-primary)" /> Generation Settings</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Text Prompt</label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your 3D model..."
                            style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--color-border)',
                                color: '#fff',
                                padding: '0.8rem',
                                borderRadius: '0.5rem',
                                minHeight: '120px',
                                resize: 'none',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Style</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {styles.map(style => (
                            <button
                                key={style}
                                onClick={() => setSelectedStyle(style)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    border: `1px solid ${selectedStyle === style ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                    background: selectedStyle === style ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                                    color: selectedStyle === style ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Image Reference (Optional)</label>
                    <div style={{
                        border: '2px dashed var(--color-border)',
                        padding: '2rem',
                        textAlign: 'center',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: 'rgba(255,255,255,0.02)'
                    }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    >
                        <Upload size={24} style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>Drop image or click to upload</p>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    style={{
                        marginTop: 'auto',
                        background: isGenerating ? 'var(--color-bg-secondary)' : 'linear-gradient(90deg, #00f0ff, #7000ff)',
                        border: 'none',
                        padding: '1rem',
                        color: '#fff',
                        fontWeight: '600',
                        borderRadius: '0.5rem',
                        cursor: isGenerating || !prompt ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        boxShadow: isGenerating ? 'none' : '0 0 15px rgba(0, 240, 255, 0.3)',
                        transition: 'transform 0.1s',
                        opacity: isGenerating || !prompt ? 0.7 : 1
                    }}
                    onMouseDown={(e) => !isGenerating && (e.currentTarget.style.transform = 'scale(0.98)')}
                    onMouseUp={(e) => !isGenerating && (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    {isGenerating ? 'Generating...' : 'Generate Model'}
                </button>
            </div>

            {/* Preview Area */}
            <div style={{
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '2rem',
                    fontSize: '0.8rem',
                    zIndex: 10,
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    Preview Mode
                </div>
                <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
                    <OrbitControls makeDefault />
                    <Stage environment="city" intensity={0.5}>
                        <mesh>
                            <sphereGeometry args={[1, 64, 64]} />
                            <meshStandardMaterial color={isGenerating ? "#555" : "#222"} wireframe={isGenerating} />
                        </mesh>
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
};

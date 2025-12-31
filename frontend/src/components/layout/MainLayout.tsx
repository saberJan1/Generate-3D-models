import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Background3D } from '../background/Background3D';

export const MainLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Background3D />
            {/* Navbar is fixed, so we might need spacer or padding */}
            <Navbar />
            <main style={{
                flex: 1,
                paddingTop: '70px', // Match navbar height
                position: 'relative',
                zIndex: 1
            }}>
                <Outlet />
            </main>
        </div>
    );
};

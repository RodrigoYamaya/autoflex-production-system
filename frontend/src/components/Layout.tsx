import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />

            <main style={{
                marginLeft: '250px',
                width: 'calc(100% - 250px)',
                padding: '30px',
                minHeight: '100vh',
                background: 'var(--bg-body)'
            }}>
                <Outlet />
            </main>
        </div>
    );
}
// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar Fixa */}
            <Sidebar />

            {/* Área de Conteúdo (Direita) */}
            <main style={{
                marginLeft: '250px', // Empurra o conteúdo para não ficar embaixo da sidebar
                width: 'calc(100% - 250px)',
                padding: '30px',
                minHeight: '100vh',
                background: 'var(--bg-body)'
            }}>
                {/* O 'Outlet' é onde o Router vai jogar as telas (Produtos, Matérias, etc) */}
                <Outlet />
            </main>
        </div>
    );
}
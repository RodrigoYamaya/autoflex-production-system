import { House, Package, Wall, ChartBar } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
    // Função para aplicar o estilo quando o link está ativo
    const linkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            textDecoration: 'none',
            color: isActive ? '#4318FF' : '#A3AED0', // Azul se ativo, Cinza se não
            fontWeight: isActive ? 'bold' : 'normal',
            borderRight: isActive ? '4px solid #4318FF' : '4px solid transparent', // A barrinha lateral
            marginBottom: '5px',
            transition: '0.2s'
        };
    };

    return (
        <aside style={{
            width: '250px',
            background: 'white',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '30px'
        }}>
            {/* Logo */}
            <div style={{ padding: '0 30px 40px 30px' }}>
                <h2 style={{ margin: 0, color: '#2B3674', fontSize: '24px' }}>
                    AUTO<span style={{ fontWeight: 'normal' }}>FLEX</span>
                </h2>
            </div>

            {/* Menu Links */}
            <nav style={{ flex: 1 }}>
                <NavLink to="/" style={linkStyle} end>
                    <House size={24} weight="fill" />
                    Dashboard
                </NavLink>

                <NavLink to="/products" style={linkStyle}>
                    <Package size={24} weight="fill" />
                    Produtos
                </NavLink>

                <NavLink to="/raw-materials" style={linkStyle}>
                    <Wall size={24} weight="fill" /> {/* Trocamos Bricks por Wall */}
                    Matérias-primas
                </NavLink>

                <NavLink to="/planning" style={linkStyle}>
                    <ChartBar size={24} weight="fill" />
                    Planejamento
                </NavLink>
            </nav>

            {/* Rodapé do Menu */}
            <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
                <small style={{ color: '#A3AED0' }}>v1.0.0 Back-end Connected</small>
            </div>
        </aside>
    );
}
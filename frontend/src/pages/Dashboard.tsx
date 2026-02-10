import { useNavigate } from 'react-router-dom';
import { Package, Cube, ChartLineUp, CaretRight } from '@phosphor-icons/react';

export function Dashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <h1 style={{ marginBottom: '10px', color: '#2B3674' }}>Bem-vindo ao Autoflex</h1>
            <p style={{ color: '#A3AED0', marginBottom: '40px' }}>
                Selecione um módulo abaixo para começar a gerenciar sua produção.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
            }}>

                <div
                    className="card"
                    onClick={() => navigate('/raw-materials')}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s', borderBottom: '4px solid #4318FF' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ background: '#F4F7FE', padding: '15px', borderRadius: '50%' }}>
                            <Package size={32} color="#4318FF" weight="fill" />
                        </div>
                        <CaretRight size={24} color="#A3AED0" />
                    </div>
                    <h3 style={{ color: '#2B3674', marginBottom: '5px' }}>Matérias-primas</h3>
                    <p style={{ color: '#A3AED0', fontSize: '14px' }}>
                        Cadastre insumos e controle o saldo de estoque disponível.
                    </p>
                </div>

                <div
                    className="card"
                    onClick={() => navigate('/products')}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s', borderBottom: '4px solid #05CD99' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ background: '#E6FFFA', padding: '15px', borderRadius: '50%' }}>
                            <Cube size={32} color="#05CD99" weight="fill" />
                        </div>
                        <CaretRight size={24} color="#A3AED0" />
                    </div>
                    <h3 style={{ color: '#2B3674', marginBottom: '5px' }}>Produtos & Receitas</h3>
                    <p style={{ color: '#A3AED0', fontSize: '14px' }}>
                        Gerencie preços e defina a composição (BOM) de cada produto.
                    </p>
                </div>

                <div
                    className="card"
                    onClick={() => navigate('/planning')}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s', borderBottom: '4px solid #FFB547' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ background: '#FFF7E8', padding: '15px', borderRadius: '50%' }}>
                            {/* ÍCONE CORRIGIDO AQUI: */}
                            <ChartLineUp size={32} color="#FFB547" weight="fill" />
                        </div>
                        <CaretRight size={24} color="#A3AED0" />
                    </div>
                    <h3 style={{ color: '#2B3674', marginBottom: '5px' }}>Planejamento</h3>
                    <p style={{ color: '#A3AED0', fontSize: '14px' }}>
                        Algoritmo inteligente de sugestão de produção baseado no lucro.
                    </p>
                </div>

            </div>

            <div style={{ marginTop: '50px', textAlign: 'center', color: '#A3AED0', fontSize: '12px' }}>
                <p>Sistema desenvolvido para o Teste Prático Autoflex &copy; 2026</p>
            </div>
        </div>
    );
}
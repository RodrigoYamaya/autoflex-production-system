
import { useState } from 'react';
import { ChartBar, CurrencyDollar, Factory, Warning } from '@phosphor-icons/react';
import api from '../services/api';
import type { PlanningResponse } from '../types';

export function Planning() {
    const [plan, setPlan] = useState<PlanningResponse | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleGeneratePlan() {
        setLoading(true);
        try {
            const response = await api.post('/production-plan/calculate');
            setPlan(response.data);
        } catch (error) {
            console.error("Erro ao gerar plano", error);
            alert("Erro ao conectar com o servidor. Verifique se o Back-end está rodando.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px', color: '#2B3674' }}>Planejamento de Produção</h1>


            <div className="card" style={{ marginBottom: '30px', textAlign: 'center', padding: '40px' }}>
                <div style={{ background: '#F4F7FE', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                    <Factory size={40} color="#4318FF" weight="fill" />
                </div>

                <h2 style={{ color: '#2B3674', marginBottom: '10px' }}>Otimizador de Lucro</h2>
                <p style={{ color: '#A3AED0', maxWidth: '500px', margin: '0 auto 30px auto' }}>
                    Nosso algoritmo analisa seu estoque e sugere a combinação ideal de produtos
                    para gerar o <strong>maior lucro possível</strong>
                </p>

                <button
                    onClick={handleGeneratePlan}
                    disabled={loading}
                    style={{
                        background: loading ? '#A3AED0' : '#4318FF',
                        color: 'white',
                        padding: '15px 40px',
                        border: 'none',
                        borderRadius: '15px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 10px rgba(67, 24, 255, 0.4)',
                        transition: '0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: '0 auto'
                    }}
                >
                    {loading ? 'Calculando...' : 'CALCULAR PRODUÇÃO IDEAL ⚡'}
                </button>
            </div>


            {plan && (
                <div className="card" style={{ border: '2px solid #4318FF', animation: 'fadeIn 0.5s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#2B3674' }}>
                            <ChartBar size={28} />
                            Relatório de Produção
                        </h3>

                        <div style={{ textAlign: 'right' }}>
                            <small style={{ color: '#A3AED0', display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>Lucro Total Projetado</small>
                            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#05CD99', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <CurrencyDollar size={32} />
                                R$ {plan.grandTotal?.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {plan.items && plan.items.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#F4F7FE' }}>
                            <tr>
                                <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px', borderRadius: '10px 0 0 10px' }}>PRODUTO</th>
                                <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px' }}>QTD SUGERIDA</th>
                                <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px' }}>PREÇO UNIT.</th>
                                <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px', textAlign: 'right', borderRadius: '0 10px 10px 0' }}>SUBTOTAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            {plan.items.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#2B3674' }}>
                                        {item.productName}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                            <span style={{ background: '#E6FFFA', color: '#05CD99', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                                                {item.quantity} un.
                                            </span>
                                    </td>
                                    <td style={{ padding: '15px', color: '#707EAE' }}>
                                        R$ {item.unitPrice.toFixed(2)}
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: '#2B3674' }}>
                                        R$ {item.totalValue.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#E53E3E', background: '#FFF5F5', borderRadius: '10px' }}>
                            <Warning size={32} style={{ marginBottom: '10px' }} />
                            <br />
                            <strong>Estoque Insuficiente!</strong>
                            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                                Não é possível fabricar nenhum produto com as matérias-primas que você tem hoje.
                                <br/>Cadastre mais matérias-primas na aba "Matérias-primas".
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
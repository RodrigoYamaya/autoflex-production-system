// src/pages/RawMaterials.tsx
import { useEffect, useState } from 'react';
import { Trash, Plus } from '@phosphor-icons/react';
import api from '../services/api';
import type { RawMaterial } from '../types'; // Aqui usamos type pois é só uma interface

export function RawMaterials() {
    // --- ESTADO (Memória da Tela) ---
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);

    // --- CARREGAMENTO INICIAL ---
    useEffect(() => {
        loadMaterials();
    }, []);

    // Função para buscar dados (GET)
    async function loadMaterials() {
        try {
            const response = await api.get('/raw-materials');
            setMaterials(response.data);
        } catch (error) {
            alert('Erro ao buscar matérias-primas!');
            console.error(error);
        }
    }

    // Função para Salvar (POST)
    async function handleSave(e: any) {
        e.preventDefault();

        if (!name || stock < 0) return alert("Preencha os campos corretamente!");

        try {
            await api.post('/raw-materials', {
                name: name,
                stockQuantity: stock
            });

            alert('Salvo com sucesso!');
            setName('');
            setStock(0);
            loadMaterials();
        } catch (error) {
            alert('Erro ao salvar!');
            console.error(error);
        }
    }

    // Função para Deletar (DELETE)
    async function handleDelete(id: number) {
        if(!confirm("Tem certeza que deseja excluir?")) return;

        try {
            await api.delete(`/raw-materials/${id}`);
            loadMaterials();
        } catch (error) {
            alert('Erro ao deletar!');
            console.error(error);
        }
    }

    // --- O HTML (VISUAL NOVO COM CARDS) ---
    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Gestão de Matérias-primas</h1>

            {/* CARD 1: Formulário de Cadastro */}
            <div className="card">
                <h3 style={{ marginBottom: '15px', color: '#2B3674' }}>Adicionar Novo Item</h3>
                <form onSubmit={handleSave} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#A3AED0', fontSize: '14px' }}>Nome do Item</label>
                        <input
                            type="text"
                            placeholder="Ex: Madeira, Plástico..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ minWidth: '300px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#A3AED0', fontSize: '14px' }}>Estoque</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={e => setStock(Number(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            background: '#4318FF',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        <Plus size={18} weight="bold" />
                        Salvar Item
                    </button>
                </form>
            </div>

            {/* CARD 2: Tabela de Listagem */}
            <div className="card" style={{ marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ borderBottom: '1px solid #E0E5F2' }}>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '14px' }}>ID</th>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '14px' }}>NOME</th>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '14px' }}>ESTOQUE (QTD)</th>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '14px', textAlign: 'center' }}>AÇÕES</th>
                    </tr>
                    </thead>
                    <tbody>
                    {materials.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px', color: '#2B3674', fontWeight: 'bold' }}>#{item.id}</td>
                            <td style={{ padding: '15px', color: '#2B3674', fontWeight: 'bold' }}>{item.name}</td>
                            <td style={{ padding: '15px', color: '#2B3674' }}>{item.stockQuantity}</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <button
                                    onClick={() => handleDelete(item.id!)}
                                    title="Excluir item"
                                    style={{
                                        background: '#FFF0F0', // Vermelho bem clarinho
                                        color: '#E53E3E', // Vermelho texto
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {materials.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: '#A3AED0' }}>
                                Nenhuma matéria-prima cadastrada ainda.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
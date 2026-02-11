import { useEffect, useState } from 'react';
import { Trash, Plus, PencilSimple, X } from '@phosphor-icons/react'; // Adicionei PencilSimple e X
import api from '../services/api';
import type { RawMaterial } from '../types';

export function RawMaterials() {
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);

    // NOVO ESTADO: Guarda o ID de quem estamos editando (null = criando novo)
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        loadMaterials();
    }, []);

    async function loadMaterials() {
        try {
            const response = await api.get('/raw-materials');
            setMaterials(response.data);
        } catch (error) {
            alert('Erro ao buscar matérias-primas!');
            console.error(error);
        }
    }

    async function handleSave(e: any) {
        e.preventDefault();

        if (!name || stock < 0) return alert("Preencha os campos corretamente!");

        try {
            if (editingId) {
                // --- MODO EDIÇÃO (PUT) ---
                await api.put(`/raw-materials/${editingId}`, {
                    name: name,
                    stockQuantity: stock
                });
                alert('Atualizado com sucesso!');
            } else {
                // --- MODO CRIAÇÃO (POST) ---
                await api.post('/raw-materials', {
                    name: name,
                    stockQuantity: stock
                });
                alert('Salvo com sucesso!');
            }

            // Limpa tudo
            limparFormulario();
            loadMaterials();
        } catch (error) {
            alert('Erro ao salvar!');
            console.error(error);
        }
    }

    function handleEdit(item: RawMaterial) {
        setName(item.name);
        setStock(item.stockQuantity);
        setEditingId(item.id!); // Entra no modo edição

        // Joga o foco para o input de nome (opcional, mas fica chique)
        document.getElementById('inputNome')?.focus();
    }

    function handleDelete(id: number) {
        if(!confirm("Tem certeza que deseja excluir?")) return;

        try {
            api.delete(`/raw-materials/${id}`).then(() => {
                loadMaterials();
                if (editingId === id) limparFormulario(); // Se deletar quem está editando, limpa o form
            });
        } catch (error) {
            alert('Erro ao deletar!');
            console.error(error);
        }
    }

    function limparFormulario() {
        setName('');
        setStock(0);
        setEditingId(null);
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px', color: '#2B3674' }}>Gestão de Matérias-primas</h1>

            <div className="card">
                <h3 style={{ marginBottom: '15px', color: '#2B3674', display: 'flex', justifyContent: 'space-between' }}>
                    {editingId ? `Editando Item #${editingId}` : 'Adicionar Novo Item'}

                    {/* Botão Cancelar (Só aparece se estiver editando) */}
                    {editingId && (
                        <button
                            onClick={limparFormulario}
                            style={{ background: 'transparent', border: 'none', color: '#E53E3E', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            <X size={16} /> Cancelar Edição
                        </button>
                    )}
                </h3>

                <form onSubmit={handleSave} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#A3AED0', fontSize: '14px' }}>Nome do Item</label>
                        <input
                            id="inputNome"
                            type="text"
                            placeholder="Ex: Madeira, Plástico..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E0E5F2' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#A3AED0', fontSize: '14px' }}>Estoque</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={e => setStock(Number(e.target.value))}
                            style={{ width: '100px', padding: '10px', borderRadius: '10px', border: '1px solid #E0E5F2' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            background: editingId ? '#FFB547' : '#4318FF', // Muda a cor se estiver editando (Laranja/Roxo)
                            color: editingId ? '#1B2559' : '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontWeight: 'bold',
                            height: '42px'
                        }}
                    >
                        {editingId ? <PencilSimple size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                        {editingId ? 'Atualizar' : 'Salvar'}
                    </button>
                </form>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ borderBottom: '2px solid #E0E5F2' }}>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px' }}>ID</th>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px' }}>NOME</th>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px' }}>ESTOQUE (QTD)</th>
                        <th style={{ padding: '15px', color: '#A3AED0', fontSize: '12px', textAlign: 'right' }}>AÇÕES</th>
                    </tr>
                    </thead>
                    <tbody>
                    {materials.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px', color: '#2B3674', fontWeight: 'bold' }}>#{item.id}</td>
                            <td style={{ padding: '15px', color: '#2B3674', fontWeight: 'bold' }}>{item.name}</td>
                            <td style={{ padding: '15px', color: '#2B3674' }}>
                                <span style={{
                                    background: item.stockQuantity > 0 ? '#E6FFFA' : '#FFF5F5',
                                    color: item.stockQuantity > 0 ? '#05CD99' : '#E53E3E',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    fontSize: '12px'
                                }}>
                                    {item.stockQuantity} un.
                                </span>
                            </td>
                            <td style={{ padding: '15px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                {/* Botão EDITAR (Novo) */}
                                <button
                                    onClick={() => handleEdit(item)}
                                    title="Editar item"
                                    style={{
                                        background: '#E0E5F2',
                                        color: '#4318FF',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex', alignItems: 'center'
                                    }}
                                >
                                    <PencilSimple size={18} />
                                </button>

                                {/* Botão EXCLUIR */}
                                <button
                                    onClick={() => handleDelete(item.id!)}
                                    title="Excluir item"
                                    style={{
                                        background: '#FFF5F5',
                                        color: '#E53E3E',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex', alignItems: 'center'
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
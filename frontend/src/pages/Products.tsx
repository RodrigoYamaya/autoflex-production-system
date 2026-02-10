// src/pages/Products.tsx
import { useEffect, useState, FormEvent } from 'react'; // Adicionei FormEvent para tipagem correta
import { Trash, Plus, Package, ShoppingCart } from '@phosphor-icons/react';
import api from '../services/api';
import type { Product, RawMaterial, ProductComposition } from '../types';

export function Products() {
    // --- ESTADOS ---
    const [products, setProducts] = useState<Product[]>([]);
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    // Controle do Formulário de Ingredientes
    const [selectedMaterialId, setSelectedMaterialId] = useState<string>('');
    const [quantity, setQuantity] = useState(0);

    // Lista visual (para o usuário ver na tela antes de salvar)
    const [composition, setComposition] = useState<ProductComposition[]>([]);

    useEffect(() => {
        loadProducts();
        loadRawMaterials();
    }, []);

    async function loadProducts() {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao carregar produtos", error);
        }
    }

    async function loadRawMaterials() {
        try {
            const response = await api.get('/raw-materials');
            setRawMaterials(response.data);
        } catch (error) {
            console.error("Erro ao carregar matérias-primas", error);
        }
    }

    // Adiciona na lista visual (Front-end)
    function handleAddIngredient() {
        if (!selectedMaterialId || quantity <= 0) {
            return alert("Selecione um material e uma quantidade válida!");
        }

        const material = rawMaterials.find(m => m.id === Number(selectedMaterialId));
        if (!material) return;

        // Monta o objeto visualmente para a tabela
        const newItem: ProductComposition = {
            rawMaterial: material,
            requiredQuantity: quantity
        };

        setComposition([...composition, newItem]);
        setSelectedMaterialId('');
        setQuantity(0);
    }

    function handleRemoveIngredient(indexToRemove: number) {
        setComposition(composition.filter((_, index) => index !== indexToRemove));
    }

    // --- AQUI ESTAVA O PROBLEMA E AQUI ESTÁ A CORREÇÃO ---
    async function handleSaveProduct(e: FormEvent) {
        e.preventDefault();

        if (!name || price <= 0 || composition.length === 0) {
            return alert("Preencha nome, preço e adicione ingredientes!");
        }

        // 1. CONVERSÃO MÁGICA ✨
        // Transformamos a lista visual (objetos completos) no formato que o Java entende (IDs)
        const formattedCompositions = composition.map(item => ({
            rawMaterialId: item.rawMaterial.id, // Pega só o ID
            requiredQuantity: item.requiredQuantity
        }));

        // 2. Monta o objeto final
        const newProduct = {
            name,
            price,
            compositions: formattedCompositions // Envia a lista formatada
        };

        try {
            await api.post('/products', newProduct);
            alert("Produto salvo com sucesso!");

            // Limpa tudo
            setName('');
            setPrice(0);
            setComposition([]);
            loadProducts(); // Recarrega a tabela
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar! Verifique o console.");
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza?")) return;
        try {
            await api.delete(`/products/${id}`);
            loadProducts();
        } catch (error) {
            alert("Erro ao deletar.");
        }
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px', color: '#2B3674' }}>Gestão de Produtos</h1>

            {/* CARD 1: FORMULÁRIO */}
            <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#2B3674', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Package size={24} />
                    Novo Produto
                </h3>

                <form onSubmit={handleSaveProduct}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ display: 'block', color: '#A3AED0', fontSize: '14px', marginBottom: '5px' }}>Nome do Produto</label>
                            <input
                                type="text"
                                placeholder="Ex: Mesa de Jantar"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', color: '#A3AED0', fontSize: '14px', marginBottom: '5px' }}>Preço de Venda (R$)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #E0E5F2', margin: '20px 0' }} />

                    <h4 style={{ color: '#2B3674', marginBottom: '15px' }}>Receita (Composição)</h4>

                    <div style={{ background: '#F4F7FE', padding: '20px', borderRadius: '10px', display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ fontSize: '12px', color: '#A3AED0', display: 'block', marginBottom: '5px' }}>Matéria-prima</label>
                            <select
                                value={selectedMaterialId}
                                onChange={e => setSelectedMaterialId(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E0E5F2' }}
                            >
                                <option value="">Selecione um material...</option>
                                {rawMaterials.map(mat => (
                                    <option key={mat.id} value={mat.id}>
                                        {mat.name} (Estoque: {mat.stockQuantity})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '12px', color: '#A3AED0', display: 'block', marginBottom: '5px' }}>Qtd Necessária</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={e => setQuantity(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddIngredient}
                            style={{
                                background: '#2B3674',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontWeight: 'bold'
                            }}
                        >
                            <Plus size={16} weight="bold"/>
                            ADICIONAR
                        </button>
                    </div>

                    {/* Lista Temporária Visual */}
                    {composition.length > 0 && (
                        <div style={{ marginTop: '20px', border: '1px solid #E0E5F2', borderRadius: '10px', overflow: 'hidden' }}>
                            {composition.map((item, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #eee', background: 'white' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2B3674' }}>
                                        <ShoppingCart size={20} color="#4318FF" weight="fill"/>
                                        {item.rawMaterial.name}
                                        <span style={{ background: '#E6FFFA', color: '#05CD99', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>
                                            x{item.requiredQuantity} un
                                        </span>
                                    </span>
                                    <button type="button" onClick={() => handleRemoveIngredient(index)} style={{ border: 'none', background: 'transparent', color: '#E53E3E', cursor: 'pointer' }}>
                                        <Trash size={18} weight="bold" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: '30px', textAlign: 'right' }}>
                        <button type="submit" style={{ background: '#4318FF', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(67, 24, 255, 0.2)' }}>
                            <Package size={20} weight="fill" />
                            SALVAR PRODUTO
                        </button>
                    </div>
                </form>
            </div>

            {/* CARD 2: LISTAGEM */}
            <div className="card">
                <h3 style={{ color: '#2B3674', marginBottom: '20px' }}>Produtos Cadastrados</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr style={{ borderBottom: '1px solid #E0E5F2', color: '#A3AED0', fontSize: '12px', textAlign: 'left', textTransform: 'uppercase' }}>
                        <th style={{ padding: '15px' }}>Produto</th>
                        <th style={{ padding: '15px' }}>Preço Venda</th>
                        <th style={{ padding: '15px' }}>Receita (BOM)</th>
                        <th style={{ padding: '15px', textAlign: 'center' }}>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(prod => (
                        <tr key={prod.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2B3674' }}>{prod.name}</td>
                            <td style={{ padding: '15px', color: '#05CD99', fontWeight: 'bold' }}>R$ {prod.price.toFixed(2)}</td>
                            <td style={{ padding: '15px', fontSize: '13px', color: '#707EAE' }}>
                                {prod.compositions?.map((c, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#4318FF', borderRadius: '50%' }}></div>
                                        {c.rawMaterial?.name}: <strong>{c.requiredQuantity}</strong>
                                    </div>
                                ))}
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <button onClick={() => handleDelete(prod.id!)} style={{ background: '#FFF0F0', color: '#E53E3E', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' }}>
                                    <Trash size={18} weight="fill" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
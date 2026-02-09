// src/pages/Products.tsx
import { useEffect, useState } from 'react';
import { Trash, Plus, Package, ShoppingCart } from '@phosphor-icons/react';
import api from '../services/api';
import type { Product, RawMaterial, ProductComposition } from '../types';

export function Products() {
    // --- ESTADOS ---
    const [products, setProducts] = useState<Product[]>([]);
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    // Carrinho temporário (Singular, pois é a lista sendo montada)
    const [selectedMaterialId, setSelectedMaterialId] = useState<string>('');
    const [quantity, setQuantity] = useState(0);
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

    function handleAddIngredient() {
        if (!selectedMaterialId || quantity <= 0) {
            return alert("Selecione um material e uma quantidade válida!");
        }

        const material = rawMaterials.find(m => m.id === Number(selectedMaterialId));
        if (!material) return;

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

    async function handleSaveProduct(e: any) {
        e.preventDefault();

        if (!name || price <= 0 || composition.length === 0) {
            return alert("Preencha nome, preço e adicione ingredientes!");
        }

        // Aqui enviamos como 'compositions' (Plural) para bater com o Java/Interface
        const newProduct = {
            name,
            price,
            compositions: composition
        };

        try {
            await api.post('/products', newProduct);
            alert("Produto salvo!");
            setName('');
            setPrice(0);
            setComposition([]);
            loadProducts();
        } catch (error) {
            alert("Erro ao salvar!");
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza?")) return;
        await api.delete(`/products/${id}`);
        loadProducts();
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Gestão de Produtos</h1>

            {/* CARD 1: FORMULÁRIO */}
            <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#2B3674', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Package size={24} />
                    Novo Produto
                </h3>

                <form onSubmit={handleSaveProduct}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ display: 'block', color: '#A3AED0', fontSize: '14px', marginBottom: '5px' }}>Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', color: '#A3AED0', fontSize: '14px', marginBottom: '5px' }}>Preço (R$)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #E0E5F2', margin: '20px 0' }} />

                    <h4 style={{ color: '#2B3674', marginBottom: '15px' }}>Receita (Ingredientes)</h4>

                    <div style={{ background: '#F4F7FE', padding: '15px', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ fontSize: '12px' }}>Matéria-prima</label>
                            <select
                                value={selectedMaterialId}
                                onChange={e => setSelectedMaterialId(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E0E5F2' }}
                            >
                                <option value="">Selecione...</option>
                                {rawMaterials.map(mat => (
                                    <option key={mat.id} value={mat.id}>{mat.name} (Estoque: {mat.stockQuantity})</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '12px' }}>Qtd</label>
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
                            style={{ background: '#2B3674', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            {/* CORREÇÃO: Usando o ícone Plus aqui */}
                            <Plus size={16} weight="bold"/>
                            Adicionar
                        </button>
                    </div>

                    {/* Lista Temporária */}
                    {composition.length > 0 && (
                        <div style={{ marginTop: '15px' }}>
                            {composition.map((item, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <ShoppingCart size={18} color="#4318FF"/>
                                        {item.rawMaterial.name} <strong>(x{item.requiredQuantity})</strong>
                                    </span>
                                    <button type="button" onClick={() => handleRemoveIngredient(index)} style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer' }}>
                                        <Trash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: '30px', textAlign: 'right' }}>
                        <button type="submit" style={{ background: '#4318FF', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <Package size={20} weight="bold" />
                            SALVAR PRODUTO
                        </button>
                    </div>
                </form>
            </div>

            {/* CARD 2: LISTAGEM */}
            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr style={{ borderBottom: '1px solid #E0E5F2', color: '#A3AED0', fontSize: '14px', textAlign: 'left' }}>
                        <th style={{ padding: '15px' }}>PRODUTO</th>
                        <th style={{ padding: '15px' }}>PREÇO</th>
                        <th style={{ padding: '15px' }}>INGREDIENTES</th>
                        <th style={{ padding: '15px' }}>AÇÕES</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(prod => (
                        <tr key={prod.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2B3674' }}>{prod.name}</td>
                            <td style={{ padding: '15px', color: '#05CD99', fontWeight: 'bold' }}>R$ {prod.price.toFixed(2)}</td>
                            <td style={{ padding: '15px', fontSize: '13px', color: '#707EAE' }}>
                                {/* CORREÇÃO: O Typescript agora sabe que 'compositions' é uma lista */}
                                {prod.compositions?.map((c, i) => (
                                    <span key={i} style={{ display: 'block' }}>
                                            • {c.rawMaterial?.name} ({c.requiredQuantity})
                                        </span>
                                ))}
                            </td>
                            <td style={{ padding: '15px' }}>
                                <button onClick={() => handleDelete(prod.id!)} style={{ background: '#FFF0F0', color: '#E53E3E', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                                    <Trash size={18} />
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
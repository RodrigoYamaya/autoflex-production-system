import { useEffect, useState } from 'react';
import api from './services/api';
import  type { Product } from './types';

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Tenta buscar os produtos do Back-end assim que a tela abre
        api.get('/products')
            .then(response => {
                console.log("DADOS RECEBIDOS DO JAVA:", response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error("ERRO AO CONECTAR:", error);
                alert("Erro ao conectar com o Back-end! Verifique se o Java está rodando.");
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Teste de Conexão</h1>
            {products.length === 0 ? (
                <p>Carregando ou nenhum produto encontrado...</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - R$ {product.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
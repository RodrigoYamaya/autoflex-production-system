import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout'; // <--- Importe o Layout novo
import { RawMaterials } from './pages/RawMaterials';

export function Router() {
    return (
        <Routes>
            {/* Envolvemos tudo no Route do Layout */}
            <Route path="/" element={<Layout />}>

                {/* Todas essas telas vão renderizar DENTRO do Layout (no lugar do Outlet) */}
                <Route index element={<h1>🏠 Dashboard Principal</h1>} />
                <Route path="/products" element={<h1>📦 Produtos</h1>} />
                <Route path="/raw-materials" element={<RawMaterials />} />
                <Route path="/planning" element={<h1>📊 Planejamento</h1>} />

            </Route>
        </Routes>
    );
}
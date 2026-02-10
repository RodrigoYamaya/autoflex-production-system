import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import { Dashboard } from './pages/Dashboard';
import { RawMaterials } from './pages/RawMaterials';
import { Products } from './pages/Products';
import { Planning } from './pages/Planning';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {}
                <Route index element={<Dashboard />} />

                <Route path="/raw-materials" element={<RawMaterials />} />
                <Route path="/products" element={<Products />} />
                <Route path="/planning" element={<Planning />} />
            </Route>
        </Routes>
    );
}
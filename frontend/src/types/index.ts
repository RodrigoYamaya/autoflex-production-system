
export interface RawMaterial {
    id?: number;
    name: string;
    stockQuantity: number;
}

export interface ProductComposition {
    id?: number;
    rawMaterial: RawMaterial;
    requiredQuantity: number;
}

export interface Product {
    id?: number;
    name: string;
    price: number;
    compositions: ProductComposition[];
}


export interface ProductionItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
}

export interface PlanningResponse {
    items: ProductionItem[];
    grandTotal: number;
}
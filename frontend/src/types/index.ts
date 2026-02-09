//exportar as classes do java
export interface RawMaterial {

    id?:number;
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
    composition: ProductComposition[];
}


export interface ProductionPlanItem {
    productName: string;
    quantityToProduce: number;
}

export interface ProductionPlanResponse {
    productionList: ProductionPlanItem[];
    grandTotalValue: number;
}

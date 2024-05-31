export type ProductDetails = {
    id: string;
    title: string;
    picture: string;
    price: {
        amount: number;
        decimals: number;
    };
    description: string;
    condition: string;
    sold_quantity: number;
}

export type Item = {
    title: string;
    picture: string;
    price: {
        amount: number;
        decimals: number;
        currency: string;
    }
    condition: string;
    free_shipping: boolean;
    id: string;
}

export type ProductResponse = {
    author: {
        name: string;
        lastname: string;
    };
    items: Item[];
    categories: string[];
}
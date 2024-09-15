export interface iBooks {
    code: string;
    title: string;
    author: string;
    stock: number;
}[]

export interface iNewBook {
    id?: string;
    code: string;
    title: string;
    author: string;
    stock: number;
}

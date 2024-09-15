export interface iNewBorrow {
    user_code: string;
    book_code : string;
}

export interface iBorrow {
    user_code :string;
    book_code : string;
    return_date:  Date;
    borrow_date: Date;
    status: string;
}
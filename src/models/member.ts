export interface iNewMember {
    id?: string;
    code: string;
    name: string;
    is_penalized?: boolean;
    penalty_end_date?: Date;
}

export interface iMember {
    id: string;
    code: string;
    name: string;
    is_penalized: boolean;
    penalty_end_date: Date;
}


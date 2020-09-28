export interface Answer {
    id?: string;
    answer?: string;
    user_id?: string;
    votes?: Vote[];
}

export interface Vote {
    user_id: string;
    points: number;
}

export interface Card {
    id: number;
    title: string;
}

export interface Board {
    id: number;
    title: string;
    cards: Card[];
}
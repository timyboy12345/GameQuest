import {Question} from "./question.interface";
import {Answer} from "./answer.interface";
import {User} from "./user.interface";

export interface Game {
    id: string;
    questions?: Question[];
    answers?: Answer[];
    code: string;
    state: GameState;
    data?: {
        name?: string;
        participants: User[];
    }
}

export enum GameState {
    "queue",
    "playing",
    "finished"
}

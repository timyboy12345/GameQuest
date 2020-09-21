import {Question} from "./question.interface";
import {Answer} from "./answer.interface";

export interface Game {
    id: string;
    questions?: Question[];
    answers?: Answer[];
    data?: {
        participants: any[];
    }
}

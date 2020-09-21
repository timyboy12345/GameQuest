import {Answer} from "./answer.interface";

export interface Question {
    id?: string;
    question?: string;
    answers?: Answer[];
}

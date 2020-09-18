import {Answer} from "./Answer";

export interface Question {
    id?: string;
    question?: string;
    answers?: Answer[];
}
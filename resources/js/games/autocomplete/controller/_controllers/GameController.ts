import Pusher from 'pusher-js';

export class GameController {
    public time: number = 0;

    constructor() {
        const pusher = new Pusher('0987733250dbc083e988', {
            cluster: 'eu'
        });

        pusher.subscribe('test').bind('question', (value) => {
            console.log(value);
        })
    }

    public start() {
        console.log("BOE");
        console.log(this.time);
    }
}
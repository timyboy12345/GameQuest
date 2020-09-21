import * as PN from 'pubnub/dist/web/pubnub.js';
import PubNub = require("pubnub");
import {UserService} from "./UserService";
import {GameService} from "./GameService";

export class ListeningService {
    constructor(public gameService: GameService) {
        const uuid = UserService.getUuid();

        const listener: PubNub = new PN({
            publishKey : process.env.MIX_PUBNUB_PUBLISH_KEY,
            subscribeKey : process.env.MIX_PUBNUB_SUBSCRIBE_KEY,
            uuid: uuid,
        })

        listener.addListener({
            message: function(msg) {
                console.log(msg);
            }
        })

        listener.subscribe({
            channels: ['test'],
        })

        listener.publish({
            channel: 'test',
            message: {
                'title': 'test'
            },
        }).then(value => {
            console.log(value)
        }).catch(reason => {
            console.error(reason);
        })
    }
}

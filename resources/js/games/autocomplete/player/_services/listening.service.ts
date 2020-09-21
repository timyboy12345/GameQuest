import * as PN from 'pubnub/dist/web/pubnub.js';
import PubNub = require("pubnub");
import {UserService} from "./user.service";
import {Game} from "../../_models/game.interface";
import {User} from "../../_models/user.interface";

export class ListeningService {
    private _listener: PubNub;

    constructor() {
        const uuid = UserService.getUuid();

        this._listener = new PN({
            publishKey : process.env.MIX_PUBNUB_PUBLISH_KEY,
            subscribeKey : process.env.MIX_PUBNUB_SUBSCRIBE_KEY,
            uuid: uuid,
        })

        this._listener.addListener({
            message: function(msg) {
                // console.log(msg);
            }
        })

        this._listener.subscribe({
            channels: ['test'],
        })
    }

    public announceJoinedGame(user: User, game: Game) {
        this._listener.publish({
            channel: game.id,
            message: {
                'type': 'joinedGame',
                game,
                user
            },
        }).then(value => {
            console.log(value)
        }).catch(reason => {
            console.error(reason);
        })
    }
}

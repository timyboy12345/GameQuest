import * as PN from 'pubnub/dist/web/pubnub.js';
import {UserService} from "./user.service";
import {Game} from "../../_models/game.interface";
import {User} from "../../_models/user.interface";
import PubNub = require("pubnub");

export class ListeningService {
    private _listener: PubNub;

    constructor() {
        const uuid = UserService.getUuid();
        const l = this;

        this._listener = new PN({
            publishKey: process.env.MIX_PUBNUB_PUBLISH_KEY,
            subscribeKey: process.env.MIX_PUBNUB_SUBSCRIBE_KEY,
            uuid: uuid,
        });

        this._listener.addListener({
            message: function (msg) {
                if (msg.message.type != null) {
                    l.handleEvent(msg.message);
                }
            }
        });
    }

    private handleEvent(msg: any) {
        switch (msg.type) {
            case "askQuestions":
                const evt = new CustomEvent("askQuestions", {
                    detail: msg
                });
                window.dispatchEvent(evt);
                break;
        }
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

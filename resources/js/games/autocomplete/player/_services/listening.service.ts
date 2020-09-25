import * as PN from 'pubnub/dist/web/pubnub.js';
import {UserService} from "./user.service";
import {PublishResponse} from "pubnub";
import {GameController} from "../_controllers/game.controller";
import PubNub = require("pubnub");

export class ListeningService {
    private _listener: PubNub;

    constructor(private gameController: GameController) {
        const uuid = UserService.getUuid();
        const l = this;

        this._listener = new PN({
            publishKey: process.env.MIX_PUBNUB_PUBLISH_KEY,
            subscribeKey: process.env.MIX_PUBNUB_SUBSCRIBE_KEY,
            uuid: uuid,
        });

        this._listener.addListener({
            message: function (msg) {
                if (msg.message.destination != null) {
                    if (msg.message.destination != 'player') {
                        return;
                    }
                }

                if (msg.message.type != null) {
                    l.handleEvent(msg.message);
                }
            }
        });
    }

    private async handleEvent(msg: any) {
        console.log(msg);
        switch (msg.type) {
            case "askQuestions":
                // Check if the questions are for the logged in user
                const user = await this.gameController.userService.getSavedPlayerInfo();

                if (msg.player.id == user.id) {
                    const evt = new CustomEvent("askQuestions", {
                        detail: msg
                    });
                    window.dispatchEvent(evt);
                }

                break;
            case "voteOnAnswers":
                const evt = new CustomEvent("voteOnAnswers", {
                    detail: msg
                });
                window.dispatchEvent(evt);

                break;
        }
    }

    public broadcast(data: {}): Promise<PublishResponse> {
        return this._listener.publish({
            channel: this.gameController.gameService.getGameUuid(),
            message: data,
        }).then(value => {
            return value;
        }).catch(reason => {
            console.error(reason);
            return reason;
        })
    }

    public listen(id: string) {
        this._listener.subscribe({
            channels: [id],
        })
    }
}

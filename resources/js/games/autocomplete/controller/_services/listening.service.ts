import * as PN from 'pubnub/dist/web/pubnub.js';
import {GameService} from "./game.service";
import {PlayerService} from "../../player/_services/player.service";
import PubNub = require("pubnub");
import {PublishResponse} from "pubnub";

export class ListeningService {
    private _playerService: PlayerService;
    private _listener: PubNub;

    constructor(public gameService: GameService) {
        const l = this;
        this._playerService = new PlayerService();

        this._playerService.getPlayer().then(player => {
            this._listener = new PN({
                publishKey: process.env.MIX_PUBNUB_PUBLISH_KEY,
                subscribeKey: process.env.MIX_PUBNUB_SUBSCRIBE_KEY,
                uuid: player.id,
            });

            this._listener.addListener({
                message: function (msg) {
                    if (msg.message.destination != null) {
                        if (msg.message.destination != 'controller') {
                            return;
                        }
                    }

                    if (msg.message.type != null) {
                        console.log(msg);
                        l.handleEvent(msg.message);
                    }
                }
            });
        });
    }

    private handleEvent(msg: any) {
        switch (msg.type) {
            case "joinedGame":
                const evt = new CustomEvent("playerJoined", {
                    detail: msg
                });
                window.dispatchEvent(evt);
                break;
        }
    }

    public listen(id: string) {
        this._listener.subscribe({
            channels: [id],
        })
    }

    public broadcast(data: {}): Promise<PublishResponse> {
        return this._listener.publish({
            channel: this.gameService.getGameUuid(),
            message: data,
        }).then(value => {
            return value;
        }).catch(reason => {
            console.error(reason);
            return reason;
        })
    }
}

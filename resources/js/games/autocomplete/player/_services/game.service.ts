import {CookieUtil} from "../../../_utils/CookieUtil";
import {Game} from "../../_models/game.interface";
import axios from "axios";
import {GameController} from "../_controllers/game.controller";

export class GameService {
    static GAME_UUID_IDENTIFIER = 'autocomplete_player_game_uuid';

    public constructor(private readonly gameController: GameController) {
    }

    public getGameUuid(): string {
        if (CookieUtil.hasCookie(GameService.GAME_UUID_IDENTIFIER)) {
            return CookieUtil.getCookie(GameService.GAME_UUID_IDENTIFIER);
        }

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        if (params.has("gameId")) {
            return params.get("gameId");
        }

        return null;
    }

    /**
     * Sets the game UUID
     * @param value The game UUID
     */
    public setGameUuid(value): void {
        return CookieUtil.setCookie(GameService.GAME_UUID_IDENTIFIER, value);
    }

    /**
     * Return details of a game
     * @param gameId The ID of the game to get
     */
    public getGame(gameId: string): Promise<Game> {
        return axios.get(`/api/games/game/${gameId}`)
            .then(value => {
                return value.data;
            });
    }

    /**
     * Gets the current game
     */
    public getCurrentGame(): Promise<Game> {
        const gameId = this.getGameUuid();

        if (gameId != null) {
            return this.getGame(gameId).then(value => {
                return value;
            }).catch(reason => {
                this.reset();
                return null;
            });
        } else {
            return Promise.resolve(null);
        }
    }

    public async getParticipants(): Promise<any> {
        const uuid = this.getGameUuid();

        await this.getGame(uuid).then(game => {
            return game.data.participants;
        }).catch(reason => {

        })
    }

    public reset() {
        CookieUtil.deleteCookie(GameService.GAME_UUID_IDENTIFIER);
    }
}

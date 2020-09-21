import {CookieUtil} from "../../../_utils/CookieUtil";
import {Game} from "../_models/game.interface";
import axios from 'axios';

export class GameService {
    get game(): Game {
        return this._game;
    }

    static GAME_UUID_IDENTIFIER = 'autocomplete_game_uuid';

    private _game: Game;

    static getGameUuid(): string {
        return CookieUtil.getCookie(this.GAME_UUID_IDENTIFIER);
    }

    public getGames(): Promise<Game> {
        return axios.get(`/api/games/`).then(value => {
            return value.data;
        });
    }

    /**
     * Return details of a game
     * @param gameId The ID of the game to get, if no game ID is given the details of the current game are returned
     */
    public getGame(gameId: string = null): Promise<Game> {
        if (gameId == null) {
            gameId = GameService.getGameUuid();
        }

        return axios.get(`/api/games/${gameId}`).then(value => {
            this._game = value.data;
            return value.data;
        });
    }

    public async getParticipants(): Promise<any> {
        const uuid = GameService.getGameUuid();

        await this.getGame(uuid).then(game => {
            return game.data.participants;
        }).catch(reason => {

        })
    }
}

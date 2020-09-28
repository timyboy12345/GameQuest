import {CookieUtil} from "../../../_utils/CookieUtil";
import {Game} from "../../_models/game.interface";
import axios from 'axios';
import {GameController} from "../_controllers/game.controller";
import {Question} from "../../_models/question.interface";

export class GameService {
    static GAME_UUID_IDENTIFIER = 'autocomplete_game_uuid';

    public constructor(private readonly gameController: GameController) {
    }

    public getGameUuid(): string {
        return CookieUtil.getCookie(GameService.GAME_UUID_IDENTIFIER);
    }

    /**
     * Sets the game UUID
     * @param value The game UUID
     */
    public setGameUuid(value): void {
        return CookieUtil.setCookie(GameService.GAME_UUID_IDENTIFIER, value);
    }

    public getGames(): Promise<Game> {
        return axios.get(`/api/games/`)
            .then(value => {
                return value.data;
            })
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
            return game.players;
        }).catch(reason => {

        })
    }

    public reset() {
        CookieUtil.deleteCookie(GameService.GAME_UUID_IDENTIFIER);
    }

    public async startNewGame(): Promise<Game> {
        const c = this.gameController;
        const t = this;

        const game = await axios.post('/api/games/game', {
            type: 'autocomplete'
        })
            .then(data => {
                const g: Game = data.data;
                t.setGameUuid(g.id);

                return data;
            });

        return game.data;
    }

    public saveQuestions(questions: Question[]): Promise<Game> {
        return axios.put(`/api/games/game/${this.getGameUuid()}/questions`, {
            questions
        })
            .then(value => {
                return value.data;
            })
    }
}

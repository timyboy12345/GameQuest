import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {User} from "../../_models/user.interface";

export class UserService {
    public static LOCALSTORAGE_PLAYER_IDENTIFIER = 'autocomplete_player_uuid';

    /**
     * Returns the device/player UUID of the player
     * @returns string
     */
    static getUuid() {
        if (localStorage.getItem(this.LOCALSTORAGE_PLAYER_IDENTIFIER) == null) {
            const uuid = uuidv4();
            localStorage.setItem(this.LOCALSTORAGE_PLAYER_IDENTIFIER, uuid);
        }

        return localStorage.getItem(this.LOCALSTORAGE_PLAYER_IDENTIFIER);
    }

    public async getPlayerInfo(): Promise<User> {
        return await axios.get('/api/user').then(value => {
            return value.data;
        });
    }
}

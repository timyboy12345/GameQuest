import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {User} from "../../_models/user.interface";

export class UserService {
    private _user: User;

    public async getPlayerInfo(): Promise<User> {
        return await axios.get('/api/user').then(value => {
            this._user = value.data;
            return value.data;
        });
    }

    public async getSavedPlayerInfo(): Promise<User> {
        if (this._user) {
            return Promise.resolve(this._user);
        } else {
            return this.getPlayerInfo();
        }
    }
}

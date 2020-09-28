import axios from 'axios';
import {User} from "../../_models/user.interface";

export class PlayerService {
    public getPlayer(): Promise<User> {
        return axios.get('/api/user')
            .then(value => {
                return value.data;
            })
    }
}

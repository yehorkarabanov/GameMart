import axios from 'axios';
import {store} from "../redux/store";
import {checkAToken} from "../redux/slices/userSlice";


const baseAxiosSettings = {
    baseURL: 'http://127.0.0.1:8000/backend',
    timeout: 5000,
}

const apiInstance = axios.create(baseAxiosSettings);


export const apiLoginInstance = async () => {
    await store.dispatch(checkAToken());
    const user = store.getState().user;
    if (user.isLogin) {
        return axios.create({
            ...baseAxiosSettings,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.access,
            }
        });
    }
    return null
};

export default apiInstance;
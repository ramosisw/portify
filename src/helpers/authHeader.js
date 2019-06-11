import { config } from '../config';

export function authHeader() {
    const user = JSON.parse(localStorage.getItem(config.loggedItem));

    const contentType = {
        'Content-Type': 'application/json'
    };

    if (user && user.access_token) {
        return { 'Authorization': 'Bearer ' + user.access_token, ...contentType };
    } else {
        return { ...contentType };
    }
}

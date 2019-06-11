import { config } from '../config';
import { authHeader, handleResponse } from '../helpers';



const getMe = async () => {
    const opts = {
        method: 'GET',
        headers: {
            ...authHeader()
        }
    };
    const url = `${config.spotifyApi.url}/me`;
    console.log(`Fetch GET: ${url}`);
    return await fetch(url, opts).then(handleResponse);
}


export const spotifyService = {
    getMe
}
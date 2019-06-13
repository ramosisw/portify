import { config } from '../config';
import { authHeader, handleResponse } from '../helpers';
import queryString from 'query-string';

const processFetchOptions = (options) => {
    const { offset, limit } = options;
    return options = {
        offset: offset || 0,
        limit: limit || 50
    };
}

/**
 * get user info
 */
const getMe = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader()
        }
    };
    const url = `${config.spotifyApi.url}/me`;
    return await fetch(url, requestOptions).then(handleResponse);
}

/**
 * Get playlists of user
 * @param {SpotifyFetch} fetchOptions
 */
const getPlaylists = async (fetchOptions) => {
    fetchOptions = processFetchOptions(fetchOptions);
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader()
        }
    };
    var queryParams = queryString.stringify(fetchOptions);
    const url = `${config.spotifyApi.url}/me/playlists?${queryParams}`;
    return await fetch(url, requestOptions).then(handleResponse);
}

/**
 * 
 * @param {string} playlist_id 
 * @param {SpotifyFetch} fetchOptions 
 */
const getPlaylistTracks = async (playlist_id, fetchOptions) => {
    fetchOptions = processFetchOptions(fetchOptions);
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader()
        }
    };
    var queryParams = queryString.stringify(fetchOptions);
    const url = `${config.spotifyApi.url}/playlists/${playlist_id}/tracks?${queryParams}`;
    return await fetch(url, requestOptions).then(handleResponse);
}

const getTracks = async (fetchOptions) => {
    fetchOptions = processFetchOptions(fetchOptions);
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader()
        }
    };
    var queryParams = queryString.stringify(fetchOptions);
    const url = `${config.spotifyApi.url}/me/tracks?${queryParams}`;
    return await fetch(url, requestOptions).then(handleResponse);
}

export const spotifyService = {
    getMe,
    getPlaylists,
    getPlaylistTracks,
    getTracks
}
import { spotifyService } from '../services';

/**
 * 
 * @param {*} options 
 */
const _getAllPlaylists = async (options = {}) => {
    let { playlists, offset, limit } = options;
    playlists = playlists || { items: [] };
    await spotifyService.getPlaylists({ offset, limit }).then(async data => {
        playlists = {
            total: data.total,
            items: [...playlists.items, ...data.items]
        };
        if (data.next) return await _getAllPlaylists({
            playlists,
            offset: data.offset + data.limit,
            limit: data.limit
        });
        return playlists;
    }, error => {
        throw (error);
    });
    return playlists;
}

/**
 * 
 * @param {*} options 
 */
const _getAllPlaylistTracks = async (options = {}) => {
    let { tracks, playlist_id, offset, limit } = options;
    await spotifyService.getPlaylistTracks(playlist_id, { offset, limit }).then(async data => {
        tracks = tracks || { items: [] };
        const filterTracks = data.items.filter(item => {
            return !item.is_local && item.track !== null;
        });
        const playlistTracks = filterTracks.map(track => {
            const { id, name, uri } = track.track;
            return {
                id,
                name,
                uri
            };
        });

        tracks = {
            items: [...tracks.items, ...playlistTracks]
        };

        if (data.next) return await _getAllPlaylistTracks({
            tracks,
            playlist_id,
            offset: data.offset + data.limit,
            limit: data.limit
        });

        return tracks;
    }, error => {
        throw (error);
    });
    return tracks;
};

/**
 * 
 */
const _getAllTracks = async (options = {}) => {
    let { tracks, offset, limit } = options;
    tracks = tracks || { items: [] };
    await spotifyService.getTracks({ offset, limit }).then(async data => {
        const filterTracks = data.items.filter(item => {
            return !item.is_local && item.track !== null;
        });

        const userTracks = filterTracks.map(track => {
            const { id, name, uri } = track.track;
            return {
                id,
                name,
                uri
            };
        });

        tracks = {
            items: [...tracks.items, ...userTracks]
        };

        if (data.next) return await _getAllTracks({
            tracks,
            offset: data.offset + data.limit,
            limit: data.limit
        });
        return tracks;
    }, error => {
        throw (error);
    });
    return tracks;
};

const exportData = async () => {
    return new Promise(async (resolve, reject) => {
        let exportObject = {
            version: 1,
            user_id: "",
            display_name: "",
            follow_playlists: [],
            playlists: [],
            tracks: [],
        };

        await _getAllTracks().then(tracks => {
            exportObject.tracks = tracks.items;
        }, error => {
            reject(error);
        });

        await spotifyService.getMe().then(data => {
            exportObject.user_id = data.id;
            exportObject.display_name = data.display_name;
        }, error => {
            reject(error);
        });

        await _getAllPlaylists().then(async playlists => {
            const follow_playlists = playlists.items.filter(playlist => {
                return playlist.owner.id !== exportObject.user_id;
            }).map(playlist => {
                const { id, name, uri } = playlist;
                return {
                    id,
                    name,
                    uri
                };
            });

            const userPlaylists = await playlists.items.filter(playlist => {
                return playlist.owner.id === exportObject.user_id;
            }).map(async playlist => {
                const { collaborative, id, name, uri } = playlist;
                let tracks = [];
                await _getAllPlaylistTracks({ playlist_id: playlist.id }).then(playlistTracks => {
                    tracks = playlistTracks.items;
                }, error => {
                    reject(error);
                });

                return {
                    collaborative,
                    id,
                    name,
                    public: playlist.public,
                    tracks,
                    uri
                };
            });

            exportObject.follow_playlists = follow_playlists;
            exportObject.playlists = await Promise.all(userPlaylists);
        }, error => {
            reject(error);
        });
        resolve(exportObject);
    });
};


const downloadJson = (fileName, jsonText) => {
    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonText));
    a.setAttribute('download', fileName);
    if (document.createEvent) {
        const e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        a.dispatchEvent(e);
    } else {
        a.click();
    }
};

export const appService = {
    downloadJson,
    exportData,
}
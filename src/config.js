const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const config = {
    isDevelopment,
    loggedItem: "user",
    homepage: isDevelopment ? "" : "https://ramosisw.github.io/portify",
    spotifyApi: {
        scope: "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify playlist-read-collaborative",
        redirect_uri: isDevelopment ? "http://localhost:3000/callback" : "https://ramosisw.github.io/callback",
        client_id: "ba0034384cb24045a078ea5ceae26480"
    }
};

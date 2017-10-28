
const path = require('path');
const ytdl = require('youtube-dl');
const data = require('./data');
const Url = require('url');
const {sequence} = require('./utils');

const START_PLAYLIST_ID = process.env.START_PLAYLIST_ID;
let startedPlaylistId = false;

function playlistDownloader(name, url, dir) {
    console.log(`Starting download url=${url}, name=${name}, dir=${dir}`);
    if (START_PLAYLIST_ID && !startedPlaylistId) {
        if(Url.parse(url, true).query.list === START_PLAYLIST_ID) {
            console.log('START from PLAYLIST ID='+START_PLAYLIST_ID);
            startedPlaylistId = true;
        } else {
            console.log('Not found START PLAYLIST ID='+START_PLAYLIST_ID);
            return Promise.resolve();
        }
    }
    return new Promise((resolve, reject) => {
        ytdl.exec(url, ['--ignore-config', '--yes-playlist', '-r', '3M', '--fragment-retries', '10', '-f', 'mp4', '--all-subs', '--audio-format', 'mp3', '-o', path.join(dir, name,'%(playlist_title)s','%(title)s.%(ext)s')], {}, function (err, output) {
            if (err) {
                return reject(err);
            }
            resolve(output);
        });
    });
}

function downloadSource(sourceName) {
    console.log('Starting download source ' + sourceName);
    const playlists = data.getPlaylists(sourceName);

    return sequence(playlists, url => playlistDownloader(sourceName, url, process.env.OUTPUT_DIR));
}


function start() {
    const sources = data.getSourceNames();

    return sequence(sources, source => downloadSource(source));
}

start().then(() => console.log('END!')).catch(e => console.error(e));
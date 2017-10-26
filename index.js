
const path = require('path');
const ytdl = require('youtube-dl');
const data = require('./data');


function playlistDownloader(name, url, dir) {
    console.log(`Starting download url=${url}, name=${name}, dir=${dir}`);
    return new Promise((resolve, reject) => {
        ytdl.exec(url, ['--ignore-config', '--yes-playlist', '-r', '1M', '--fragment-retries', '10', '-f', 'mp4', '--all-subs', '--audio-format', 'mp3', '-o', path.join(dir, name,'%(playlist_title)s','%(title)s.%(ext)s')], {}, function (err, output) {
            if (err) {
                return reject(err);
            }
            resolve(output);
        });
    });
}

function sequence(tasks, fn) {
    return tasks.reduce((promise, task) => promise.then(() => fn(task)), Promise.resolve());
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

const fs = require('fs');
const path = require('path');

exports.getSourceNames = function getSourceNames() {
    return fs.readdirSync(path.join(__dirname, 'sources'), 'utf8').map(file => path.basename(file, '.txt'));
}

exports.getPlaylists = function getPlaylists(sourceName) {
    const p = path.join(__dirname, 'sources', sourceName + '.txt');
    return fs.readFileSync(p, 'utf8').split('\n').filter(line => line && line.length > 10);
}

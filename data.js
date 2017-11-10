
const fs = require('fs');
const path = require('path');
const Url = require('url');

exports.getSourceNames = function getSourceNames() {
    return fs.readdirSync(path.join(__dirname, 'sources'), 'utf8').map(file => path.basename(file, '.txt'));
}

exports.getUrls = function getItems(sourceName) {
    const p = path.join(__dirname, 'sources', sourceName + '.txt');
    return fs.readFileSync(p, 'utf8').split('\n').filter(line => line && line.length > 10);
}

exports.isPlaylistUrl = function (item) {
    return typeof Url.parse(item, true).query.list === 'string';
}

exports.isUserUrl = function (item) {
    return /\/user\//.test(item);
}

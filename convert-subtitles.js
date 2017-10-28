
const fs = require('fs');
const vtt2srt = require('./vtt2srt');
const glob = require('glob');
const path = require('path');
const { sequence } = require('./utils');

function getFiles(dir) {
    return new Promise((resolve, reject) => {
        glob(path.join(dir, '**/*.vtt'), (error, files) => {
            if (error) {
                return reject(error);
            }
            resolve(files);
        });
    });
}

function convertFile(file) {
    console.log('converting file ' + file);
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(vtt2srt())
            .pipe(fs.createWriteStream(file.substr(0, file.length - 3) + 'srt'))
            .on('close', () => {
                console.log(`converted file ${file}`);
                resolve();
            })
            .on('error', reject);
    });
}

exports.convertDir = function convertDir(dir) {
    // return getFiles(dir).then(files => {
    //     files.forEach(file => convertFile(file));
    // });
    return getFiles(dir).then(files => sequence(files, file => convertFile(file)));
}

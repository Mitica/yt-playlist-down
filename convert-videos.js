
const fs = require('fs');
const convert = require('./mp4tomkv');
const glob = require('glob');
const path = require('path');
const { sequence } = require('./utils');

function getFiles(dir) {
    return new Promise((resolve, reject) => {
        glob(path.join(dir, '**/*.mp4'), (error, files) => {
            if (error) {
                return reject(error);
            }
            resolve(files);
        });
    });
}

function convertFile(file) {
    console.log('converting file ' + file);
    return convert(file).then(() => console.log('converted ' + file));
}

exports.convertDir = function convertDir(dir) {
    // return getFiles(dir).then(files => {
    //     files.forEach(file => convertFile(file));
    // });
    return getFiles(dir).then(files => sequence(files, file => convertFile(file)));
}


const DIR = process.env.DIR;

if(!DIR || typeof DIR !== 'string') {
    throw new Error('DIR is required');
}

const {convertDir} = require('./convert-subtitles');

convertDir(DIR).then(() => console.log('OK!')).catch(error => console.error(error));

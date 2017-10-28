const through = require('through2');
const split = require('split2');
const pumpify = require('pumpify');

module.exports = function () {

    let lineCount = 1;

    const write = (line, enc, cb) => {

        if (!line.trim()) return cb();

        let newLine = line
            .replace(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g, '')
            .replace(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g, '$1,$2-->$3,$4')
            .replace(/\<.+\>(.+)/g, '$1')
            .replace(/\<.+\>(.+)\<.+\/\>/g, '$1') + '\r\n';

        if (!newLine.trim()) return cb();
        if (/(\d{2}:\d{2}:\d{2})\,(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\,(\d{3}\s*)/.test(newLine)) {
            newLine = `${lineCount}\r\n` + newLine;
            if (lineCount > 1) {
                newLine = '\r\n' + newLine;
            }
            lineCount++;
        } else if (lineCount < 2) {
            return cb();
        }

        cb(null, newLine);

    };

    return pumpify(split(), through.obj(write));

};

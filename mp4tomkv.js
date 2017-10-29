
// const ffmpeg = require('ffmpeg');
const cmd = require('node-cmd');

module.exports = function (file) {
    return new Promise((resolve, reject) => {
        const outfile = file.substr(0, file.length - 3) + 'mkv';
        cmd.get(`ffmpeg -i "${file}" "${outfile}"`, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// module.exports = function (file) {
//     return new Promise((resolve, reject) => {
//         try {
//             new ffmpeg('+' + file + '"')
//                 .then(video => {
//                     console.log('video', video)
//                     // video.addComment('-f', 'mkv');
//                     return video.save('"' + file.substr(0, file.length - 3) + 'mkv"');
//                 })
//                 .then(resolve).catch(reject);
//         } catch (e) {
//             reject(e);
//         }
//     });
// }

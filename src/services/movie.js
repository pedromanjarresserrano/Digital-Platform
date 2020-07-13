const fs = require('fs')

var ffmpeg = require('fluent-ffmpeg');


async function generatePreviews(params) {
    let images = new Array();
    let ratio = params.ratio[0] / params.ratio[1]
    let height = 240;
    let width;
    if (ratio)
        width = Math.round(height * ratio)
    else
        width = 450

    for (let porcent = 1; porcent <= 100; porcent += 10) {
        let nameFile = params.name + "-thumbnail-" + porcent + ".png";
        if (!fs.existsSync(__dirname + "/../public/thumbnail" + nameFile)) {
            await getScreenShot(params.url, nameFile, porcent, width, height)
            images.push(nameFile)
        } else {
            images.push(nameFile)
        }
    }


    return images;

}


const getScreenShot = (url, nameFile, porcent, width, height) => {
    return new Promise((resolve, reject) => {
        return ffmpeg({ source: url, nolog: true })
            .on('error', async function (err) {
                console.log('an error happened: ' + err.message);
                return reject(err.message);
            })
            .on('end', async function (d) {
                return resolve(d)

            }).takeScreenshots({
                timestamps: [porcent + '%'],
                filename: nameFile,
                folder: __dirname + "/../../public/thumbnail",
                size: width + 'x' + height
            }, __dirname + "/../../public/thumbnail", function (err, filenames) {
                return resolve(filenames)
            });
    });
}


module.exports = {
    generatePreviews
}
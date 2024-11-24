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
       // let nameFile = params.name +params.name + "-thumbnail-" + porcent + ".png";
        let nameFile =`${params.name}-thumbnail-${porcent}.png`        
        if (!fs.existsSync(__dirname + "/../public/" + (process.env.DIRTHUMBNAIL ? process.env.DIRTHUMBNAIL : "thumbnail/") + nameFile)) {
            await getScreenShot(params.url, params.name, nameFile, porcent, width, height)
            images.push(nameFile)
        } else {
            images.push(nameFile)
        }
    }


    return images;

}


const getScreenShot = (url,folder, nameFile, porcent, width, height) => {
    return new Promise((resolve, reject) => {
        const dd = __dirname + "/../../public/" + (process.env.DIRTHUMBNAIL ? process.env.DIRTHUMBNAIL : "thumbnail") + "/" + folder
        if (!fs.existsSync(dd)) {
            fs.mkdirSync(dd);
        }
        return ffmpeg({ source: url, nolog: true, timeout: 1 })
            .on('error', async function (err) {
                console.log('an error happened: ' + err.message);
                return reject(err.message);
            })
            .on('end', async function (d) {
                return resolve(d)

            }).takeScreenshots({
                timestamps: [porcent + '%'],
                filename: nameFile,
                folder: dd,
                size: width + 'x' + height
            }, dd, function (err, filenames) {
                if (err)
                    return reject(err.message);

                return resolve(filenames)
            });
    });
}


module.exports = {
    generatePreviews
}
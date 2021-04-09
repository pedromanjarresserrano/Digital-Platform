const models = require("../models");
const { capitalizeFirstLetter } = require("../utils/text");
const Actors = models.actormodel;
const Movies = models.moviemodel;
const Categories = models.categoriamodel;
const Studios = models.studioSchema;
const socketServer = require("../services/socket").socketServer

async function specialName(req, res) {
    let list = await Movies.find({});
    let process = 0;
    const size = list.length;
    for (let i = 0; i < size; i++) {
        const e = list[i];

        if (e.name) {
            if (!e.visualname || req.query.remake) {
                let count = (e.name.match(/\./g) || []).length;
                if (count >= 4) {
                    let splitted = e.name.split(".");
                    let actor = {};
                    actor = await Actors.findOne({ name: splitted[4] });
                    if (actor)
                        e.reparto.push(actor)

                    if (splitted[5]) {
                        splitted[5] = capitalizeFirstLetter(splitted[5]);
                        splitted[4] = capitalizeFirstLetter(splitted[4]);
                        actor = await Actors.findOne({ name: splitted[4] + " " + splitted[5] });
                        if (actor)
                            e.reparto.push(actor)
                    }
                    e.reparto = []
                    for (let j = 0; j < splitted.length; j++) {
                        if (splitted[j] == "and") {
                            splitted[j - 1] = capitalizeFirstLetter(splitted[j - 1]);
                            splitted[j - 2] = capitalizeFirstLetter(splitted[j - 2]);
                            actor = await Actors.findOne({ name: splitted[j - 1] });
                            if (!actor) {
                                actor = await Actors.findOne({ name: splitted[j - 2] + " " + splitted[j - 1] })
                            }
                            if (actor)
                                e.reparto.push(actor)
                            if (splitted[j + 1]) {
                                splitted[j + 1] = capitalizeFirstLetter(splitted[j + 1]);
                                actor = await Actors.findOne({ name: splitted[j + 1] });
                            }
                            if (actor)
                                e.reparto.push(actor)

                            if (splitted[j + 2]) {
                                splitted[j + 2] = capitalizeFirstLetter(splitted[j + 2]);
                                actor = await Actors.findOne({ name: splitted[j + 1] + " " + splitted[j + 2] });
                            }
                            if (actor)
                                e.reparto.push(actor)

                        }

                    }
                    e.visualname = capitalizeFirstLetter(splitted[0]) + " - " + capitalizeFirstLetter(splitted.slice(4).join(" "));
                    e.year = parseInt("20" + splitted[1])
                    e.studio = capitalizeFirstLetter(splitted[0])
                    await Movies.findByIdAndUpdate({ _id: e._id }, { $set: e });
                }
                if (count == 0) {
                    e.visualname = e.name.replace(".", " ");
                    await Movies.findByIdAndUpdate({ _id: e._id }, { $set: e });
                }
            }
        }
        try {
            process = Math.floor((i + 1) * 100 / (size), 0)
            if (socketServer.socket)
                socketServer.socket.emit("RMF", { process, name: e.name })
        } catch (error) {
            console.log(error);
        }
    }
    res.send({ msg: "ok" })
}

async function fullfixes(req, res) {

    try {
        let listA = await Actors.find({});
        let find = {
            "$and": [{
                "$or": [{}]
            }, {
                "$and": [{}]
            }]
        }
        let process = 0;
        for (let i = 0; i < listA.length; i++) {
            const a = listA[i];

            find["$and"][0]["$or"][0] = {
                "visualname": { $regex: '.*' + a.name.toLowerCase() + '.*', $options: 'i' }
            }

            find["$and"][0]["$or"][1] = {
                "visualname": { $regex: '.*' + a.name.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][2] = {
                "visualname": { $regex: '.*' + a.name.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
            }


            find["$and"][0]["$or"][3] = {
                "name": { $regex: '.*' + a.name.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][4] = {
                "name": { $regex: '.*' + a.name.toLowerCase() + '.*', $options: 'i' }
            }

            find["$and"][0]["$or"][5] = {
                "name": { $regex: '.*' + a.name.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
            }
            if (a.alias) {

                find["$and"][0]["$or"][6] = {
                    "visualname": { $regex: '.*' + a.alias.toLowerCase() + '.*', $options: 'i' }
                }

                find["$and"][0]["$or"][7] = {
                    "visualname": { $regex: '.*' + a.alias.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][8] = {
                    "visualname": { $regex: '.*' + a.alias.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
                }


                find["$and"][0]["$or"][9] = {
                    "name": { $regex: '.*' + a.alias.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][10] = {
                    "name": { $regex: '.*' + a.alias.toLowerCase() + '.*', $options: 'i' }
                }

                find["$and"][0]["$or"][11] = {
                    "name": { $regex: '.*' + a.alias.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
                }

            }



            find["$and"][1]["$and"][0] = {
                    "reparto": {
                        "$not": {
                            "$all": [a._id]
                        }
                    }
                }
                //  console.log(JSON.stringify(find));

            let listMTemp = await Movies.aggregate([{
                    $project: {
                        visualname: 1,
                        reparto: 1

                    }
                },
                {
                    "$match": find
                }
            ]);

            //   console.log(JSON.stringify(listMTemp));

            let update = listMTemp.map((movie) => {
                    movie.reparto.push(a)
                    return ({
                        updateOne: {
                            filter: { _id: movie._id },
                            update: { $set: movie },
                            upsert: true
                        }
                    })
                })
                //       console.log(JSON.stringify(update));
            await Movies.bulkWrite(update)

            try {
                process = Math.floor((i + 1) * 100 / (listA.length), 0)
                if (socketServer.socket)
                    socketServer.socket.emit("RMF", { process, name: "Fixing actors " })
            } catch (error) {
                console.log(error);
            }

        }

        process = 0;

        find = {
            "$and": [{
                "$or": [{}]
            }, {
                "$and": [{}]
            }]
        }

        let listC = await Categories.find({});

        for (let i = 0; i < listC.length; i++) {
            const c = listC[i];

            find["$and"][0]["$or"][0] = {
                "visualname": { $regex: '.*' + c.name.toLowerCase() + '.*', $options: 'si' }
            }


            find["$and"][0]["$or"][1] = {
                "visualname": { $regex: '.*' + c.name.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][2] = {
                "visualname": { $regex: '.*' + c.name.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
            }


            find["$and"][0]["$or"][3] = {
                "name": { $regex: '.*' + c.name.toLowerCase() + '.*', $options: 'si' }
            }


            find["$and"][0]["$or"][4] = {
                "name": { $regex: '.*' + c.name.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][5] = {
                "name": { $regex: '.*' + c.name.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
            }
            if (c.alias && c.alias.trim().length > 0) {
                find["$and"][0]["$or"][6] = {
                    "visualname": { $regex: '.*' + c.alias.toLowerCase() + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][7] = {
                    "name": { $regex: '.*' + c.alias.toLowerCase() + '.*', $options: 'si' }
                }

            }


            find["$and"][1]["$and"][0] = {
                    "categorias": {
                        "$not": {
                            "$all": [c._id]
                        }
                    }
                }
                //   console.log(JSON.stringify(find));

            let listMTemp = await Movies.aggregate([{
                    $project: {
                        visualname: 1,
                        categorias: 1

                    }
                },
                {
                    "$match": find
                }
            ]);

            // console.log(JSON.stringify(listMTemp));

            let update = listMTemp.map((movie) => {
                    movie.categorias.push(c)
                    return ({
                        updateOne: {
                            filter: { _id: movie._id },
                            update: { $set: { categorias: movie.categorias } },
                            upsert: true
                        }
                    })
                })
                //console.log("\n" + JSON.stringify(update));
            await Movies.bulkWrite(update)

            try {
                process = Math.floor((i + 1) * 100 / (listC.length), 0)
                if (socketServer.socket)
                    socketServer.socket.emit("RMF", { process, name: "Fixing categories " })
            } catch (error) {
                console.log(error);
            }
        }

        process = 0;

        find = {
            "$and": [{
                "$or": [{}]
            }, {
                "$and": [{}]
            }]
        }

        let listS = await Studios.find({});

        for (let i = 0; i < listS.length; i++) {
            const s = listS[i];

            find["$and"][0]["$or"][0] = {
                "visualname": { $regex: '.*' + s.name.toLowerCase() + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][1] = {
                "visualname": { $regex: '.*' + s.name.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][2] = {
                "visualname": { $regex: '.*' + s.name.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][3] = {
                "name": { $regex: '.*' + s.name.toLowerCase() + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][4] = {
                "name": { $regex: '.*' + s.name.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
            }

            find["$and"][0]["$or"][5] = {
                "name": { $regex: '.*' + s.name.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
            }

            if (s.alias) {
                find["$and"][0]["$or"][6] = {
                    "visualname": { $regex: '.*' + s.alias.toLowerCase() + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][7] = {
                    "visualname": { $regex: '.*' + s.alias.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][8] = {
                    "visualname": { $regex: '.*' + s.alias.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][9] = {
                    "name": { $regex: '.*' + s.alias.toLowerCase() + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][10] = {
                    "name": { $regex: '.*' + s.alias.toLowerCase().replace(/\s/g, '') + '.*', $options: 'si' }
                }

                find["$and"][0]["$or"][11] = {
                    "name": { $regex: '.*' + s.alias.toLowerCase().replace(/\s/g, '.') + '.*', $options: 'si' }
                }

            }

            find["$and"][1]["$and"][0] = {
                "studio": {
                    "$ne": s._id
                }
            }

            //console.log(JSON.stringify(find));

            let listMTemp = await Movies.aggregate([{
                    $project: {
                        visualname: 1,
                        studio: 1

                    }
                },
                {
                    "$match": find
                }
            ]);

            // console.log(JSON.stringify(listMTemp));

            let update = listMTemp.map((movie) => {
                    return ({
                        updateOne: {
                            filter: { _id: movie._id },
                            update: { $set: { studio: s } },
                            upsert: true
                        }
                    })
                })
                //console.log("\n" + JSON.stringify(update));
            await Movies.bulkWrite(update)

            try {
                process = Math.floor((i + 1) * 100 / (listS.length), 0)
                if (socketServer.socket)
                    socketServer.socket.emit("RMF", { process, name: "Fixing studios " })
            } catch (error) {
                console.log(error);
            }
        }



        res.send({ msg: "ok" });

    } catch (error) {
        console.log(error);
        res.send({ msg: "error", error })
    }
}


module.exports = {
    specialName,
    fullfixes
}
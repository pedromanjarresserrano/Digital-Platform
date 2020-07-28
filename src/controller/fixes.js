const models = require("../models");
const { capitalizeFirstLetter } = require("../utils/text");
const Actors = models.actormodel;
const Movies = models.moviemodel;
const Categories = models.categoriamodel;

async function specialName(req, res) {
    let list = await Movies.find({});
    list.forEach(async (e) => {
        if (e.name) {
            if (!e.visualname) {
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
                    for (let i = 0; i < splitted.length; i++) {
                        if (splitted[i] == "and") {
                            splitted[i - 1] = capitalizeFirstLetter(splitted[i - 1]);
                            splitted[i - 2] = capitalizeFirstLetter(splitted[i - 2]);
                            actor = await Actors.findOne({ name: splitted[i - 1] });
                            if (!actor) {
                                actor = await Actors.findOne({ name: splitted[i - 2] + " " + splitted[i - 1] });
                            }
                            if (actor)
                                e.reparto.push(actor)
                            if (splitted[i + 1]) {
                                splitted[i + 1] = capitalizeFirstLetter(splitted[i + 1]);
                                actor = await Actors.findOne({ name: splitted[i + 1] });
                            }
                            if (actor)
                                e.reparto.push(actor)

                            if (splitted[i + 2]) {
                                splitted[i + 2] = capitalizeFirstLetter(splitted[i + 2]);
                                actor = await Actors.findOne({ name: splitted[i + 1] + " " + splitted[i + 2] });
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
            }
        }
    })
    res.send({ msg: "ok" })
}

async function specialNameReparto(req, res) {

    let listA = await Actors.find({});

    let listM = await Movies.find({});
    listA.forEach(async (a) => {
        listM.forEach(async (m) => {
            const name = a.name.toLowerCase();
            if ((m.visualname && m.visualname.toLowerCase().includes(name)) || m.name.toLowerCase().includes(name)) {
                if (!findIf(m.reparto, a._id)) {
                    m.reparto.push(a);
                    await Movies.findByIdAndUpdate({ _id: m._id }, { $set: m });
                }
            }
        })
    })
    let listC = await Categories.find({});

    listM = await Movies.find({});

    listC.forEach(async (c) => {
        listM.forEach(async (m) => {
            const name = c.name.toLowerCase();
            if ((m.visualname && m.visualname.toLowerCase().includes(name)) || m.name.toLowerCase().includes(name)) {
                if (!findIf(m.categorias, c._id)) {
                    m.categorias.push(c);
                    await Movies.findByIdAndUpdate({ _id: m._id }, { $set: m });
                }
            }
        })
    })
    res.send({ msg: "ok" })
}


function findIf(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id = id)
            return true;

    }
    return false;
}

module.exports = {
    specialName,
    specialNameReparto
}
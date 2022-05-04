const mongoose = require('mongoose');
const Users = require('../models/usuario')
const Actors = require('../models/actor')
const fs = require('fs')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        console.log(process.env.MONGODB_NAME)
        mongoose.connect(process.env.MONGODB_URI_FULL || (`mongodb://${process.env.MONGODB_URI || "127.0.0.1:27017"}/${process.env.MONGODB_NAME || "movies-api"}`), {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
            .then(async (db) => {
                console.log('Database connection successful')
                var count = await Users.countDocuments().exec();
                console.log(count);
                if (count == 0) {
                    Users.create({
                        name: "admin",
                        username: "test@test.com",
                        email: "test@test.com",
                        password: "1234"
                    })
                }

                /*   var list = await Actors.find({});
                  list.forEach(element => {
                      try {
                          if (fs.existsSync('./public/' + element.imageAvatar)) {
                              //file exists
                              console.log('exist');
                          } else {
                              element.imageAvatar = '';
                              element.save();
                          }
                      } catch (err) {
                          console.error(err)
                      }
                  }); */
            })
            .catch(err => {
                console.log(err)
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()
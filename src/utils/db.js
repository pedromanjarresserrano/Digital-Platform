let mongoose = require('mongoose');


class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        console.log(process.env.MONGODB_NAME )
        mongoose.connect(`mongodb://${process.env.MONGODB_URI || "127.0.0.1:27017"}/${process.env.MONGODB_NAME || "movies-api"}`, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
            .then((db) => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()
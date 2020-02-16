let mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const server = '127.0.0.1:27017';
const database = 'moviesdb'; 
const models = require('./models');

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`, {
                useCreateIndex: true,
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
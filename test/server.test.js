const request = require('supertest');
const { moviemodel, usuariomodel } = require('../src/models');

let mongoose = require('mongoose');
const app = require('../src/server');
const PORT = 9001;
const mongoUrl = 'mongodb://127.0.0.1:27017/digital-test'

const fs = require('fs');
let datamock = JSON.parse(fs.readFileSync(__dirname + '/mocks/datamock.json'));
let movie = datamock.movie;
let user = datamock.user;
var token;


const server = app.listen(PORT)


beforeAll(async() => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    await moviemodel.deleteMany({});
    await usuariomodel.deleteMany({});
    await usuariomodel.create(user);
    await request(server)
        .post('/api/admin/signin')
        .send({ email: user.email, password: user.password })
        .expect(200)
        .then((res) => {
            token = res.body.user.token;
        });
})



test("GET /index", async() => {
    await request(server)
        .get("/index")
        .expect(200).then((res) => {
            //   console.log(res.headers);
        })

})

test("POST /movie", async() => {
    await request(server)
        .post("/api/movies")
        .set('x-access-token', token)
        .send(movie)
        .expect(200)


})

test("GET /movie/all", async() => {
    await request(server)
        .get("/api/movies/all/-1")
        .expect(200)
        .then((response) => {
            console.log(response);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            expect(response.body[0].visualname).toBe(movie.visualname);
            expect(response.body[0].name).toBe(movie.name);
            expect(response.body[0].updated).toBe(new Date(movie.updated).toISOString());
            expect(response.body[0].url).toBe(movie.url);
            expect(response.body[0].size).toBe(movie.size);

            expect(Array.isArray(response.body[0].files))

            expect(response.body[0].files[0]).toBe(movie.files[0]);
        })


})


afterAll(done => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
    server.close();
})
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

test("POST /api/admin/signin", async() => {
    await request(server)
        .post('/api/admin/signin')
        .send({ email: user.email })
        .expect(400)

    await request(server)
        .post('/api/admin/signin')
        .send({ password: user.password })
        .expect(400)

    await request(server)
        .post('/api/admin/signin')
        .expect(400)


    await request(server)
        .post('/api/admin/signin')
        .send({ email: user.email, password: user.password + "ersm,eirot3487tgbirng" })
        .expect(400)


    await request(server)
        .post('/api/admin/signin')
        .send({ email: user.email, password: user.password })
        .expect(200)
        .then((res) => {
            token = res.body.user.token;
        });
})



test("POST /api/admin/revalidsignin", async() => {
    await request(server)
        .post('/api/admin/revalidsignin')
        .expect(401)


    await request(server)
        .post('/api/admin/revalidsignin')
        .set('x-access-token', "texto")
        .expect(401)

    await request(server)
        .post('/api/admin/revalidsignin')
        .set('x-access-token', token)
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
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            expect(response.body[0].visualname).toBe(movie.visualname);
            expect(response.body[0].name).toBe(movie.name);
            expect(response.body[0].updated).toBe(new Date(movie.updated).toISOString());
            expect(response.body[0].url).toBe(movie.url);
            expect(response.body[0].size).toBe(movie.size);

            expect(Array.isArray(response.body[0].files))
            expect(response.body[0].files.length).toEqual(1);

            expect(response.body[0].files[0]).toBe(movie.files[0]);
        })

    await request(server)
        .get("/api/movies/all/1")
        .expect(200)
        .then((response) => {

            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);

            expect(response.body.itemsList[0].visualname).toBe(movie.visualname);
            expect(response.body.itemsList[0].name).toBe(movie.name);
            expect(response.body.itemsList[0].updated).toBe(new Date(movie.updated).toISOString());
            expect(response.body.itemsList[0].url).toBe(movie.url);
            expect(response.body.itemsList[0].size).toBe(movie.size);

            expect(Array.isArray(response.body.itemsList[0].files))
            expect(response.body.itemsList[0].files.length).toEqual(1);

            expect(response.body.itemsList[0].files[0]).toBe(movie.files[0]);
        })
})

test("POST /movie/all", async() => {
    await request(server)
        .post("/api/movies/all/-1")
        .send({})
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            expect(response.body[0].visualname).toBe(movie.visualname);
            expect(response.body[0].name).toBe(movie.name);
            expect(response.body[0].updated).toBe(new Date(movie.updated).toISOString());
            expect(response.body[0].url).toBe(movie.url);
            expect(response.body[0].size).toBe(movie.size);

            expect(Array.isArray(response.body[0].files))
            expect(response.body[0].files.length).toEqual(1);

            expect(response.body[0].files[0]).toBe(movie.files[0]);
        })

    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);

            expect(response.body.itemsList[0].visualname).toBe(movie.visualname);
            expect(response.body.itemsList[0].name).toBe(movie.name);
            expect(response.body.itemsList[0].updated).toBe(new Date(movie.updated).toISOString());
            expect(response.body.itemsList[0].url).toBe(movie.url);
            expect(response.body.itemsList[0].size).toBe(movie.size);

            expect(Array.isArray(response.body.itemsList[0].files))
            expect(response.body.itemsList[0].files.length).toEqual(1);

            expect(response.body.itemsList[0].files[0]).toBe(movie.files[0]);

        })
})


test("GET /movie/id", async() => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async(response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);

            await request(server)
                .get("/api/movies/" + response.body.itemsList[0]._id)
                .send({})
                .expect(200)
                .then((response) => {

                    expect(response.body.visualname).toBe(movie.visualname);
                    expect(response.body.name).toBe(movie.name);
                    expect(response.body.updated).toBe(new Date(movie.updated).toISOString());
                    expect(response.body.url).toBe(movie.url);
                    expect(response.body.size).toBe(movie.size);

                    expect(Array.isArray(response.body.files))
                    expect(response.body.files.length).toEqual(1);

                    expect(response.body.files[0]).toBe(movie.files[0]);
                });
        });
})


test("POST /movie/fo", async() => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async(response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);

            await request(server)
                .post("/api/movies/fo")
                .send({ _id: response.body.itemsList[0]._id })
                .expect(200)
                .then((response) => {

                    expect(response.body.visualname).toBe(movie.visualname);
                    expect(response.body.name).toBe(movie.name);
                    expect(response.body.updated).toBe(new Date(movie.updated).toISOString());
                    expect(response.body.url).toBe(movie.url);
                    expect(response.body.size).toBe(movie.size);

                    expect(Array.isArray(response.body.files))
                    expect(response.body.files.length).toEqual(1);

                    expect(response.body.files[0]).toBe(movie.files[0]);
                });
        });
})



test("PUT /movie/fo", async() => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async(response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);
            let _id = response.body.itemsList[0]._id;
            await request(server)
                .put("/api/movies/" + _id)
                .set('x-access-token', token)
                .send({ _id, name: "UPDATE NAME" })
                .expect(200)

            await request(server)
                .post("/api/movies/fo")
                .send({ _id: _id })
                .expect(200)
                .then(async(response3) => {
                    expect(response3.body.name).toBe("UPDATE NAME");
                });

            await request(server)
                .put("/api/movies/" + _id)
                .set('x-access-token', token)
                .send({ _id, name: movie.name })
                .expect(200)

            await request(server)
                .post("/api/movies/fo")
                .send({ _id })
                .expect(200)
                .then(async(response5) => {
                    expect(response5.body.name).toBe(movie.name);

                });

            await request(server)
                .put("/api/movies/" + _id)
                .send({ _id, name: "UPDATE NAME" })
                .expect(401)
        })
})

test("POST /movie/_id/like", async() => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async(response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);
            let _id = response.body.itemsList[0]._id;
            await request(server)
                .post("/api/movies/" + _id + "/like")
                .send({})
                .expect(200)
                .then(async(response) => {
                    expect(response.body).toBeTruthy();
                    expect(response.body.like).toBe(movie.like + 1);

                })
        })

})

test("POST /movie/read", async() => {

    await request(server)
        .post("/api/movies/read")
        .send({})
        .expect(502)

    await request(server)
        .post("/api/movies/read")
        .send({ path: "./" })
        .expect(200)
})


afterAll(done => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
    server.close();
})
const request = require('supertest');
const { moviemodel, usuariomodel, actormodel } = require('../src/models');

let mongoose = require('mongoose');
const app = require('../src/server');
const PORT = 9001;
const mongoUrl = 'mongodb://127.0.0.1:27017/digital-test'
const maxtimeout = 30000;
const fs = require('fs');
let datamock = require('./mocks/datamock.js');
let movie = datamock.movie;
let book = datamock.book;
let user = datamock.user;
let actor = datamock.actor;
let actor2 = datamock.actor2;
let actor3 = datamock.actor3;
let category = datamock.category;
let studio = datamock.studio;
var token;

const server = app.listen(PORT)


beforeAll(async () => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    await moviemodel.deleteMany({});
    await actormodel.deleteMany({});
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



afterAll(done => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
    server.close();
})


test("POST /api/admin/signin", async () => {
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



test("POST /api/admin/revalidsignin", async () => {
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



test("GET /index", async () => {
    await request(server)
        .get("/index")
        .expect(200).then((res) => {
            //   console.log(res.headers);
        })

})

test("POST /actores", async () => {
    jest.setTimeout(30000)

    await request(server)
        .post("/api/actores")
        .set('x-access-token', token)
        .send(actor)
        .expect(200)

    await request(server)
        .post("/api/actores")
        .set('x-access-token', token)
        .send(actor2)
        .expect(200)
    await request(server)
        .post("/api/actores")
        .set('x-access-token', token)
        .send(actor3)
        .expect(200)


})


test("POST /categorias", async () => {
    await request(server)
        .post("/api/categorias")
        .set('x-access-token', token)
        .send({})
        .expect(500)

    await request(server)
        .post("/api/categorias")
        .set('x-access-token', token)
        .send(category)
        .expect(200)

})


test("POST /studios", async () => {
    await request(server)
        .post("/api/studios")
        .set('x-access-token', token)
        .send({})
        .expect(500)

    await request(server)
        .post("/api/studios")
        .set('x-access-token', token)
        .send(studio)
        .expect(200)

}, maxtimeout)


test("POST /books", async () => {

    await request(server)
        .post("/api/books")
        .set('x-access-token', token)
        .send({})
        .expect(502)

    await request(server)
        .post("/api/books")
        .set('x-access-token', token)
        .send(book)
        .expect(200)

})


test("POST /movie", async () => {

    await request(server)
        .post("/api/movies")
        .set('x-access-token', token)
        .send({})
        .expect(500)

    await request(server)
        .post("/api/movies")
        .set('x-access-token', token)
        .send(movie)
        .expect(200)


})



test("POST /movie", async () => {

    await request(server)
        .post("/api/movies")
        .set('x-access-token', token)
        .send({})
        .expect(500)


    await request(server)
        .post("/api/movies")
        .set('x-access-token', token)
        .send(movie)
        .expect(200)


})

test("GET /movie/all", async () => {
    await request(server)
        .get("/api/movies/all/-1")
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            expect(response.body[0].visualname).toBe(movie.visualname);
            expect(response.body[0].name).toBe(movie.name);
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
            expect(response.body.itemsList[0].url).toBe(movie.url);
            expect(response.body.itemsList[0].size).toBe(movie.size);

            expect(Array.isArray(response.body.itemsList[0].files))
            expect(response.body.itemsList[0].files.length).toEqual(1);

            expect(response.body.itemsList[0].files[0]).toBe(movie.files[0]);
        })
})

test("POST /movie/all", async () => {
    await request(server)
        .post("/api/movies/all/-10000")
        .send({})
        .expect(200)


    await request(server)
        .post("/api/movies/all/-1")
        .send({})
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            expect(response.body[0].visualname).toBe(movie.visualname);
            expect(response.body[0].name).toBe(movie.name);
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
            expect(response.body.itemsList[0].url).toBe(movie.url);
            expect(response.body.itemsList[0].size).toBe(movie.size);

            expect(Array.isArray(response.body.itemsList[0].files))
            expect(response.body.itemsList[0].files.length).toEqual(1);

            expect(response.body.itemsList[0].files[0]).toBe(movie.files[0]);

        })
})


test("GET /movie/id", async () => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async (response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);

            await request(server)
                .get("/api/movies/" + response.body.itemsList[0]._id)
                .send({})
                .expect(200)
                .then((response) => {

                    expect(response.body.visualname).toBe(movie.visualname);
                    expect(response.body.name).toBe(movie.name);
                    expect(response.body.url).toBe(movie.url);
                    expect(response.body.size).toBe(movie.size);

                    expect(Array.isArray(response.body.files))
                    expect(response.body.files.length).toEqual(1);

                    expect(response.body.files[0]).toBe(movie.files[0]);
                });
        });
})


test("POST /movie/fo", async () => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async (response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);

            await request(server)
                .post("/api/movies/fo")
                .send({ _id: response.body.itemsList[0]._id })
                .expect(200)
                .then((response) => {

                    expect(response.body.visualname).toBe(movie.visualname);
                    expect(response.body.name).toBe(movie.name);
                    expect(response.body.url).toBe(movie.url);
                    expect(response.body.size).toBe(movie.size);

                    expect(Array.isArray(response.body.files))
                    expect(response.body.files.length).toEqual(1);

                    expect(response.body.files[0]).toBe(movie.files[0]);
                });
        });
})



test("PUT /movie/fo", async () => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async (response) => {
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
                .then(async (response3) => {
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
                .then(async (response5) => {
                    expect(response5.body.name).toBe(movie.name);

                });

            await request(server)
                .put("/api/movies/" + _id)
                .send({ _id, name: "UPDATE NAME" })
                .expect(401)
        })
})

test("POST /movie/_id/like", async () => {
    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async (response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);
            let _id = response.body.itemsList[0]._id;
            await request(server)
                .post("/api/movies/" + _id + "/like")
                .send({})
                .expect(200)
                .then(async (response) => {
                    expect(response.body).toBeTruthy();
                    expect(response.body.like).toBe(movie.like + 1);

                })
        })

})

test("POST /movie/read", async () => {
    jest.setTimeout(30000)

    await request(server)
        .post("/api/movies/read")
        .send({})
        .expect(502)

    await request(server)
        .post("/api/movies/read")
        .send({ path: __dirname })
        .expect(200)


})


test("POST /books/read", async () => {

    await request(server)
        .post("/api/books/read")
        .send({})
        .expect(502)

    await request(server)
        .post("/api/books/read")
        .send({ path: __dirname })
        .expect(200)


}, maxtimeout)


test("GET /fixes/specialnames", async () => {
    await request(server)
        .get("/api/fixes/specialnames")
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {

            expect(res.body).toBeTruthy();
            expect(res.body.msg).toBe("ok");
        })


})


test("GET /fixes/fullfixes", async () => {
    await request(server)
        .get("/api/fixes/fullfixes")
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {

            expect(res.body).toBeTruthy();
            expect(res.body.msg).toBe("ok");
        })


}, maxtimeout)



test("GET /dashboard/movies", async () => {


    await request(server)
        .get("/api/dashboard/movies")
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
            expect(res.body).toBeTruthy();
            expect(res.body.msg).toBe("ok");
            console.log(res.body);
            expect(res.body.result.length).toEqual(0);
        })


})



test("GET /dashboard/actors", async () => {
    await request(server)
        .post('/api/admin/signin')
        .send({ email: user.email, password: user.password })
        .expect(200)
        .then((res) => {
            token = res.body.user.token;
        });

    await request(server)
        .post("/api/actores")
        .set('x-access-token', token)
        .send(actor)
        .expect(200)

    await request(server)
        .post("/api/actores")
        .set('x-access-token', token)
        .send(actor2)
        .expect(200)
    await request(server)
        .post("/api/actores")
        .set('x-access-token', token)
        .send(actor3)
        .expect(200)

    await request(server)
        .get("/api/dashboard/actors")
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
            console.log(res.body);
            expect(res.body).toBeTruthy();
            expect(res.body.msg).toBe("ok");
            expect(res.body.result).toBeTruthy();
            expect(res.body.result.length).toEqual(3);
            expect(res.body.result[0].name).toEqual(actor3.name);
            expect(res.body.result[1].name).toEqual(actor2.name);
            expect(res.body.result[2].name).toEqual(actor.name);

        })


})



test("GET /movie", async () => {

    await request(server)
        .get("/api/movie/" + 12345)
        .set('x-access-token', token)
        .expect(502)
        .then((res) => {
            console.log(res.body);
            expect(res.body).toBeTruthy();
            expect(res.body.msg).toEqual("error");

        });

    await request(server)
        .post("/api/movies/all/1")
        .send({})
        .expect(200)
        .then(async (response) => {
            expect(Array.isArray(response.body.itemsList)).toBeTruthy();
            expect(response.body.itemsList.length).toEqual(1);
            let _id = response.body.itemsList[0]._id;

            await request(server)
                .get("/api/movie/" + _id)
                .set('x-access-token', token)
                .expect(502)
                .then((res) => {
                    expect(res.body).toBeTruthy();
                    expect(res.body.msg).toEqual("error");
                });


        });
})
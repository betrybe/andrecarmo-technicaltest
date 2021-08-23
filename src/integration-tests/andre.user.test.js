const supertest = require("supertest");
const { MongoClient } = require("mongodb");
const { userParams } = require("./factories/userFactory");
const app = require("../api/app");

const mongoDbUrl = "mongodb://localhost:27017/Cookmaster";
const url = "http://localhost:3000";

describe("POST /users/", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db("Cookmaster");
    });

    beforeEach(async () => {
        await db.collection("users").deleteMany({});
        await db.collection("recipes").deleteMany({});
        const users = {
            name: "admin",
            email: "root@email.com",
            password: "admin",
            role: "admin",
        };
        await db.collection("users").insertOne(users);
    });

    afterAll(async () => {
        await connection.close();
    });

    it("returns status 200 for valid params", async () => {
        const body = userParams();

        const response = await supertest(app).post(`${url}/users/`).send(body);

        expect(response.status).toEqual(200);
    });

    it("returns status 400 for invalid name param", async () => {
        const body = userParams();

        const response = await supertest(app)
            .post(`${url}/users/`)
            .send({ ...body, name: "" });

        expect(response.status).toEqual(400);
    });
});

describe("POST /login/", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db("Cookmaster");
    });

    beforeEach(async () => {
        await db.collection("users").deleteMany({});
        await db.collection("recipes").deleteMany({});
        const users = {
            name: "admin",
            email: "root@email.com",
            password: "admin",
            role: "admin",
        };
        await db.collection("users").insertOne(users);
    });

    afterAll(async () => {
        await connection.close();
    });

    it("returns status 200 for valid params", async () => {
        const body = userParams();

        await db.collection("users").insertOne({ ...body, role: "user" });

        const response = await supertest(app)
            .post(`${url}/login/`)
            .send({ email: body.email, password: body.password });

        expect(response.status).toEqual(200);
    });

    it("returns status 400 for invalid password param", async () => {
        const body = userParams();

        await db.collection("users").insertOne({ ...body, role: "user" });

        const response = await supertest(app)
            .post(`${url}/login/`)
            .send({ email: body.email, password: "whatever" });

        expect(response.status).toEqual(401);
    });
});

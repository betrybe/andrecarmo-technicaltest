const faker = require("faker");

const userParams = () => {
    const params = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    return params;
};

module.exports = { userParams };

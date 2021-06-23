import routes from "../routes/UsersRoutes"
const axios = require('axios');

test('GET /users', async () => {
    const response = await axios('http://localhost:8080/users');
    expect(response.status).toEqual(200);
})


test("POST /users 200 OK", async () => {
    const user = {
        name: "Bruno 3",
        email: "bruno.feijo2@live.com",
        password: "123456",
        originalName: "Feijó",
        fileName: "não"
    };

    const response = await axios.post('http://localhost:8080/users', user);
    expect(response.status).toEqual(200);
});
import routes from "../routes/UsersRoutes"
const axios = require('axios');

test('GET /users', async () => {
    const response = await axios('http://localhost:8080/users');
    expect(response.status).toEqual(200);
})


test("POST /users 200 OK", async () => {
    const user = {
        name: "Bruno 100",
        email: "bruno.feijo100@live.com",
        password: "123456",
        originalName: "Feijó",
        fileName: "não"
    };

    const response = await axios.post('http://localhost:8080/users', user);
    expect(response.status).toEqual(200);
});

// test("PUT /users 200 OK", async (req, res) => {
//     const user = {
//         _id: "60d37fda2c394c4d70c5af29",
//         name: "Maria Eduarda Feijó",
//         email: "maria.eduarda@live.com",
//     };

//     const response = await axios.put('http://localhost:8080/users', user);
//     expect(response.status).toEqual(200);
// });
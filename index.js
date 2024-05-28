const express = require('express');
require('dotenv').config();
const {
    getAllUsers,
    createUser,
    getUserById,
    editUser,
    deleteUser,
} = require('./controllers/userControllers.js');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Connect to SQL exercise!'));

app.route('/users').get(getAllUsers).post(createUser);

app.route('/users/:id').get(getUserById).put(editUser).delete(deleteUser);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

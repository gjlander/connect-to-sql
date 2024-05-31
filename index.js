const express = require('express');
require('dotenv').config();
const {
    getAllUsers,
    createUser,
    getUserById,
    editUser,
    deleteUser,
} = require('./controllers/userControllers.js');
const {
    getAllOrders,
    createOrder,
    getOrderById,
    editOrder,
    deleteOrder,
} = require('./controllers/orderControllers.js');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => res.send('Connect to SQL exercise!'));

app.route('/users').get(getAllUsers).post(createUser);
app.route('/users/:id').get(getUserById).put(editUser).delete(deleteUser);

app.route('/orders').get(getAllOrders).post(createOrder);
app.route('/orders/:id').get(getOrderById).put(editOrder).delete(deleteOrder);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

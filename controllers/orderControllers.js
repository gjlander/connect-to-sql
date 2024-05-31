const pool = require('../db/neonDB.js');

const getAllOrders = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM orders;');
        return res.json(rows);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { price, userId } = req.body;

        if (!price || !userId) {
            throw new Error('Missing fields!');
        }
        const {
            rows: [newOrder],
        } = await pool.query(
            'INSERT INTO orders (price, date, user_id) VALUES ($1, CURRENT_TIMESTAMP, $2) RETURNING *',
            [price, userId]
        );
        return res.status(201).json(newOrder);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const {
            rows: [order],
        } = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);

        if (!order) {
            return res.status(404).json({ error: 'Order could not be found' });
        }
        return res.json(order);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const editOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        const {
            rows: [updatedOrder],
        } = await pool.query(
            'UPDATE orders SET first_name = $1, last_name = $2, age=$3 WHERE id=$4 RETURNING *',
            [firstName, lastName, age, id]
        );
        return res.json(updatedOrder);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM orders WHERE id=$1', [id]);
        return res.json({
            success: `Order with id -${id}- was successfully deleted.`,
        });
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    editOrder,
    deleteOrder,
};

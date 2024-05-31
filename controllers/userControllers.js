const pool = require('../db/neonDB.js');

const getAllUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users;');
        return res.json(rows);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, age } = req.body;

        if (!firstName || !lastName || !age) {
            throw new Error('Missing fields!');
        }
        const {
            rows: [newUser],
        } = await pool.query(
            'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
            [firstName, lastName, age]
        );
        return res.status(201).json(newUser);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const {
            rows: [user],
        } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

        if (!user) {
            return res.status(404).json({ error: 'User could not be found' });
        }
        return res.json(user);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        const {
            rows: [updatedUser],
        } = await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, age=$3 WHERE id=$4 RETURNING *',
            [firstName, lastName, age, id]
        );
        return res.json(updatedUser);
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id=$1', [id]);
        return res.json({
            success: `User with id -${id}- was successfully deleted.`,
        });
    } catch (error) {
        console.error();
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, createUser, getUserById, editUser, deleteUser };

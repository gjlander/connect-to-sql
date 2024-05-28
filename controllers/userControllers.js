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
    return res.send();
};

const getUserById = async (req, res) => {
    return res.send();
};

const editUser = async (req, res) => {
    return res.send();
};

const deleteUser = async (req, res) => {
    return res.send();
};

module.exports = { getAllUsers, createUser, getUserById, editUser, deleteUser };

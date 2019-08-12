const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

module.exports = server;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
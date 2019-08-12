const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json("Server is up!");
});
server.get('/accounts', (req, res) => {
    let query = req.query
    db('accounts')
    .orderBy(query.sortby || 'name', query.sortdir)
    .limit(query.limit)
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal server error.' });
        });
});

server.get('/accounts/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if (account) res.status(200).json(account);
            else
                res.status(404).json({
                    message: 'An account with that ID does not exist. ',
                });
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

server.post('/accounts', (req, res) => {
    let newAccount = req.body;
    db('accounts')
        .insert(newAccount)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

server.delete('/accounts/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .delete()
        .then(amt => {
            if (amt)
                res.status(200).json({ message: `${amt} record(s) deleted.` });
            else
                res.status(404).json({
                    message: 'An account with that ID does not exist. ',
                });
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

server.put('/accounts/:id', (req, res) => {
    const changes = req.body;
    db('accounts')
        .where({ id: req.params.id })
        .update(changes)
        .then(amt => {
            if (amt)
                res.status(200).json({ message: `${amt} record(s) updated.` });
            else
                res.status(404).json({
                    message: 'An account with that ID does not exist. ',
                });
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error' });
        });
});
module.exports = server;

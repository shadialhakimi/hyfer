'use strict';
const db = require('../datalayer/users');

function getUser(req, res) {
    getConnection(req, res)
        .then(con => db.getUser(con, req.user.username))
        .then(result => res.json(result[0]));
}

function getUsers(req, res) {
    getConnection(req, res)
        .then(con => db.getUsers(con))
        .then(result => res.json(result));
}

function updateRole(req, res) {
    getConnection(req, res)
        .then(con => db.updateRole(con, req.params.id, req.body.role))
        .then(result => res.json(result))
}

function getConnection(req, res) {
    return new Promise((resolve, reject) => {
        req.getConnection((err, con) => {
            if (err) {
                res.sendStatus(500);
                reject(err);
            } else {
                resolve(con);
            }
        });
    });
}

module.exports = {
    getUser,
    getUsers,
    updateRole
}
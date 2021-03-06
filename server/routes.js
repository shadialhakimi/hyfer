'use strict';
const passport = require('passport');
require('./auth/github-auth');
const authService = require('./auth/auth-service');
const github = require('./api/github');
const users = require('./api/users');

const modules = require('./api/modules');
const runningModules = require('./api/running-modules')
const groups = require('./api/groups');

module.exports = function(app) {

    app.get('/api/modules', authService.hasRole('teacher'), modules.getModules);
    app.post('/api/modules', authService.hasRole('teacher'), modules.addModule);
    app.patch('/api/modules/:id', authService.hasRole('teacher'), modules.updateModule);
    app.delete('/api/modules/:id', authService.hasRole('teacher'), modules.deleteModule);

    app.get('/api/running/:groupId', authService.hasRole('teacher'), runningModules.getRunningModules);
    app.patch('/api/running/:groupId/:position', authService.hasRole('teacher'), runningModules.updateRunningModule);
    app.patch('/api/running/:moduleId/:groupId/:position', authService.hasRole('teacher'), runningModules.addModuleToRunningModules);
    app.delete('/api/running/:groupId/:position', authService.hasRole('teacher'), runningModules.deleteRunningModule);

    app.get('/api/groups', groups.getTimelineForAllGroups);
    app.get('/api/groups/:id', groups.getTimelineForAGroup);
    app.post('/api/groups', authService.hasRole('teacher'), groups.addGroup);
    app.patch('/api/groups/:id', authService.hasRole('teacher'), groups.updateGroup);
    app.delete('/api/groups/:id', authService.hasRole('teacher'), groups.deleteGroup);

    app.get('/api/github/readme/:owner/:repo', github.getReadMeAsHtml);

    app.get('/api/user', authService.isAuthenticated(), users.getUser);
    app.get('/api/users', authService.isAuthenticated(), users.getUsers);
    app.patch('/api/user/:id', authService.hasRole('teacher'), users.updateRole);

    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/login' }),
        authService.gitHubCallback, authService.setTokenCookie);
};
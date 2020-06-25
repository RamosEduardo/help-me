const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const PeopleController = require('./controllers/PeopleController');
const HelpedsController = require('./controllers/HelpedsController');
const HelpersController = require('./controllers/HelpersController');
const SolicitationsController = require('./controllers/SolicitationsController');
const JoinSolicitationController = require('./controllers/JoinSolicitationController');

routes.post('/users', UserController.create);
routes.put('/users', UserController.rememberPassword);
routes.delete('/users', UserController.remove);
routes.get('/users', UserController.index);
routes.post('/login', UserController.login);

// Rotas de Pessoas

routes.post('/peoples', PeopleController.create);
routes.get('/peoples', PeopleController.index);
routes.put('/peoples', PeopleController.update);

// Routes of Helpeds

routes.post('/helpeds', HelpedsController.create);
routes.get('/helpeds', HelpedsController.index);

// Routes of Helpeds

routes.post('/helpers', HelpersController.create);
routes.get('/helpers', HelpersController.index);

// Routes of Solicitations

routes.post('/solicitations', SolicitationsController.create);
routes.get('/solicitations', SolicitationsController.index);

// Routes of Join Solicitation

routes.put('/solicitations', JoinSolicitationController.update);

// Routes of Adresses 

routes.post()

module.exports = routes;
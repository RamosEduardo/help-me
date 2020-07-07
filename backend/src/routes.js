const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const PeopleController = require('./controllers/PeopleController');
const HelpedsController = require('./controllers/HelpedsController');
const HelpersController = require('./controllers/HelpersController');
const SolicitationsController = require('./controllers/SolicitationsController');
const JoinSolicitationController = require('./controllers/JoinSolicitationController');
const AddressController = require('./controllers/AddressController');
const ProductsController = require('./controllers/ProductsController');
const categoriesController = require('./controllers/categoriesController');
const vehiclesController = require('./controllers/vehiclesController');
const cargoController = require('./controllers/cargoController');
const ReportsController = require('./controllers/ReportsController');
const AssessmentsController = require('./controllers/AssessmentsController');
const StatusSolicitationController = require('./controllers/StatusSolicitationController');


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

// Routes of Helpers

routes.post('/helpers', HelpersController.create);
routes.get('/helpers', HelpersController.index);

// Routes of Solicitations

routes.post('/solicitations', SolicitationsController.create);
routes.get('/solicitations/:id', SolicitationsController.index);
routes.put('/solicitations/:id', SolicitationsController.update);
routes.delete('/solicitations/:id', SolicitationsController.delete);

// Routes of Join JoinSolicitation

routes.post('/joinSolicitations/:id', JoinSolicitationController.join);
routes.put('/joinSolicitations/:id', JoinSolicitationController.accept);
routes.delete('/joinSolicitations/:id', JoinSolicitationController.decline);

// Routes of Status Solicitation

routes.post('/statusSolicitations/:id', StatusSolicitationController.start);
routes.put('/statusSolicitations/:id', StatusSolicitationController.end);

// Routes of Adresses 

routes.post('/address', AddressController.create);
routes.get('/address', AddressController.index);
routes.put('/address/:id', AddressController.update);
routes.delete('/address/:id', AddressController.remove);

// Routes of Product

routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.index);
routes.put('/products/:id', ProductsController.update);
routes.delete('/products/:id', ProductsController.remove);


// Route of Categorie

routes.post('/categories', categoriesController.create);
routes.get('/categories', categoriesController.index);
routes.put('/categories/:id', categoriesController.update);
routes.delete('/categories/:id', categoriesController.remove);

// Route of Vehicles

routes.post('/vehicles', vehiclesController.create);
routes.get('/vehicles', vehiclesController.index);
routes.put('/vehicles/:placa', vehiclesController.update);
routes.delete('/vehicles/:placa', vehiclesController.remove);

//Route of Cargo

routes.post('/cargo/:solicitation_id', cargoController.create);
routes.get('/cargo/:solicitation_id', cargoController.index);
routes.delete('/cargo/:solicitation_id/:product_id', cargoController.remove);

//Route of Reports

routes.post('/reports/:id', ReportsController.create);
routes.get('/reports/:id', ReportsController.index);

//Route of Assessments

routes.post('/assessment/:user_rated_id/solicitation/:solicitation_id', AssessmentsController.helpedEvaluator);
routes.put('/assessment/:user_rated_id/solicitation/:solicitation_id', AssessmentsController.helperEvaluator);
routes.get('/assessment/:user_rated_id', AssessmentsController.index);



module.exports = routes;
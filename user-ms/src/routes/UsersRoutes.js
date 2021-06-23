import { Router } from 'express';
import GetUserService from '../services/GetUserService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import LoginService from '../services/LoginService';

import authMiddleware from '../security/authentication';

const routes = new Router();

routes.get('/', GetUserService.index);
routes.get('/users', GetUserService.index);
routes.get('/users/:id', GetUserService.show);
routes.post('/users', CreateUserService.store);
routes.put('/users', authMiddleware, UpdateUserService.update);
routes.delete('/users/:id', authMiddleware, DeleteUserService.delete);

routes.post('/login', LoginService.store);

export default routes;

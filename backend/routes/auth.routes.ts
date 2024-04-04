import { Router } from 'express';
import {login, signup, logout} from '../controllers/auth.controllers'

export const AuthRoute = Router();

AuthRoute.get('/login', login);
AuthRoute.post('/signup', signup);
AuthRoute.get('/logout', logout);
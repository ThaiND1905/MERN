import { Router } from 'express';
import {login, signup, logout} from '../controllers/auth.controllers'

export const AuthRoute = Router();

AuthRoute.post('/login', login);
AuthRoute.post('/signup', signup);
AuthRoute.post('/logout', logout);
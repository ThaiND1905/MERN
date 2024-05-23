import { Router } from 'express';
import { protectRoute } from '../middleware/protectRoute';
import { getUsersForSiderBar } from '../controllers/user.controller';


export const UserRoute = Router();

UserRoute.get('/',protectRoute,getUsersForSiderBar);


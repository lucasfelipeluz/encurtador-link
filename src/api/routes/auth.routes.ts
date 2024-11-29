import * as Express from 'express';
import { authController } from 'src/api/controllers';

const router = Express.Router();

router.post('/login', authController.login.bind(authController) as Express.Application);
router.post('/register', authController.register.bind(authController) as Express.Application);

export default router;

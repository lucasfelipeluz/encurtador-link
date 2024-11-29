import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import AuthMiddleware from 'src/api/middlewares/AuthMiddleware';
import authRoutes from 'src/api/routes/auth.routes';
import linkRoutes from 'src/api/routes/link.routes';
import { homeController } from '../controllers';

const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

const router = Express.Router();

router.use('/', authRoutes);
router.use('/links', linkRoutes);

router.get(
  '/:code',
  authMiddleware.handlePermitive.bind(authMiddleware) as Express.RequestHandler,
  homeController.get.bind(homeController) as Express.Application,
);

export default router;

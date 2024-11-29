import * as Express from 'express';
import { linkController } from 'src/api/controllers';
import AuthMiddleware from 'src/api/middlewares/AuthMiddleware';
import { container as dependencyContainer } from 'tsyringe';

const router = Express.Router();

const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

router.get(
  '/',
  authMiddleware.handlePrivate.bind(authMiddleware) as Express.RequestHandler,
  linkController.getAll.bind(linkController) as Express.Application,
);

router.get(
  '/:id',
  authMiddleware.handlePrivate.bind(authMiddleware) as Express.RequestHandler,
  linkController.getById.bind(linkController) as Express.Application,
);

router.post(
  '/',
  authMiddleware.handlePermitive.bind(authMiddleware) as Express.RequestHandler,
  linkController.create.bind(linkController) as Express.Application,
);

router.patch(
  '/:id',
  authMiddleware.handlePrivate.bind(authMiddleware) as Express.RequestHandler,
  linkController.update.bind(linkController) as Express.Application,
);

router.delete(
  '/:id',
  authMiddleware.handlePrivate.bind(authMiddleware) as Express.RequestHandler,
  linkController.delete.bind(linkController) as Express.Application,
);

export default router;

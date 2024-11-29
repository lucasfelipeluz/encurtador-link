import { container as dependencyContainer } from 'tsyringe';
import AuthController from './AuthController';
import LinkController from './LinkController';
import HomeController from './HomeController';

export const authController = dependencyContainer.resolve(AuthController);
export const linkController = dependencyContainer.resolve(LinkController);
export const homeController = dependencyContainer.resolve(HomeController);

import cors from 'cors';
import Express, { Request, Response } from 'express';
import morgan from 'morgan';
import helpers from 'src/api/utils/helpers';
import httpResponses from './utils/httpResponses';
import routes from 'src/api/routes/routes';

class App {
  private readonly app: Express.Application;
  private readonly port: number;

  constructor(port: number) {
    this.app = Express();
    this.port = port;
  }

  private loadOptions(): void {
    this.app.set('trust proxy', 1);

    this.app.use(cors());
    this.app.use(Express.urlencoded({ extended: true }));
    this.app.use(Express.json({ limit: '5mb' }));
    this.app.use(Express.text());

    // Request limiter
    const limiter = helpers.getConfigLimiter();
    this.app.use(limiter);

    // Morgan logger
    helpers.setMorganDateToken();
    this.app.use(morgan('[:date[web]] :method :url :status :response-time ms'));
  }

  private loadRoutes(): void {
    this.app.use('/api', routes);

    // @ts-expect-error - This is a test route
    this.app.get('*', (_req: Request, res: Response) => {
      return httpResponses.notFound(res);
    });
  }

  public run(): void {
    this.loadOptions();

    this.loadRoutes();

    this.app.listen(this.port, () => {
      helpers.printMsgAPIRunning(this.port, process.env.SERVER_MODE!);
    });
  }
}

export default App;

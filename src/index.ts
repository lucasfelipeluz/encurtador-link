import 'reflect-metadata';
import App from 'src/api';
import dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT_SERVER!, 10);
const app = new App(port);

app.run();

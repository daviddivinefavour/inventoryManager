import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const whitelist = ['*'];

// configure CORS to allow all origins
const corsOptions = {
  origin(origin, callback) {
    if (
      whitelist.includes('*') ||
      whitelist.indexOf(origin) !== -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error('Access denied'));
    }
  }
};

// add middlewares to all incoming requests.
app.use(express.json(), cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

routes(app);

export default app;

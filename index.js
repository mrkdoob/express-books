import express from 'express';
import booksRouter from './routes/books.js';
import recordsRouter from './routes/records.js';
import loginRouter from './routes/login.js';
import userRouter from './routes/users.js';
import log from './middleware/logMiddleware.js';
import 'dotenv/config';
import errorHandler from './middleware/errorHandler.js';
import * as Sentry from '@sentry/node';
// import serverless from 'serverless-http';

const app = express();

Sentry.init({
  dsn: 'https://f67cd1654710441286808cfc53308833@o4505544560934912.ingest.sentry.io/4505544604188672',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(log);

app.use('/books', booksRouter);
app.use('/records', recordsRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// export const handler = serverless(app);

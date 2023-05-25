import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import resetRouter from "./routes/resetPassword";
import googleRouter from "./routes/google";
import cors from 'cors';


import registerRouter from './routes/register';
import groupRouter from './routes/groups';
import { connectDb, sequelize } from './config/database';

const app = express();

app.use(
  cors({
    origin: true, // Replace with the actual origin of your frontend
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Remove the 'ch-ua-form-factor' feature from the Permissions-Policy header
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), interest-cohort=()');
  next();
});

app.use('/user', registerRouter);
app.use('/auth', googleRouter);
app.use('/user', resetRouter);
app.use('/groups', groupRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//DB connection
const syncDatabase = async () => {
  await connectDb();
  sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
  });
};

syncDatabase();
// error handler
app.use(function (err: createError.HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
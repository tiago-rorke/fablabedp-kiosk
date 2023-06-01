import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import createError from 'http-errors';
import { fileURLToPath } from 'url';

import router from './routes.js';

// get enviroment variables
dotenv.config();

// get dirname for use in ES module
// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
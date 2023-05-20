/**
 * Module dependencies.
 */

import express, { ErrorRequestHandler } from 'express';
import logger from 'morgan';
import path from 'path';
import session from 'express-session';
import methodOverride from 'method-override';
import boot from './lib/boot'

export const app = express();

// set our default template engine to "ejs"
// which prevents the need for using file extensions
app.set('view engine', 'ejs');

// set views for error and 404 pages
app.set('views', path.join(__dirname, 'views'));

// log
if (!module.parent) app.use(logger('dev'));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// session support
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}));

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// expose the "messages" local variable when views are rendered
app.use(function (req, res, next) {
  // var msgs = req.session.messages || [];

  // expose "messages" local variable
  // res.locals.messages = msgs;

  // expose "hasMessages"
  // res.locals.hasMessages = !!msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next();
  // empty or "flush" the messages so they
  // don't build up
  // req.session.messages = [];
});

// pomoćna skripta za učitavanje kontrolera, priprema MVC okruženje
boot(app, { verbose: !module.parent });

app.use(function (err, req, res) {
  // log it
  if (!module.parent) console.error("stack", err.stack);

  // error page
  res.status(500).render('5xx');
} as ErrorRequestHandler);

// assume 404 since no middleware responded
app.use(function (req, res, next) {
  res.status(404).render('404', { url: req.originalUrl });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

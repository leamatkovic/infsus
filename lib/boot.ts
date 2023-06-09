'use strict'

/**
 * Module dependencies.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';

export default function (parent: any, options: any) {
  const dir = path.join(__dirname, '..', 'controllers');
  const verbose = options.verbose;
  fs.readdirSync(dir).forEach(function (name) {
    const file = path.join(dir, name)
    if (!fs.statSync(file).isDirectory()) return;
    verbose && console.log('\n   %s:', name);
    const obj = require(file);
    name = obj.name || name;
    const prefix = obj.prefix || '';
    const app = express();
    let handler;
    let method: "get" | "post" | "put" | "post" | "delete";
    let url;

    // allow specifying the view engine
    if (obj.engine) app.set('view engine', obj.engine);
    app.set('views', path.join(__dirname, '..', 'controllers', name, 'views'));

    // generate routes based
    // on the exported methods
    for (const key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      // route exports
      switch (key) {
        case 'show':
          method = 'get';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'list':
          method = 'get';
          url = '/' + name + 's';
          break;
        case 'edit':
          method = 'get';
          url = '/' + name + '/:' + name + '_id/edit';
          break;
        case 'update':
          method = 'put';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'create':
          method = 'post';
          url = '/' + name;
          break;
        case 'index':
          method = 'get';
          url = '/';
          break;
        case 'destroy':
          method = 'delete';
          url = '/' + name + '/:' + name + '_id';
          break;
        default:
          /* istanbul ignore next */
          throw new Error('unrecognized route: ' + name + '.' + key);
      }

      // setup
      handler = obj[key];
      url = prefix + url;

      // before middleware support
      if (obj.before) {
        app[method](url, obj.before, handler);
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
      } else {
        app[method](url, handler);
        verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key);
      }
    }

    // mount the app
    parent.use(app);
  });
};

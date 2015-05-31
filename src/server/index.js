import debug from 'debug';
const dbg = debug('server');

import fs from 'fs';
import express from 'express';
import marty from 'marty-express';

const template = fs.readFileSync(__dirname + '/views/index.html').toString();
const app = express();

app.engine('html', (path, options, cb) => cb(null, template.replace('${app}', options.body)));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const PORT = process.env.PORT || 3000;

import application from '../App';
import routes from '../routes';

app.use(express.static(__dirname + '/../../static'));

app.use(marty({
    application,
    routes
}));

app.listen(PORT, () => {
    dbg('listening on port ' + PORT);
});

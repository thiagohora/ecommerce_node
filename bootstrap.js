import express from 'express';
import path from 'path';
import './src/resource';
import App from './src/js/app';

const app = express();
const env = process.env.NODE_ENV || 'dev';

const EnvConfig = require(`share/infrastructure/env/${env}.js`).default;

EnvConfig(app);
App(app);

app.listen(app.get('port'), () => {
    console.log(`Application running on http://localhost:${app.get('port')}`);
});
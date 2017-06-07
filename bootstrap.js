import express from 'express';
import path from 'path';
import App from './src/app';

const app = express();
const env = process.env.NODE_ENV || 'dev';

const EnvConfig = require(`./src/share/infrastructure/env/${env}.js`).default;

EnvConfig(app);
App(app);

app.listen(app.get('port'), () => {
    console.log(`Application running on http://localhost:${app.get('port')}`);
});
const env = process.env.NODE_ENV || 'dev';

const profile = ''+ (env === 'dev' ? '': '-'+env)
const name = `application${profile}.json`;

export default Object.assign({}, require('config.json')(null, env), require(name));
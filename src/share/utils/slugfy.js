import Optional from 'optional-js';
import removeAccents from 'remove-accents';

export default (value) => {
    return Optional.ofNullable(value)
                .map(str => str.replace(/^\s|\s+$/g,''))
                .map(str => str.toLowerCase())
                .map(removeAccents)
                .map(str => str.replace(/[\.|\/|_|,|:|;]/g,'-'))
                .map(str => str.replace(/[^a-z0-9 -]/g,''))
                .map(str => str.replace(/\s+/g,'-'))
                .map(str => str.replace(/\-+/g,'-'))
                .orElse('');
};
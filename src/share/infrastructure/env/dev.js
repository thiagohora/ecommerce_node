import path from 'path';
import morgan from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import fs from 'fs';
import layout from 'express-ejs-layouts';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import Customer from 'account/schema/customer';
import mongoose from 'mongoose';
import { Strategy } from 'passport-local';

const PATH = process.cwd();

/*
const getViewsFile = (dir,results = []) => {
    fs.readdirSync(dir).forEach((file) => {
        const dirNew = path.join(dir, file);
        const stat = fs.statSync(dirNew);
        if (stat && stat.isDirectory() ){
            if(/.*\/views$/.test(dirNew))
                results.push(dirNew);
            getViewsFile(dirNew, results);
        }   
    }); 
};*/

export default (app) => {
    app.set('port', 9002);
    app.set('views', path.join(PATH, 'dist', 'views'));
    app.set('view engine', 'ejs');
    app.set('layout extractScripts', true);
    app.set('layout extractStyles', true);

    app.use(express.static(path.join(PATH, 'dist')));
    app.use(layout);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(methodOverride('_method'));

    app.use(expressSession({
        secret: 'SECRET',
        resave: false,
        saveUninitialized: true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new Strategy(Customer.authenticate()));
    passport.serializeUser(Customer.serializeUser());
    passport.deserializeUser(Customer.deserializeUser());

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/ecommerce');
};
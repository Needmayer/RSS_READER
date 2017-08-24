import express from 'express';
import webpack from 'webpack';
import mongoose from 'mongoose';
import path from 'path';
import config from '../webpack.config.js';
import open from 'open';
import request from 'request-promise';
import xml2js from 'xml2js';
import fs from 'fs';
import bodyParser from 'body-parser';
import {userSchema} from './mongoSchemas.js';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

mongoose.connect('mongodb://localhost:27017/rss_reader', { useMongoClient: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



let userModel = mongoose.model('users', userSchema);

let user = new userModel({
  username: 'test',
  password : 'test',
  role : '1',
  categories:[
    {
      category_title: "Věda",
      category_urls : ['http://www.osel.cz/rss/rss.php', 'https://www.cnews.cz/feed']
    },
    {
      category_title :  "Počítače",
      category_urls : ['https://www.svethardware.cz/export.jsp?format=rss2', 'https://www.cnews.cz/feed']
    }
  ]
});


let urls = [
  'https://www.svethardware.cz/export.jsp?format=rss2',
  'http://www.osel.cz/rss/rss.php',
  'https://www.cnews.cz/feed',
  'http://www.eurogamer.cz/?format=rss'
];


let parser = new xml2js.Parser();



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.get('/api/rss', function (req, res) {
  let JSONS = [];
  const promises = urls.map(url => request(url));
  Promise.all(promises)
    .then(function (data) {
      for (let json of data) {
        parser.parseString(json, function (err, result) {
          JSONS.push(JSON.parse(JSON.stringify(result)));
        });
      }
    }).then(function (data) {
      res.send(JSONS);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/api/signup', function(req, res){
  console.log('signup body ',req.body);
  let newUser = new userModel(req.body);
  newUser.save(function(err){
    if(err){
      res.send({error: err});
    }else{
      res.send({error : false});
    } 
    return;

  });
});

app.post('/api/login', function(req, res){  
  userModel.findOne({'username' : req.body.username}, function(err, user){
    if(err) throw err;
    userModel.passwordIsValid(req.body.password, function(err, result){
      if(err){
        res.send(null);
      } else{
        res.send(JSON.stringify(user));
      }
    });    
    
  });
});

app.get('*', function (req, res) {
  console.log(" req params : ", req.params);
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

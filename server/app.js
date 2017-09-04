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
import { userSchema } from './mongoSchemas.js';

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
  password: 'test',
  role: '1',
  categories: [
    {
      category_title: "Věda",
      category_urls: ['http://www.osel.cz/rss/rss.php', 'https://www.cnews.cz/feed']
    },
    {
      category_title: "Počítače",
      category_urls: ['https://www.svethardware.cz/export.jsp?format=rss2', 'https://www.cnews.cz/feed']
    }
  ]
});


//let urls = [
//  'https://www.svethardware.cz/export.jsp?format=rss2',
//  'http://www.osel.cz/rss/rss.php',
//  'https://www.cnews.cz/feed',
//  'http://www.eurogamer.cz/?format=rss'
//];


let parser = new xml2js.Parser();



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.post('/api/rss', function (req, res) {
  let JSONS = [];
  let {username} = req.body;
  console.log(req.body);
  //zaroven to chce ceknout jestli je user doopravdy lognuty v session
  if(!username){
    res.send({});
    return;
  }
  getUsersFeeds(username, function(err, urls){
    if(err){
      console.log(err);
      return res.send({});
    }
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
        return;
      });

  });
  
});

function getUsersFeeds(username, callback){
  userModel.findOne({ username: username}, function(err, user){
    if(err || !user){
      callback(err, null);
    }else{
      let urls = [];
      user.categories.map(item => {
        if(item.categoryUrls && item.categoryUrls[0] !== ""){
          for(let url of item.categoryUrls){
            if(url){
              urls.push(url);
            }
          }          
        }        
      });      
      callback(false,urls);
    }
    
    
  });
}

app.post('/api/updateUser', function(req, res){
  const {username, categories} = req.body;
  const query = {'username' : username};
  const set = {'categories': categories};
  userModel.update(query, set, function(err){
    if(err) {
      res.send({ error: err });
    } else {
      res.send({ error: false });
    }
  });
});

app.post('/api/signup', function (req, res) {
  console.log('signup body ', req.body);
  let newUser = new userModel(req.body);
  newUser.save(function (err) {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({ error: false });
    }
    return;

  });
});

app.post('/api/login', function (req, res) {
  const { username, password } = req.body;
  userModel.findOne({ username: username}, function(err, user){
    if(err || !user){
      return res.send({});    
    }else{
      let User = new userModel(user);
      User.passwordIsValid(password, function(err, result){
        if(err){
          return res.send({});    
        }else if(!result){
          return res.send({});    
        }    
        const userInfo = {
          username: user.username,
          categories: user.categories
        };
        return res.status(200).send(JSON.stringify(userInfo));
      });
    }
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


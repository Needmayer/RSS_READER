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
import { userSchema, loginSchema } from './mongoSchemas.js';
import expressValidator from 'express-validator';
import registrationSchema from './validationSchemas/validationSchemas.js';
import { check, validationResult } from 'express-validator/check';
//import User from './models/userModel';
//import userRouter from './routes/userRouter';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/rss_reader', { useMongoClient: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let userModel = mongoose.model('users', userSchema);
let parser = new xml2js.Parser();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

//app.use('/api/users', userRouter(User));

app.post('/api/rss', function (req, res) {
  let JSONS = [];
  let { username } = req.body;
  console.log(req.body);
  //zaroven to chce ceknout jestli je user doopravdy lognuty v session
  if (!username) {
    res.send({});
    return;
  }
  getUsersFeeds(username, function (err, urls) {
    if (err) {
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

function getUsersFeeds(username, callback) {
  userModel.findOne({ username: username }, function (err, user) {
    if (err || !user) {
      callback(err, null);
    } else {
      let urls = [];
      user.categories.map(item => {
        if (item.categoryUrls && item.categoryUrls[0] !== "") {
          for (let url of item.categoryUrls) {
            if (url) {
              urls.push(url);
            }
          }
        }
      });
      callback(false, urls);
    }


  });
}

app.post('/api/updateUser', function (req, res) {
  const { username, categories } = req.body;
  const query = { 'username': username };
  const set = { 'categories': categories };
  userModel.update(query, set, function (err) {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({ error: false });
    }
  });
});

app.post('/api/signup', [
  check('password', 'Password must be at least 12 characters').isLength({ min: 12 })
], function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.mapped() }); //err.mapped()
  }
  let newUser = new userModel(req.body);
  newUser.save(function (err) {
    if (err) {
      res.send({ error: { code: err.code } });
    } else {
      res.send({ error: false });
    }
    return;

  });
});

app.post('/api/login', async function (req, res) {

  const delayResponse = response => {
    setTimeout(() => {
      response();
    }, 1000);
  };

  const { username, password } = req.body;
  const {ip} = req;

  req.checkBody(loginSchema);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return delayResponse(() => res.status(401).send({error: "Invalid username or password."}));
  }

  const identityKey = `${username}-${ip}`;
    const Logins = mongoose.model('logins', loginSchema);    
  
  if(!await Logins.canAuthenticate(identityKey)){
    return delayResponse(() => res.status(500).send({error: "The account is temporarily locked out."}));
  }
  if(await Logins.inProgress(identityKey)){
    return delayResponse(() => res.status(500).send({error: "Login already in progress. Please wait."}));
  }

  const existingUser = await userModel.findOne({ username: username }).exec();
    if(existingUser && await existingUser.passwordIsValid(password)){      
        const userInfo = {
          username: existingUser.username,
          categories: existingUser.categories
        };
        await Logins.succesfulLoginAttempt(identityKey);        
        return delayResponse( () => res.status(200).send(userInfo));
      }else{
        await Logins.failedLoginAttempt(identityKey);
        return delayResponse(() => res.status(401).send({error: "Invalid username or password."}));
      }

    
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


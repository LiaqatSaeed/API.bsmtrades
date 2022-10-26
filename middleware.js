import jsonwebtoken from 'jsonwebtoken';
import { transporter } from './Services/awssmtp.email';
require('dotenv').config();
var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const expiredAfter = 60 * 60 * 100000;
const nodeMailer = require('nodemailer');
import isEmpty from 'lodash/isEmpty';

const {
  CONNECTION_STRING,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  ADMIN_EMAIL,
  DEV_EMAIL,
  JWT_SECRET_KEY,
} = process.env;

const authenticate = (req, res, next) => {
  const token =
    req.headers.authorization !== undefined
      ? req.headers.authorization.split(' ')[1] || ''
      : '';
  token !== ''
    ? jsonwebtoken.verify(token, JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        res.json({ error: 'Your Session expired', logout_auto: true });
      } else {
        const { expiredAt, Users } = decoded;
        const {
          userData: { active_until = '' },
        } = Users;
        if (!isEmpty(active_until) && new Date(active_until) < new Date()) {
          res.json({
            error: 'Your Subscription is expired. Please contact your admin',
            logout_auto: true,
          });
        } else if (expiredAt > new Date().getTime()) {
          req.userModel = Users;
          next();
        } else {
          res.json({ error: 'Your Session expired', logout_auto: true });
        }
      }
    })
    : req.userModel === undefined
      ? res.json({ error: 'Your Session expired', logout_auto: true })
      : next();
};

const authError = (err, req, res, next) => {
  res.json(err);
};

const MongoConnect = (callback) => {
  mongoose.connect(
    CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, db) => callback(err, db)
  );
};

const DBConnection = async (req, res, next) => {
  MongoConnect((err, db) => {
    if (err) next({ error: err, status: 505 });

    //console.log("Connected ........");
    req.db = db;
    next();
  });
};

const sendSms = async (req, res, next) => {
  req.sendSms = client;
  next();
};

const EncryptPass = async (req, res, next) => {
  let { user } = req.body;
  bcrypt.hash(user.password, null, null, function (err, hash) {
    // Store hash in your password DB.
    if (err)
      next({
        error: 'Something went wrong please contact your admin',
        status: 404,
      });

    user.password = hash;
    req.body.user = user;
    next();
  });
};

const comparePass = async (req, res, usrObj, callback) => {
  bcrypt.compare(req.body.password, usrObj, function (err, result) {
    if (err) res.json({ error: 'invalid password', status: 200 });

    callback(result);
  });
};

const removeEmpty = (req, res, next) => {
  const { query } = req;
  Object.keys(query).map((key) => {
    if (query[key] === '') {
      delete query[key];
    }
    return query;
  });
  req.query = query;
  next();
};

const getJwtoken = async (Users) => {
  try {
    return await jsonwebtoken.sign(
      {
        expiredAt: new Date().getTime() * expiredAfter,
        Users,
        id: 1,
      },
      JWT_SECRET_KEY
    );
  } catch (error) {
    console.log(error);
  }
};

const transporterNode = async (req, res, next) => {
  const EmailConfig = {
    host: AWS_REGION,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: AWS_ACCESS_KEY_ID, // generated ethereal user
      pass: AWS_SECRET_ACCESS_KEY, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  return nodeMailer.createTransport(EmailConfig);
};

const sendErrorHandlerEmails = async (err, config) => {
  try {
    var mailOptions = {
      from: ADMIN_EMAIL,
      to: DEV_EMAIL,
      subject: 'Error Handeling forex174',
      html: err,
      ...config,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
  //const transporter = await transporterNode();
};

export {
  authenticate,
  authError,
  DBConnection,
  EncryptPass,
  mongoose,
  sendSms,
  comparePass,
  getJwtoken,
  MongoConnect,
  removeEmpty,
  transporterNode,
  sendErrorHandlerEmails,
};

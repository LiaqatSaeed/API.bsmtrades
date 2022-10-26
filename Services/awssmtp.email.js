let nodemailer = require('nodemailer');
let aws = require('@aws-sdk/client-ses');
let { defaultProvider } = require('@aws-sdk/credential-provider-node');
require('dotenv').config();

const {
  AWS_REGION,
} = process.env;

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: AWS_REGION,
  defaultProvider,
});

// create Nodemailer SES transporter
export const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

// send some mail

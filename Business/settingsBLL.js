import { sendErrorHandlerEmails } from '../middleware';

require('dotenv').config();
const { SALES_EMAIL, DOMAIN_NAME, SITE_MANAGER, ADMIN_EMAIL, BBC_EMAIL } = process.env;

/**
 * Helpfull email sending article https://betterprogramming.pub/how-to-send-emails-with-node-js-using-amazon-ses-8ae38f6312e4
 * @param {} param0
 */
const sendRegistrationEmailTo = async ({ first_name, last_name, email }) => {
  try {
    sendErrorHandlerEmails(undefined, {
      from: SALES_EMAIL,
      to: SITE_MANAGER,
      bcc: BBC_EMAIL,
      subject: 'Activate: New User Registration',
      html: `Hi Admin, <br/>
      <b>Name:</b> ${first_name} ${last_name}  <br/>
      <b>Email:</b> ${email} <br/>
      
      User Submitted new registration request on www.${DOMAIN_NAME}.com. Please activate user account. 
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendPostTrade = async ({
  trade_size,
  symbol,
  open_price,
  trade_type,
  user_email,
  ticket_id,
}, html, from) => {
  try {
    return await sendErrorHandlerEmails(undefined, {
      from: `${from} <${SALES_EMAIL}>`,
      sender: SALES_EMAIL,
      to: user_email,
      bcc: [BBC_EMAIL, SITE_MANAGER, ADMIN_EMAIL],
      envelope: {
        from: `${from} <${SALES_EMAIL}>`,
        sender: SALES_EMAIL,
        to: [user_email, SITE_MANAGER, ADMIN_EMAIL]
      },
      subject: `${from} # ${ticket_id}`,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendErrorEmails = async (err, config) => {
  try {
    sendErrorHandlerEmails(undefined, {
      from: SALES_EMAIL,
      html: err,
      ...config,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendRegistrationEmailTo, sendErrorEmails, sendPostTrade };

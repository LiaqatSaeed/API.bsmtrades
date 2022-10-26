

const BUY_COLOR = '#D0ECE7';
const SELL_COLOR = '#F9EBEA';
const BUY = 'Buy';
const FONT_SIZE = '14px';
const TRADE_CLOSURE_BG = '#F9EBEA';


export const closeTradeTemplate = ({ ticket_id, symbol, open_price, open_time, trade_type, close_price, close_time, profit, trade_size }) => (
    `${`
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">

<head>
  <title></title>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
    }

    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
    }

    p {
      line-height: inherit
    }

    @media (max-width:500px) {
      .icons-inner {
        text-align: center;
      }

      .icons-inner td {
        margin: 0 auto;
      }

      .row-content {
        width: 100% !important;
      }

      .column .border {
        display: none;
      }

      .stack .column {
        width: 100%;
        display: block;
      }
    }
  </style>
</head>

<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table class="nl-container" role="presentation"
    style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="100%" cellspacing="0"
    cellpadding="0" border="0">
    <tbody>
      <tr>
        <td>
          <table class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 480px;" width="480"
                    cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr style="display:flex">
                        <td class="column column-1"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="100%">
                          <table class="divider_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="10" border="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div align="center">
                                    <table role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0">
                                      <tbody>
                                        <tr>
                                          <td class="divider_inner"
                                            style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
                                            <span> </span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: ${TRADE_CLOSURE_BG}; color: #000000; width: 480px;"
                    width="480" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr >
                        <td class="column column-1"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="100%">
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: 28px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    <strong>&nbsp;Trade Closure Confirmation</strong></h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 480px;" width="480"
                    cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr>
                        <td class="column column-1"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="100%">
                          <table class="divider_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="10" border="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div align="center">
                                    <table role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0">
                                      <tbody>
                                        <tr>
                                          <td class="divider_inner"
                                            style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
                                            <span> </span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: `} ${trade_type === BUY ? BUY_COLOR : SELL_COLOR} ${`; color: #000000; width: 480px;"
                    width="480" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr style="display:flex">
                        <td class="column column-1"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="50%">
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:15px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Ticket #</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Currency</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Trade Type</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Trade Size in Lots</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Open Price</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Open Time</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Close Price</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-left:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Close Time</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td
                                  style="width:100%;text-align:center;padding-top:10px;padding-left:10px;padding-bottom:5px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    Profit/Loss in USD</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td class="column column-2"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="50%">
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:15px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${ticket_id}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${symbol}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${trade_type}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${trade_size}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${open_price}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${new Date(open_time).toLocaleString()}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${close_price}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${new Date(close_time).toLocaleString()}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="heading_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="width:100%;text-align:center;padding-top:10px;padding-bottom:5px;">
                                  <h1
                                    style="margin: 0; color: #555555; font-size: ${FONT_SIZE}; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    ${profit}</h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 480px;" width="480"
                    cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr>
                        <td class="column column-1"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="100%">
                          <table class="divider_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="10" border="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div align="center">
                                    <table role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0">
                                      <tbody>
                                        <tr>
                                          <td class="divider_inner"
                                            style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
                                            <span> </span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 480px;" width="480"
                    cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr>
                        <td class="column column-1"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                          width="100%">
                          <table class="icons_block" role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0"
                            cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td
                                  style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                  <table role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align: middle; text-align: center;">
                                          <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                          <!--[if !vml]><!-->
                                          <table class="icons-inner" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"
                                            cellspacing="0" cellpadding="0">
                                            <!--<![endif]-->
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;">
                                                  <a style="color: #495057;font-size: 24px;font-weight: bolder;font-family: Arial, Helvetica Neue, Helvetica, sans-serif;"
                                                    target="_blank"
                                                    href="https://newtontrades.com/">NewtonTrades.com</a></td>

                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><!-- End -->

</body>

</html>
`}`)
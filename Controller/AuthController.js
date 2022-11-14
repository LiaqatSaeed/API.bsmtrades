var express = require('express');
var router = express.Router();
import { isNil, sortBy, filter,map, size } from 'lodash';
import first from 'lodash/first';
import { sendRegistrationEmailTo } from '../Business/settingsBLL';
import {
  authError,
  comparePass,
  DBConnection,
  EncryptPass,
  getJwtoken,
  mongoose,
} from '../middleware';
import Pages from '../Model/Pages';
import Permission from '../Model/Permissions';
import User from '../Model/User';

require('dotenv').config();

const { DEFAULT } = process.env;

//import { minifySVG } from "../compress";
router.use(DBConnection, authError);
router.use('/register', EncryptPass, authError);

var routes = () => {
  router.post('/register', async (req, res, next) => {
    try {
      console.log(req.body);
      let {
        body: { user },
      } = req;
      User.findOne({ email: user.email }, async (err, users) => {
        if (users != null) {
          res.json({ error: 'User Already exist!' });
        } else {
          let defaultPermission = await Permission.find({ name: DEFAULT });
          const { _id: permissionId } = first(defaultPermission);
          user = { ...user, permission_id: permissionId };
          user = new User(user);

          user.save(async (err, user) => {
            if (err) {
              res.status(500).send(err);
            } else {
              sendRegistrationEmailTo(user);

              res.json({
                msg: 'You have been Successfully Registered. Your account is In Review and will be activated by admin ',
              });
            }
          });
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/test', async (req, res) => {
    try {
      sendRegistrationEmailTo({
        first_name: 'liaqat',
        last_name: 'Saeed',
        email: 'liaqatsaeed007@gmail.com',
      });
      res.send('email sent');
    } catch (error) {
      res.send(err);
    }
  });

  router.post(
    '/login',
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
        User.findOne({ email: email }, function (err, users) {
          if (users != null) {
            comparePass(req, res, users.password, async (results) => {
              let response = { error: 'Invalid username or password' };
              if (results) {
                let { _id, is_active, active_until = '' } = users;
                if (!is_active) {
                  response = {
                    error: 'Account is not activated, Please contact admin',
                  };
                  res.json(response);
                } else {
                  if (
                    active_until !== '' &&
                    new Date(active_until) < new Date()
                  ) {
                    response = {
                      error:
                        'Your Subscription is expired please contact your admin',
                    };
                    res.json(response);
                  } else {
                    let UserWithPermission = await User.aggregate([
                      {
                        $match: {
                          _id: mongoose.Types.ObjectId(_id),
                        },
                      },
                      {
                        $lookup: {
                          from: 'permissions',
                          localField: 'permission_id',
                          foreignField: '_id',
                          as: 'permissions',
                        },
                      },
                      {
                        $unwind: {
                          path: '$permissions',
                          preserveNullAndEmptyArrays: true,
                        },
                      },
                      {
                        $lookup: {
                          from: 'pages',
                          localField: 'permissions.pages.page_name',
                          foreignField: 'value',
                          as: 'pages',
                        },
                      },
                      {
                        $project: {
                          role: 1,
                          _id: 1,
                          first_name: 1,
                          last_name: 1,
                          email: 1,
                          active_until: 1,
                          permissions: 1,
                          permission_id: 1,
                          pages: 1,
                        },
                      },
                    ]);

                    req.user = first(UserWithPermission);
                    next();
                  }
                }
              } else {
                res.json(response);
              }
            });
          } else {
            res.json({ error: 'Invalid username or password' });
          }
        });
      } catch (error) {
        res.status(500).send(error);
      }
    },
    getUserPermissions
  );
  return router;
};

const getUserPermissions = async (req, res) => {
  try {
    let {
      user: {
        _id,
        first_name,
        last_name,
        email,
        role,
        permission_id,
        permissions: { all_page_access = false } = {},
        active_until,
        pages = [],
      },
    } = req;

    //role
    if (role === 'SuperAdmin' || all_page_access === true) {
      pages = await Pages.find({}).lean().exec();
    }
    role = role === 'SuperAdmin' ? undefined : role;
    let response = {
      userData: { first_name, last_name, role, active_until },
    };


    let pageWithSubMenus = filter(map(pages, item => {

      let content = sortBy(filter(pages, subItem => subItem.parent_id === item.value),"value");
     if(size(content)> 0) {
       item.content = content;
     }

      return item;
    }), item => isNil(item.parent_id))

    pages = sortBy(pageWithSubMenus, "value");


    response.token = await getJwtoken({
      userData: { _id, role, permission_id, active_until },
    });
    response.permissions = [{ pages }];
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = routes;

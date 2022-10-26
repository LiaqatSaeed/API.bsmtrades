var express = require('express');
var router = express.Router();
import { mongoose } from '../middleware';
const { ObjectId } = mongoose.Types;
import {
  DBConnection,
  authError,
  EncryptPass,
  comparePass,
  getJwtoken,
  authenticate,
  removeEmpty,
} from '../middleware';
import first from 'lodash/first';
import map from 'lodash/map'

import User from '../Model/User';

router.use(authenticate, DBConnection, authError);
router.use(removeEmpty);

router.use('/register', EncryptPass, authError);

router.use('/id/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;
  User.findById(mongoose.Types.ObjectId(id), (err, user) => {
    if (err) res.status(500).send(err);
    else {
      req.user = user;
      next();
    }
  });
});

var routes = () => {
  router.post('/', EncryptPass, async (req, res) => {
    try {
      const { user } = req.body;

      var user = new User(user);
      user.save((err, user) => {
        if (err) res.status(500).send(err);

        res.json({ data: user });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //: GET ALL
  router.get('/', async (req, res) => {
    try {
      const { searchString } = req.query;
      console.log('search users called');

      const query = {
        _id: { $ne: ObjectId(req.userModel._id) },
        $or: [
          { user_name: new RegExp(searchString, 'i') },
          { first_name: new RegExp(searchString, 'i') },
          { last_name: new RegExp(searchString, 'i') },
        ],
        role: 'user',
      };
      User.find(query, function (err, users) {
        res.send({ data: users });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  router.get('/ddl', async (req, res) => {
    try {
      User.find({ role: 'user' }, function (err, users) {
        users = map(users, (item) => {
          return {
            value: `${item.first_name} ${item.last_name}`,
            label: item.email,
          };
        });
        res.send({ data: users });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      User.findOne({ email: req.body.email }, function (err, users) {
        comparePass(req, res, users.password, async () => {
          var response = {
            userData: users,
          };
          response.token = await getJwtoken(users);
          res.json(response);
        });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });



  router
    .route('/id/:id')
    //: GET
    .get((req, res) => {
      res.json({ data: req.user });
    })
    //: GET PUT

    .put(async (req, res, next) => {
      const { user } = req.body;
      const { id } = req.params;
      User.updateOne({ _id: id }, user, async function (result, err) {
        User.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(id),
            },
          },
          {
            $addFields: {
              password: '',
            },
          },
        ])
          .then(async (updated) => {
            updated = first(updated);
            var response = {
              userData: updated,
            };
            response.token = await getJwtoken(updated);

            res.json({
              data: response,
              meta: { message: 'Updated Successfully' },
            });
          })
          .catch((error) =>
            res.status(500).send({ error: error, msg: 'user Update 1' })
          );
      }).catch((error) => {
        res.status(500).send({ error: error, msg: 'user Update 1' });
      });
    })
    //: PATCH

    .patch((req, res) => {
      User.update({ _id: req.params.id }, req.body)
        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          res.status(500).send(error);
        });
    })
    //: DELETE

    .delete(async (req, res) => {
      try {
        User.findByIdAndRemove(req.params.id, (err, todo) => {
          if (err) return res.status(500).send(err);
          return res.status(200).json({
            meta: { message: 'Records has been delete successfully!' },
          });
        });
      } catch (error) { }
    });

  return router;
};

module.exports = routes;

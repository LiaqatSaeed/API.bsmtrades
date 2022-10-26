var express = require('express');
var router = express.Router();
import {
  DBConnection,
  authError,
  authenticate,
  removeEmpty,
} from '../middleware';

import Permission from '../Model/Permissions';
import Pages from '../Constants/pages.json';
import { map, includes, filter, join } from 'lodash';

router.use(authenticate, DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
  Permission.findById(req.params.id, (err, permission) => {
    if (err) res.status(500).send(err);
    else {
      req.permission = permission;
      next();
    }
  });
});

var routes = () => {
  router.post('/', async (req, res) => {
    try {
      const { permission } = req.body;
      var permissionObj = new Permission(permission);
      const { userData } = req.userModel;

      permissionObj.created_by = userData._id;
      var result = await permissionObj.save();
      res.send({ data: result });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  router.get('/', async (req, res) => {
    try {
      const { query = {} } = req;

      Permission.find(query, function (err, permissions) {
        permissions = map(permissions, (item) => {
          let { pages, instruments, groups } = item;
          pages = map(pages, (page) => page.page_name);
          pages = filter(Pages, (page) => includes(pages, page.value));
          pages = map(pages, (page) => page.label);
          pages = join(pages, ', ');
          item.pages = pages;

          instruments = join(instruments, ', ');
          item.instruments = instruments;
          groups = join(groups, ', ');
          item.groups = groups;
          return item;
        });
        res.send({ data: permissions });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  router.get('/pages/ddl', async (req, res) => {
    try {
      res.send({ data: Pages });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  router.get('/ddl', async (req, res) => {
    try {
      Permission.find({}, function (err, permissions) {
        permissions = map(permissions, (item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        res.send({ data: permissions });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  router
    .route('/id/:id')
    .get((req, res) => {
      res.json({ data: req.permission });
    })
    .put(async (req, res, next) => {
      const { permission } = req.body;
      Permission.updateOne(
        { _id: req.params.id },
        permission,
        function (err, result) {
          if (err) {
            res
              .status(500)
              .send({ error: err, msg: 'Permission Update error' });
          } else {
            res.json({
              data: permission,
              meta: { message: 'Update Successfully' },
            });
          }
        }
      ).catch((err) => {
        res.status(500).send({ error: err, msg: 'Permission Update error' });
      });
    })
    .delete((req, res) => {
      try {
        //console.log(req.params.id);
        Permission.findByIdAndRemove(req.params.id, (err, todo) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: 'Permission successfully deleted',
            id: todo._id,
          };
          return res.status(200).json({
            meta: { message: 'Records has been delete successfully!' },
          });
        });
      } catch (error) {
        res.status(500).send(error);
      }
    });
  return router;
};

module.exports = routes;

import { Router } from 'express';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import getUserOrders from '../services/users/getUserOrders.js';
import getAllUsers from '../services/users/getAllUsers.js';
import getUserById from '../services/users/getUserById.js';
import authMiddleware from '../middleware/auth.js';
import createUser from '../services/users/createUser.js';
import updateUserById from '../services/users/updateUserById.js';
import deleteUser from '../services/users/deleteUser.js';

const router = Router();

router.get('/', async (req, res) => {
  const { username } = req.query;
  const users = await getAllUsers(username);
  res.status(200).json(users);
});

router.get(
  '/:id/orders',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userOrders = await getUserOrders(id);

      res.status(200).json(userOrders);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.post('/', authMiddleware, async (req, res) => {
  const { username, password } = req.body;
  const newUser = await createUser(username, password);
  res.status(201).json(newUser);
});

router.put(
  '/:id',
  authMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const updatedUser = await updateUserById(id, username, password);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.delete(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUserId = await deleteUser(id);

      res.status(200).json({
        message: `User with id ${deletedUserId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;

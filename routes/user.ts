import express from 'express';
import User from '../components/User';

const router = express.Router();

/**
 * Gets all user
 */
router.get('/', (req, res) => {
  try {
    const users = User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets user with given ID
 */
router.get('/:id', (req, res) => {
  try {
    const user = User.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Creates a new user
 */
router.post('/', (req, res) => {
  const userName = req.body.name;
  if (!userName) {
    res.status(400).json({ msg: 'You have to enter a User Name' });
  }
  try {
    User.addUser(userName);
    res.status(200).json({ msg: `New user with name ${userName} was created` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Updates user with given ID
 */
router.put('/:id', (req, res) => {
  try {
    User.updateUser({
      userId: req.params.id,
      name: req.body.name,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json({ msg: `updated user with id ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Deletes user with given ID
 */
router.delete('/:id', (req, res) => {
  try {
    User.deleteUser(req.params.id);
    res.status(200).json({ msg: `User with id ${req.params.id} was deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;

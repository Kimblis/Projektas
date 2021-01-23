import express, { Request, Response } from 'express';
import User from '../Controllers/User';

const router = express.Router();

/**
 * Gets all user
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const users = User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets user with given ID
 * @param userId User ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const user = User.getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Creates a new user and returns created user
 * @param name User name
 */
router.post('/', (req: Request, res: Response) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({ msg: 'You have to enter a User Name' });
  }
  try {
    const addedUser = User.addUser(name);
    res.status(200).json(addedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Updates user with given ID and returns updated user
 * @param userId User ID
 * @param name New name of the user
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const updatedUser = User.updateUser({
      userId: req.params.id,
      name: req.body.name,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Deletes user with given ID and returns that user
 * @param userId User ID
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deletedUser = User.deleteUser(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;

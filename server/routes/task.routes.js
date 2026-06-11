const router = require('express').Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const { verifyToken } = require('../middleware/auth.middleware');

router.use(verifyToken);

router.post('/', createTask);

router.get('/', getMyTasks);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;
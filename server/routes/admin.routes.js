const router = require('express').Router();

const {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
} = require('../controllers/admin.controller');

const {
  verifyToken,
  isAdmin,
} = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(isAdmin);

router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

router.get('/tasks', getAllTasks);
router.delete('/tasks/:id', deleteAnyTask);

router.get('/logs', getActivityLogs);

module.exports = router;
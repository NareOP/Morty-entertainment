const Router = require('express-promise-router');
const { login, register } = require('../controllers/auth');

const router = Router({ mergeParams: true });

router.post('/register', register);
router.post('/login', login);

module.exports = router;

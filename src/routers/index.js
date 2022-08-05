const Router = require('express-promise-router');

const auth = require('./auth');
const dailylogs = require('routers/dailylogs');
const health = require('./health');

const router = Router();

router.use('/auth', auth);
router.use('/dailylogs', dailylogs);
router.use('/health', health);

module.exports = router;

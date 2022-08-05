const Router = require('express-promise-router');
const {
  createDailylog,
  updateDailylog,
  deleteDailylog,
  getDailylogs,
} = require('controllers/dailylogs');

const router = Router({ mergeParams: true });

router.post('/', createDailylog);
router.put('/:id', updateDailylog);
router.delete('/:id', deleteDailylog);
router.get('/:id?', getDailylogs);

module.exports = router;

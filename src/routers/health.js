const Router = require('express-promise-router');

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.status(200).send({
    message: "Hey Ricky I'm here.",
  });
});

module.exports = router;

const { app } = require('./app');
const { PORT } = require('configs');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${PORT}`);
});

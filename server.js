const dotenv = require('dotenv');
const app = require(`${__dirname}/app.js`);
dotenv.config({ path: `${__dirname}/config.env` });

const port = process.env.PORT || 5602;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app.js`);
const port = process.env.PORT || 5609;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

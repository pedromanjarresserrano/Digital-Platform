const app = require("./server");
const db = require('./utils/db');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "out")));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

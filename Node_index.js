const express = require("express");

const app = express();

app.get('/get', (req, res) => {
    res.send("Hello World");
});

app.listen(5050, () => {
    console.log("Hey port is running on 5050");
});

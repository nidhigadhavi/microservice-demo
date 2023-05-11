const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3001, () => {
	console.log("Listening on port 3000");
});

module.exports = app;



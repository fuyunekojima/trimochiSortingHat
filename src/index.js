const { Client } = require("klasa");
const {config, token} = require("./config");


new Client(config).login(token);

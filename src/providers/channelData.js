const { Provider } = require("klasa");
const Datastore = require("nedb-promises");
const util = require('util');

module.exports = class extends Provider {
  constructor(...args) {
    super(...args, {
      name: "ChannelData",
      description: ""
    });
    this.db = null;
    this.findStore = null;
  }

  async init() {
    this.db = await new Datastore({
      filename: "channelData.db",
      autoload: true
    });
    this.findStore = util.promisify(this.db.find).bind(this.db);
  }
};

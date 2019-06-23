const { Command } = require("klasa");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ["text", "dm", "group"],
      permissionLevel: 0,
      description: "ロビーに集める"
    });

    this.channelData = this.client.providers.get("ChannelData");
  }
  async run(message) {
    const checked = await this.checkDatabase(message);
    const aChannel = await this.client.channels.fetch(checked.aChannel);
    const bChannel = await this.client.channels.fetch(checked.bChannel);
    const lobby = await this.client.channels.fetch(checked.lobbyChannel);
    let aMembers = aChannel.members;
    let bMembers = bChannel.members;
    const abMembers = aMembers.concat(bMembers);
    abMembers.each(async member => {
      await member.voice.setChannel(lobby);
    });
  }
  async checkDatabase(message) {
    const guildId = message.guild.id;
    const finded = await this.channelData.db.find({
      guild: guildId
    });
    if (finded.length > 1) {
      message.sendMessage(
        `サーバーID[ ${guildId} ]を含むデータが複数あります。はっちゃんに問い合わせてください。`
      );
      return false;
    }
    if (finded === null) {
      message.sendMessage(`サーバーデータがありません。`);
      return false;
    }
    if (finded[0].lobbyChannel === "") {
      message.sendMessage(
        `ロビーチャンネルのデータがセットされていません。\nロビーにしたいチャンネルに参加し、参加者が [ ?hat set lobby ] コマンドを使用してセットしてください。`
      );
      return false;
    }
    if (finded[0].aChannel === "") {
      message.sendMessage(
        `Aチャンネルのデータがセットされていません。\nAチャンネルにしたいチャンネルに参加し、参加者が [ ?hat set a ] コマンドを使用してセットしてください。`
      );
      return false;
    }
    if (finded[0].bChannel === "") {
      message.sendMessage(
        `Bチャンネルのデータがセットされていません。\nBチャンネルにしたいチャンネルに参加し、参加者が [ ?hat set b ] コマンドを使用してセットしてください。`
      );
      return false;
    }
    if (
      finded[0].bChannel === finded[0].aChannel ||
      finded[0].lobbyChannel === finded[0].aChannel ||
      finded[0].lobbyChannel === finded[0].bChannel
    ) {
      message.sendMessage(
        `チャンネルIDに重複があります。チャンネルIDはユニークでなければなりません。`
      );
      return false;
    }
    return finded[0];
  }
};

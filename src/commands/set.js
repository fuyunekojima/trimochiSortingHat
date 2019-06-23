const { Command } = require("klasa");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ["text", "dm", "group"],
      permissionLevel: 0,
      usage: "<channel:string>",
      description: "チャンネルを登録する"
    });
  }

  async run(message, channelName) {
    const guildId = message.guild.id;
    const channelData = this.client.providers.get("ChannelData");
    if (channelName.length !== 1) {
      return;
    }
    const guildFinded = await channelData.db.findOne({guild: message.guild.id});

    if(guildFinded === null){
      await channelData.db.insert({
        guild: message.guild.id,
        lobbyChannel: "",
        aChannel: "",
        bChannel: ""
      });
    }

    const joinedVoiceChannel = message.member.voice.channel;
    if (joinedVoiceChannel === null) {
      message.sendMessage("ボイスチャンネルに接続していません。");
      return;
    }

    const voiceChannelId = joinedVoiceChannel.id;
    const queries = {
      lobby: {
        lobbyChannel: voiceChannelId,
        guild: guildId
      },
      aChannel: {
        aChannel: voiceChannelId,
        guild: guildId
      },
      bChannel: {
        bChannel: voiceChannelId,
        guild: guildId
      }
    };

    let query = {};
    if (channelName[0] === "lobby") {
      query = queries.lobby;
    } else if (channelName[0] === "a") {
      query = queries.aChannel;
    } else if (channelName[0] === "b") {
      query = queries.bChannel;
    } else {
      return;
    }
    
    const finded = await channelData.db.findOne(query);
    if(finded !== null){
      message.sendMessage("チャンネルIDが同一のため、なにもしません。");
      return;
    }
    const created = await channelData.db.update({
      guild: guildId
    }, {
      $set: query
    });
    if(created === 1){
      message.sendMessage(`${message.member.voice.channel.name}を${channelName[0]}チャンネルとしてセットしました。`);
    }
  }
};

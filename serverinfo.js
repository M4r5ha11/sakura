'use strict';

const { Client, MessageEmbed } = require('discord.js');


const client = new Client();


client.on('ready', () => {
  console.log('serverinfo готов!');
});

client.on('message', message => {
  
  if (message.content === '+serverinfo') {
      const embed = new MessageEmbed()
//.setTitle("Информация о сервере")
.setColor("RANDOM")
.addField("Название сервера", message.guild.name)
.addField("Овнер", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Каналы", message.guild.channels.cache.size, true)
.addField("Роли", message.guild.roles.cache.size, true)
.addField("Создан", message.guild.createdAt)
.addField("ТЫ присоеденился", message.member.joinedAt)
.setFooter(message.author.username, message.author.avatarURL);
 message.channel.send(embed);
  }
});

client.login('your-token');
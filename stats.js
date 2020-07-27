'use strict';
const { Client, MessageEmbed } = require('discord.js');


const client = new Client();


client.on('ready', () => {
  console.log('stats готов!');
});

client.on('message', message => {
  
  if (message.content === '+stats') {
  
    const embed = new MessageEmbed() 
      
      .setTitle('__**Статистика бота:**__')
     
      .setColor("RANDOM")
            .setDescription(`\nСерверов: ${client.guilds.cache.size}\nКаналов: ${client.channels.cache.size}\nЮзеров: ${client.users.cache.size}`);
    message.channel.send(embed);
  }
});
client.login('your-token');
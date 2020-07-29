'use strict';

const { Client, MessageEmbed } = require('discord.js');


const client = new Client();


client.on('ready', () => {
  console.log('хелп готов!');
});

client.on('message', message => {
  
  if (message.content === '+help') {
  
    const embed = new MessageEmbed()
      
      .setTitle('Меню')
     
      .setColor("RANDOM")
            .setDescription('[Список команд](http://boorucord.rf.gd/help.html)\n[Сервер поддержки](https://discord.gg/FXgy5x6)');
    message.channel.send(embed);
  }
});
client.login('your-token');

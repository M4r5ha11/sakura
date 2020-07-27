'use strict';




const { Client, MessageEmbed } = require('discord.js');


const client = new Client();


client.on('ready', () => {
  console.log('Booru готов!');
});

client.on('message', message => {
  
  if (message.content === '+booru') {
    
    const embed = new MessageEmbed()
    
      .setTitle('[Категория] => [Booru]')
    
      .setColor(0x9088E9)
     
      .setDescription('Команды:\n`+safebooru`\n`+gelbooru`\n`+danbooru`\n`+yandere`\n`+lolibooru`');
      message.channel.send(embed);
  }
});
client.login('your-token');

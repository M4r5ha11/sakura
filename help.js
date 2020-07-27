'use strict';

const { Client, MessageEmbed } = require('discord.js');


const client = new Client();


client.on('ready', () => {
  console.log('хелп готов!');
});

client.on('message', message => {
  
  if (message.content === '+help') {
  
    const embed = new MessageEmbed()
      
      .setTitle('Список команд:')
     
      .setColor("RANDOM")
            .setDescription('**1. Утилиты:**\n`+say`,`+ping`,`+info`,`+serverinfo`,`+stats`\n**2. Бабло:**\n`+leaderboard <@человек>`,`+daily`,`+slots`,`+transfer`,`+coinflip <голова, хвост>`,`+balance`,\n`+work <Работы на вкус и цвет: касир, владелец магазина, праститутка, менеджер, бомж, хентайзвезда>,`+dice`\n**3. Root:**\n`+kick <@юзер или его ID>`,`+ban <@юзер или его ID>`,`+clear <число от 2 до 100>`\n**4. Anime:** `+booru`');
    message.channel.send(embed);
  }
});

client.login('your-token');
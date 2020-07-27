// либы
const Discord = require("discord.js");
const client = new Discord.Client();
const eco = require("discord-economy");
const booru = require('booru')
// конфиг, команды
const config = require("./config.json");
const economy = require("./cmd/economy.js");
const help = require("./cmd/help.js");
const booruhelp= require("./cmd/booru.js");
const info = require("./cmd/info.js");
const si = require("./cmd/serverinfo.js");
const stats = require("./cmd/stats.js");
 // остальное
 client.on("ready", () => {
     console.log(`Привет, ${client.user.username} сейчас онлайн!`);
 client.user.setActivity('+help | v0.0.3', { type: 'WATCHING' });
 });
client.on("guildCreate", guild => {
    console.log(`Новый сервер: ${guild.name} (ID: ${guild.id}). На этом сервере ${guild.memberCount} людей!`);
});

client.on("guildDelete", guild => {
   console.log(`Я удалена с: ${guild.name} (ID: ${guild.id})`);
});
client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

// booru. Спасибо сухину! 
  if(command === "safebooru") {
        const Tags = args.join(" ");
        booru.search('safebooru', [Tags], {limit: 5, random: true})
            .then(posts => {
            for (let post of posts)
            message.channel.send(post.fileUrl);  
  })
  } 
if(command === "danbooru") {
        const Tags = args.join(" ");
        booru.search('danbooru', [Tags], {limit: 1, random: true})
            .then(posts => {
            for (let post of posts)
            message.channel.send(post.fileUrl);
  })
  } 

if(command === "gelbooru") {
        const Tags = args.join(" ");
        booru.search('gelbooru', [Tags], {limit: 1, random: true})
            .then(posts => {
            for (let post of posts)
            message.channel.send(post.fileUrl);
  })
  } 

if(command === "lolibooru") {
        const Tags = args.join(" ");
        booru.search('lolibooru', [Tags], {limit: 1, random: true})
            .then(posts => {
            for (let post of posts)
            message.channel.send(post.fileUrl);
  })
  } 

if(command === "yandere") {
        const Tags = args.join(" ");
        booru.search('yandere', [Tags], {limit: 1, random: true})
            .then(posts => {
            for (let post of posts)
            message.channel.send(post.fileUrl);
  })
  } 
// ---------------------------
 if(command === "setstatus") {
        const newstatus = args.join(" "); 
        client.user.setActivity(newstatus); // новый статус
    }
if(command === "ping") {
    const m = await message.channel.send("Пинг?");
    m.edit(`Pong! Задержка ${m.createdTimestamp - message.createdTimestamp}мс. API Задержка ${Math.round(client.ping)}мс.`);
  }
// if(command === "boobs") {
//   console.log(await neko.nsfw.boobs());
// }

if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
       message.channel.send(sayMessage);
  }

if(command === "kick") {
       if(!message.member.roles.cache.some(r=>["Разраб хентай бота", "Moderator"].includes(r.name)))
      return message.reply("Тебе нужна роль Administrator или Moderator с правами чтобы выполнить эту команду.");
    
       let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("ПИНГАНИТЕ валидного юзера...");
    if(!member.kickable) 
      return message.reply("Кароче пипец, у него роль походу выше моей или у меня прав нема....");
    
            let reason = args.slice(1).join(' ');
    if(!reason) reason = "Цыганские фокусы";
    
        await member.kick(reason)
      .catch(error => message.reply(`Соряннн, ${message.author} немагу це сделать ибо: ${error}`));
    message.reply(`${member.user.tag} был кикнут ${message.author.tag} ибо: ${reason}`);

  }
  
  if(command === "ban") {
       //  ;) еее бан и говнокод=)))))
    if(!message.member.roles.cache.some(r=>["Administrator"].includes(r.name)))
      return message.reply("Тебе нужна роль Administrator с правами чтобы выполнить эту команду.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("ПИНГАНИТЕ валидного пользователя!!!!!!!");
    if(!member.bannable) 
      return message.reply("Кароче пипец, у него роль походу выше моей или у меня прав нема....");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Ебанат натрия";
    
    await member.ban(reason)
      .catch(error => message.reply(`Извини, ${message.author} я не могу это сделать потому что: ${error}`));
    message.reply(`${member.user.tag} был забанен ${message.author.tag} потому что: ${reason}`);
  }
    if(command === "purge") {
        const deleteCount = parseInt(args[0], 10);
           if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Пажалуста, введите число от **2** до **100**");
           const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Немагу ибо: ${error}`));
  }

 });
client.login("NzMwMDk5MzgxMTQzMDc3MDM2.XwSkMw.L6BSKli18V15b4dFXy_ZQyP6e8g");
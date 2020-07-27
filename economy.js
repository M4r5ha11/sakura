const config = require("../config.json");
/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)
 
This will create a unique ID for each guild member
*/
 
 
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");
 
//Create the bot client
const client = new Discord.Client();
 
//Set the prefix and token of the bot.
const settings = {
  prefix: '+',
}
 
//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on('message', async message => {
 
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
 
  if (command === 'balance') {
 
    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Хей ${message.author.tag}! У тебя ${output.balance} монет.`);
  }
 
  if (command === 'daily') {
 
    var output = await eco.Daily(message.author.id)
    
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`Вы получили ежедневные монеты! Теперь у тебя ${profile.newbalance} монет.`);
 
    } else {
      message.channel.send(`Извините, вы уже забрали свои ежедневные монеты!\nНо не беспокойтесь, через ~~100500 лет~~ ${output.timetowait} вы можете получить аванс снова!`)
    }
 
  }
 
  if (command === 'leaderboard') {
 
    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)
 
    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`Юзер ${message.mentions.users.first().tag} - это номер ${output} в моей таблице лидеров!`);
 
    } else {
 
      eco.Leaderboard({
        // limit: 3, Only takes top 3 ( Totally Optional )
        // filter: x => x.balance > 50 Only allows people with more than 100 balance ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
 
        message.channel.send(`Моя Глобальная Таблица Лидеров
 
1 - ${firstplace && firstplace.tag || 'Пока никого.'} : ${users[0] && users[0].balance || 'Heтy'}
2 - ${secondplace && secondplace.tag || 'Пока никого.'} : ${users[1] && users[1].balance || 'Нету'}
3 - ${thirdplace && thirdplace.tag || 'Пока никого.'} : ${users[2] && users[2].balance || 'Нету'}`)
 
      })
 
    }
  }
 
  if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Пинганите пользователя, которому хотите отправить деньги!')
    if (!amount) return message.reply('Укажите сумму, которую вы хотите заплатить!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('У вас меньше монет, чем сумма, которую вы хотите перевести!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Передача монет выполнена успешно!\nБаланс  ${message.author.tag}: ${transfer.FromUser}\nБаланс  ${user.tag}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}: ${transfer.ToUser}`);
  }
 
  if (command === 'coinflip') {
 
    var flip = args[0] //Heads or Tails
    var amount = args[1] //Coins to gamble
 
    if (!flip || !['голова', 'хвост'].includes(flip)) return message.reply('Пожалуйста, укажите член, анал или рот! (шутка) Возможный выбор: голова или хвост.')
    if (!amount) return message.reply('Укажите сумму, на которую вы хотите сыграть!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('У вас меньше монет, чем сумма, на которую вы хотите сыграть! К счастью...')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`Ты б**ть да, ТЫ! ${gamble.output}! Твой новый баланс: ${gamble.newbalance}`)
 
  }
 
  if (command === 'dice') {
 
    var roll = args[0] //Should be a number between 1 and 6
    var amount = args[1] //Coins to gamble
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Укажите число, он должен быть числом от 1 до 6.')

    if (!amount) return message.reply('Укажи сумму, dura4ok!')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('У вас меньше монет, чем сумма, на которую вы хотите сыграть!')
 
    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`Кости бросили ${gamble.dice}. Значит, ты выкинул ${gamble.output}! Новый баланс: ${gamble.newbalance}`)
 
  }
 
  if (command === 'work') { // версия 666 (1.0)
 
    var output = await eco.Work(message.author.id)
    //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    if (output.earned == 0) return message.reply('Ты херово делал свою работу, поэтому ничего не заработал.... Меньше бухай!!!!')
    message.channel.send(`${message.author.username} Ты поработал \` ${output.job} \` и получил: :money_with_wings: ${output.earned} Теперь у тебя  :money_with_wings: ${output.balance}¥ (это Японские Йены)`)


 
 
    var output = await eco.Work(message.author.id, {
      failurerate: 30,
      money: Math.floor(Math.random() * 500),
      jobs: ['касир', 'владелец магазина', 'праститутка', 'менеджер', 'бомж', 'хентайзвезда']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('Ты плохо делал(а) свою работу, поэтому ничего не заработал(а).!')
 
    message.channel.send(`${message.author.username}
Ты поработал ~~проститУткой~~ \` ${output.job} \` и получил дохера бабла, а именно: :money_with_wings: ${output.earned}
Теперь у тебя: :money_with_wings: ${output.balance}`)
 
  }
 
  if (command === 'slots') {
 
    var amount = args[0] //Coins to gamble
 
    if (!amount) return message.reply('Укажите сумму, на которую вы хотите сЫграть!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('У вас меньше монет, чем сумма, на которую вы хотите сыграть.')
 
    var gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)
    message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
    message.reply(`ТЫ ${gamble.output}! Новай баланс: ${gamble.newbalance}`)
 
  }
 
});
 
// T0kEH
client.login("your-token")
'use strict';

const { Client, MessageEmbed } = require('discord.js');

const os = require('os')

const client = new Client();


client.on('ready', () => {
  console.log('info готов!');
});

client.on('message', message => {
  
  if (message.content === '+info') {
  
    const embed = new MessageEmbed()
      
      .setTitle('Информация обо мне:')
     
      .setColor("RANDOM")
            .setDescription(`__**Сакура v0.0.3**__\nИспользуется: Node ${process.version}\ndiscord.js v${require('discord.js').version}\nОЗУ: ${formatBytes(os.totalmem() - os.freemem(), 1)}/${formatBytes(os.totalmem(), 1)} - ${((os.totalmem() - os.freemem()) / os.totalmem()*100).toFixed(2)}%\nЦП: ${(100 - (getCPUInfo() * 100)).toFixed(2)}%\nЭкономика.JS v1\n\nРазработчик: iNSaNiTY#7317`);
    message.channel.send(embed);
  }
function formatBytes(bytes, decimals) {
   if (bytes === 0) return '0 Bytes'
   let k = 1000,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k))
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function getCPUUsage() {
  return new Promise((resolve, reject) => {
    let stats1 = getCPUInfo()

    setTimeout(() => {
      let stats2 = getCPUInfo()

      let idle  = stats2.idle - stats1.idle
      let total = stats2.total - stats1.total

      resolve(idle / total)
    }, 1000)
  })
}
function getCPUInfo() {
  let idle = 0, total = 0, cpus = os.cpus()
  for (let cpu of cpus) {
    for (let thing in cpu.times)
      total += cpu.times[thing]
    idle += cpu.times.idle
 }
}
});
client.login('your-token');
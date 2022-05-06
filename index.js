const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')
const {prefix} = require('./config.json')
const { DiscordTogether } = require('discord-together')
const keepAlive = require('./server.js')
const mongoose = require("mongoose")
module.exports = client
client.discordTogether = new DiscordTogether(client);

mongoose.connect("mongodb+srv://saldu:sjg9433_@cluster0.uijwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
useNewUrlParser: true ,  useUnifiedTopology: true 
}).then(console.log("데이터베이스 연결 완료"))

client.on('ready',()=> {
  console.log('봇 준비뎀');
  client.user.setActivity("로사단 영상 만드는중", {
    type: "STREAMING",
    url: "https://naver.com"
  });
});

client.on('message', msg => {
    if(msg.content === 'ㅋ이거슨이스터에그가아니여') {
        msg.channel.send("ㅋ")
    }
})
client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

const style = 'R'
const starttime = `<t:${Math.floor(client.readyAt / 1000)}` + (style ? `:${style}` : '') + '>'
client.on('messageCreate', message => {
    if(message.content == "s업타임"){
        const starttime = `<t:${Math.floor(client.readyAt / 1000)}` + (style ? `:${style}` : '') + '>'
        message.reply(`봇이 온라인 이였던 시간을 알려드릴게요!!\n업타임 : ${starttime}`)
    }
})

client.on('messageCreate',message=>{
    if(message.content == `${prefix}유튜브`){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요")
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})

client.on('voiceStateUpdate', async (newState, oldState) => {
    const channel = newState.guild.channels.cache.find(c => c.name === "개인음성방");
    if (newState.member.voice.channel) {
        if (!channel) return
        if (newState.member.voice.channel.id !== channel.id) return
        newState.guild.channels.create(`${newState.member.user.username}의 음성방`, {
            type: "GUILD_VOICE",
            parent: oldState.channel.parent
        }).then(ch => {
            if (!ch) return
            newState.member.voice.setChannel(ch)
            const interval = setInterval(() => {
                if (ch.deleted == true) {
                    clearInterval(interval)
                    return;
                }
                if (ch.members.size == 0) {
                    ch.delete()
                    console.log("채널 삭제됨")
                    return;
                }
            }, 5000);
        })
    }
})

keepAlive()
client.login(process.env.TOKEN)
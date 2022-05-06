const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name:"서버공지",
    execute(message,args){
        if(message.channel.id == "957288428347752488"){
        message.delete()
        message.channel.send({ content: "@everyone" })
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("권한이 없습니다")
        const msg = args.join(" ")
       const date = new Date()
       const time = Math.round(date.getTime() / 1000)
       const embed = new MessageEmbed() 
       .setAuthor("📢ㆍ서버공지 SERVER NOTICE") 
       .setTitle("――――――――――――――――――――――――――――")
       .setDescription(msg)
        .setFooter(`담당 관리자 : ${message.author.tag} • [살두#2977]`, message.author.displayAvatarURL())
        .setColor(0x2894C2)
        .setTimestamp()
        message.channel.send({embeds : [embed]})
    } else return message.reply("공지사항 채널에서만 사용할 수 있는 명령어 입니다")

    }
}
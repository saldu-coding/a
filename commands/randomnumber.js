module.exports = {
    name:"랜덤숫자",
    execute(message,args){
        if(!args[0]) return message.reply("최대숫자를 입력해주세요")
        if(isNaN(args[0])) return message.reply("올바른 숫자를 입력해주세요")
        const randomnumber = Math.floor(Math.random() * args[0])
        message.channel.send({content : `${randomnumber}`})
    }
}
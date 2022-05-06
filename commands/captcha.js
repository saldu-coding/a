const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "인증",
    execute(message) {
        if (message.channel.type !== "GUILD_TEXT") return
        const url = "https://remapi.xyz:2/captcha"
        try {
            fetch(url).then(res => res.json()).then(async json => {
                const embed = new MessageEmbed()
                    .setTitle("아래코드를 입력해주세요 제한시간 : 30초")
                    .setImage(json.img)
                    .setColor("BLUE")

                const msg = await message.channel.send({ embeds: [embed] })

                try {
                    const filter = (m) => {
                        if (m.author.bot) return;
                        if (m.author !== message.author) return;
                        if (m.content === json.value) return true;
                        m.react("954964071382413362")
                        m.react("954963052963459102")
                        m.react("954963710726778900")
                        m.react("954962211175034880")
                        m.react("954964811916120094")
                        m.react("954965412670500895")
                    };

                    const response = await msg.channel.awaitMessages({
                        filter,
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    });
                    if (response) {
                        message.member.roles.add("914122819066023949")
                        message.channel.send({ content: "인증에 성공했습니다 <:Yes:954965961113501707> " })
                    }
                } catch (error) {
                    message.reply("님 로봇임?")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
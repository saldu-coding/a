const { MessageEmbed,CommandInteraction } = require('discord.js')

module.exports = {
    name: "서버정보",
    description: '서버정보를 알려줘요',
    /**
     * @param { CommandInteraction } Interaction
     */
    async execute(interaction) {
        const han = new MessageEmbed()
            .setTitle(`${interaction.guild.name} 서버 정보`)
            .addField(":white_circle: | 서버 이름",`${interaction.guild.name}`)
            .addField(":key:| 서버 아이디",`${interaction.guild.id}`)
            .addField(":balloon: | 서버 생성일",`${interaction.guild.createdAt}`)
            .addField(":woman: | 서버 멤버",`${interaction.guild.memberCount}명`)
            .addField(":red_circle: | 서버 부스트 레벨",`${interaction.guild.premiumTier} 레벨`)
            .addField(":red_circle: | 부스트 개수:",`${interaction.guild.premiumSubscriptionCount}개`)
            .addField(":speech_balloon: | 텍스트 채널개수",`${interaction.guild.channels.cache.filter(x => x.type === "text").size}개`)
            .addField(":loud_sound: | 음성 채널개수",`${interaction.guild.channels.cache.filter(x => x.type === "voice").size}개`)
        
            .setThumbnail(interaction.guild.iconURL())
       
            .setTimestamp()
            interaction.reply({ embeds: [han] })
            }

        }